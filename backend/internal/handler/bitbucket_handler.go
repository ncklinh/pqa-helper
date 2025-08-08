package handler

import (
	"backend/config"
	"backend/internal/service/scm"
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("your_secret_key")                // đổi thành khóa bí mật thực tế
var secrect = []byte("my-very-secure-key-1234567890123") // length = 32 bytes

type BitbucketHandler struct {
	service scm.SCMService
	cfg     *config.BitbucketConfig
}

func NewBitbucketHandler(s scm.SCMService, cf *config.BitbucketConfig) *BitbucketHandler {
	return &BitbucketHandler{service: s, cfg: cf}
}

func (h *BitbucketHandler) GetRepositories(c *gin.Context) {
	log.Printf("in get of repo")
	workspace := c.Query("workspace")
	if workspace == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workspace is required"})
		return
	}

	repos, err := h.service.GetRepositories(workspace)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, repos)
}

func (h *BitbucketHandler) GetPullRequests(c *gin.Context) {
	workspace := c.Query("workspace")
	repo := c.Query("repo")
	log.Println("wor: ", workspace)
	log.Println("repo: ", repo)
	if workspace == "" || repo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workspace and repo are required"})
		return
	}

	prs, err := h.service.GetPullRequests(workspace, repo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, prs)
}

func (h *BitbucketHandler) GetWorkspaces(c *gin.Context) {
	workspaces, err := h.service.GetAllWorkspaces()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workspaces})
}

func (h *BitbucketHandler) GetPRComments(c *gin.Context) {
	workspace := c.Param("workspace")
	repo := c.Param("repo")
	prID := c.Param("prID")

	comments, err := h.service.GetPRComments(workspace, repo, prID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}

func (h *BitbucketHandler) GetRepoComments(c *gin.Context) {
	workspace := c.Param("workspace")
	repo := c.Param("repo")

	comments, err := h.service.GetRepoComments(workspace, repo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}

func (h *BitbucketHandler) LoginAndCacheCredential(c *gin.Context) {
	var req struct {
		Username    string `json:"username"`
		AppPassword string `json:"app_password"`
	}

	if err := c.ShouldBindJSON(&req); err != nil || req.Username == "" || req.AppPassword == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username and AppPassword are required"})
		return
	}

	// Gọi thử API Bitbucket để xác thực
	h.cfg.SetBitbucketCredential(req.Username, req.AppPassword)
	fmt.Println("login: req.Username: ", req.Username, " req.AppPassword: ", req.AppPassword)
	url := "https://api.bitbucket.org/2.0/user"
	httpReq, _ := http.NewRequest("GET", url, nil)
	httpReq.SetBasicAuth(req.Username, req.AppPassword)

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to call Bitbucket"})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Bitbucket credentials", "body": string(body)})
		return
	}

	jwt, err := GenerateJWT(req.Username)

	fmt.Println("login: after generate JWT: ", jwt)

	if err != nil {
		fmt.Println("shittt")
	}

	// Lưu vào Redis
	// cred := model.BitbucketCredential{
	// 	AppPassword: req.AppPassword,
	// }
	// jsonVal, _ := json.Marshal(cred)
	key := fmt.Sprintf("bitbucket:%s", jwt)

	fmt.Println("befire encrypt login: ", req.AppPassword)
	ePassword, err := Encrypt(req.AppPassword)

	if err != nil {
		fmt.Println("errrrrrrrr: ", err)
	}

	fmt.Println("after encrypt login: ", ePassword)

	err = config.RedisClient.Set(context.Background(), key, ePassword, 72*time.Hour).Err()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save to Redis"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": jwt})
}

func GenerateJWT(username string) (string, error) {

	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // token hết hạn sau 24h
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Ký và tạo token
	return token.SignedString(jwtSecret)
}

func Encrypt(plainText string) (string, error) {
	block, err := aes.NewCipher(secrect)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize()) // tạo nonce ngẫu nhiên
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	encrypted := gcm.Seal(nonce, nonce, []byte(plainText), nil)
	return base64.StdEncoding.EncodeToString(encrypted), nil
}
