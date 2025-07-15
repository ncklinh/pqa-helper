package screens

import (
	"frontend/router"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

var tokenEntry *widget.Entry

func LoginScreen() fyne.CanvasObject {
	title := widget.NewLabelWithStyle("🔐 Login", fyne.TextAlignCenter, fyne.TextStyle{Bold: true})
	instruction := widget.NewLabel("Enter your GitHub or Bitbucket Personal Access Token:")

	tokenEntry = widget.NewPasswordEntry()
	tokenEntry.SetPlaceHolder("e.g. ghp_1234567890abc...")

	loginBtn := widget.NewButton("Login", func() {
		// You could validate token here if needed
		if tokenEntry.Text != "" {
			router.NavigateTo("repos")
		}
	})

	return container.NewVBox(
		title,
		instruction,
		tokenEntry,
		loginBtn,
	)
}
