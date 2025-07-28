package router

import (
	"backend/config"
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/service"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	bitbucketCfg := config.NewBitbucketConfig()
	bitbucketRepo := repository.NewBitbucketRepo(bitbucketCfg)
	bitbucketService := service.NewBitbucketService(bitbucketRepo)
	bitbucketHandler := handler.NewBitbucketHandler(bitbucketService, bitbucketCfg)

	bitbutketMiddleware := middleware.NewBitbucketMiddleware(bitbucketCfg)

	r.POST("/bitbucket/login", bitbucketHandler.LoginAndCacheCredential)

	bitbucketGroup := r.Group("/bitbuckets", bitbutketMiddleware.RequireBitbucketAuth())
	{
		bitbucketGroup.GET("/api/workspace", bitbucketHandler.GetWorkspaces)
		bitbucketGroup.GET("/api/repos", bitbucketHandler.GetRepositories)
		bitbucketGroup.GET("/api/pullrequests", bitbucketHandler.GetPullRequests)
		bitbucketGroup.GET("/bitbucket/:workspace/:repo/pullrequests/:prID/comments", bitbucketHandler.GetPRComments)
		bitbucketGroup.GET("/bitbucket/:workspace/:repo/comments", bitbucketHandler.GetRepoComments)
	}

	return r
}
