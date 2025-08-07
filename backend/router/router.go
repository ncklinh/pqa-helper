package router

import (
	"backend/setup"
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

	bb := setup.InitBitbucket()

	r.POST("/bitbucket/login", bb.Handler.LoginAndCacheCredential)

	bitbucketGroup := r.Group("/bitbuckets", bb.Middleware)
	{
		bitbucketGroup.GET("/api/workspace", bb.Handler.GetWorkspaces)
		bitbucketGroup.GET("/api/repos", bb.Handler.GetRepositories)
		bitbucketGroup.GET("/api/pullrequests", bb.Handler.GetPullRequests)
		bitbucketGroup.GET("/bitbucket/:workspace/:repo/pullrequests/:prID/comments", bb.Handler.GetPRComments)
		bitbucketGroup.GET("/bitbucket/:workspace/:repo/comments", bb.Handler.GetRepoComments)
	}

	return r
}
