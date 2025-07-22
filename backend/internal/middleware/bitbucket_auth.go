package middleware

import (
	"backend/config"
	"context"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var jwtSecret = []byte("your_secret_key")                // đổi thành khóa bí mật thực tế
var secrect = []byte("my-very-secure-key-1234567890123") // length = 32 bytes

type BitbucketMiddleware struct {
	cfg *config.BitbucketConfig
}

func NewBitbucketMiddleware(cfg *config.BitbucketConfig) *BitbucketMiddleware {
	return &BitbucketMiddleware{cfg: cfg}
}

func (m *BitbucketMiddleware) RequireBitbucketAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

		key := fmt.Sprintf("bitbucket:%s", tokenStr)

		fmt.Println("middleware tokenStr:", tokenStr)

		username, errParse := m.ParseJWT(tokenStr)

		val, errGet := config.RedisClient.Get(context.Background(), key).Result()

		if errParse != nil || errGet != nil {
			fmt.Println("error with errParse:", errParse, " errGet: ", errGet)
		}

		fmt.Println("middleware alter encrypt val:", val)

		ePassword, err := Decrypt(val)

		fmt.Println("middleware username:", username, " ePassword: ", ePassword)

		m.cfg.SetBitbucketCredential(username, ePassword)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Please log in first"})
			c.Abort()
			return
		}

		c.Next()
	}
}

func (m *BitbucketMiddleware) ParseJWT(tokenStr string) (string, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// Kiểm tra thuật toán
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return "", errors.New("invalid token")
	}

	// Ép kiểu và lấy username
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username, ok := claims["username"].(string)
		if !ok {
			return "", errors.New("username not found in token")
		}
		return username, nil
	}

	return "", errors.New("invalid token claims")
}

func Decrypt(cipherText string) (string, error) {
	data, err := base64.StdEncoding.DecodeString(cipherText)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(secrect)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	if len(data) < gcm.NonceSize() {
		return "", errors.New("invalid ciphertext")
	}

	nonce := data[:gcm.NonceSize()]
	ciphertext := data[gcm.NonceSize():]

	plainText, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	return string(plainText), nil
}
