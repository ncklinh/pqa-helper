package screens

import (
	"frontend/model"
	"frontend/router"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

var selectedRepo model.Repo

func RepoScreen() fyne.CanvasObject {
	title := widget.NewLabelWithStyle("📦 Select Repository", fyne.TextAlignCenter, fyne.TextStyle{Bold: true})

	list := container.NewVBox()

	for _, repo := range model.MockRepos {
		repo := repo // capture for closure
		item := widget.NewButton(repo.Name, func() {
			selectedRepo = repo
			router.NavigateTo("prs")
		})
		list.Add(item)
	}

	return container.NewVBox(
		widget.NewButton("🔙 Logout", func() {
			router.NavigateTo("login")
		}),
		title,
		list,
	)
}
