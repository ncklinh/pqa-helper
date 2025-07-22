package config

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var (
	RedisClient *redis.Client
	Ctx         = context.Background()
)

func InitRedis() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
}

func ConnectRedis() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // không có password
		DB:       0,  // DB mặc định
	})

	_, err := RedisClient.Ping(Ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	log.Println("✅ Connected to Redis")
}
