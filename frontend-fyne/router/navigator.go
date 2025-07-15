package router

import (
	"fyne.io/fyne/v2"
)

var mainWindow fyne.Window

// Init the router with window
func Init(w fyne.Window) {
	mainWindow = w
}

// Navigate to screen by name
func NavigateTo(screen string) {
	switch screen {
	case "login":
		LoadLoginScreen()
	case "repos":
		LoadRepoScreen()
	case "prs":
		LoadPRScreen()
	case "comments":
		LoadCommentScreen()
	}
}

// These will be implemented in each screen file and imported here
var (
	LoadLoginScreen   func()
	LoadRepoScreen    func()
	LoadPRScreen      func()
	LoadCommentScreen func()
)
