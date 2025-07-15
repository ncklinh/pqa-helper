package screens

import (
	"frontend/model"
	"frontend/router"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

var selectedPR model.PullRequest

func PRScreen() fyne.CanvasObject {
	prList := model.MockPRsByRepo[selectedRepo.Name]

	title := widget.NewLabelWithStyle("🔃 Pull Requests for "+selectedRepo.Name, fyne.TextAlignCenter, fyne.TextStyle{Bold: true})
	list := container.NewVBox()

	for _, pr := range prList {
		pr := pr // capture
		label := pr.Title + " by " + pr.Author
		if pr.IsMerged {
			label += " ✅"
		}
		item := widget.NewButton(label, func() {
			selectedPR = pr
			router.NavigateTo("comments")
		})
		list.Add(item)
	}

	return container.NewVBox(
		widget.NewButton("🔙 Back to Repos", func() {
			router.NavigateTo("repos")
		}),
		title,
		list,
	)
}
