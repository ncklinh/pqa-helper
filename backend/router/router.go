package router

import (
	"backend/config"
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/service"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

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
