package main

import (
	"backend/config"
	"backend/router"
)

func main() {
	config.ConnectRedis()
	r := router.SetupRouter()
	r.Run(":8080")
}
