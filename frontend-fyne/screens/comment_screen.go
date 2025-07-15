package screens

import (
	"frontend/model"
	"frontend/router"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

func CommentScreen() fyne.CanvasObject {
	comments := model.MockCommentsByPR[selectedPR.Title]

	var items []fyne.CanvasObject
	for _, c := range comments {
		status := "✅"
		if !c.Resolved {
			status = "❌"
		}
		card := widget.NewCard(
			status+" "+c.Author,
			"\""+c.Content+"\"",
			nil,
		)
		items = append(items, card)
	}

	scroll := container.NewVScroll(container.NewVBox(items...))
	scroll.SetMinSize(fyne.NewSize(400, 600))

	top := container.NewVBox(
		widget.NewButton("🔙 Back to PRs", func() {
			router.NavigateTo("prs")
		}),
		widget.NewLabelWithStyle("💬 Comments for: "+selectedPR.Title, fyne.TextAlignCenter, fyne.TextStyle{Bold: true}),
	)

	return container.NewBorder(top, nil, nil, nil, scroll)
}
