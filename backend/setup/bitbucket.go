package setup

import (
	"backend/config"
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/service/bitbucket"

	"github.com/gin-gonic/gin"
)

type BitbucketComponents struct {
	Handler    *handler.BitbucketHandler
	Middleware gin.HandlerFunc
}

func InitBitbucket() BitbucketComponents {
	bitbucketCfg := config.NewBitbucketConfig()
	bitbucketRepo := repository.NewBitbucketRepo(bitbucketCfg)
	scmService := bitbucket.New(bitbucketRepo)

	return BitbucketComponents{
		Handler:    handler.NewBitbucketHandler(scmService, bitbucketCfg),
		Middleware: middleware.NewBitbucketMiddleware(bitbucketCfg).RequireBitbucketAuth(),
	}
}
