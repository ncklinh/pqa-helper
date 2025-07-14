package main

import (
	"fmt"
	"image"

	helper "frontend/helper"
	"frontend/model"
	theme "frontend/theme"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/storage"
	"fyne.io/fyne/v2/widget"
)

func main() {
	fmt.Println("Starting PQA Helper...")
	app := app.New()
	app.Settings().SetTheme(theme.LightTheme{})
	window := app.NewWindow("PQA Helper")
	uri, err := storage.ParseURI("file://assets/icon.png")
	if err == nil {
		res, _ := storage.Reader(uri)
		icon, _, err := image.Decode(res)
		if err == nil {
			window.SetIcon(fyne.NewStaticResource("icon.png", helper.EncodeToPNG(icon)))
		}
	}

	var commentItems []fyne.CanvasObject

	for _, comment := range comments {
		status := "❌"
		if comment.Resolved {
			status = "✅"
		}
		item := container.NewVBox(
			widget.NewLabel(status+" "+comment.PRTitle),
			widget.NewLabel("    \""+comment.Content+"\""),
			widget.NewLabel("    — "+comment.Author),
		)
		commentItems = append(commentItems, item, widget.NewSeparator())
	}

	commentList := container.NewVBox(commentItems...)
	scroll := container.NewVScroll(commentList)
	scroll.SetMinSize(fyne.NewSize(400, 600))
	layout := container.NewVBox(
		widget.NewLabel("📋 Pull Request Comments"),
		scroll,
	)

	window.SetContent(layout)
	window.Resize(fyne.NewSize(500, 800))
	window.ShowAndRun()
}

var comments = []model.Comment{
	{
		PRTitle:  "PR #101: Fix login bug",
		Author:   "alice",
		Content:  "Looks good!",
		Resolved: true,
	},
	{
		PRTitle:  "PR #102: Add logout",
		Author:   "bob",
		Content:  "Please rename this function",
		Resolved: false,
	},
}
