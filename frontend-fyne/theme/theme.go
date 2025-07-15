package theme

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
)

type LightTheme struct{}

func (LightTheme) Color(name fyne.ThemeColorName, _ fyne.ThemeVariant) color.Color {
	switch name {
	case theme.ColorNameBackground:
		return color.White
	case theme.ColorNameButton:
		return color.RGBA{R: 240, G: 240, B: 240, A: 255}
	case theme.ColorNameDisabled:
		return color.RGBA{R: 200, G: 200, B: 200, A: 255}
	case theme.ColorNameError:
		return color.RGBA{R: 200, G: 0, B: 0, A: 255}
	case theme.ColorNameForeground:
		return color.Black
	case theme.ColorNameInputBackground:
		return color.White
	case theme.ColorNamePlaceHolder:
		return color.Gray{Y: 160}
	case theme.ColorNamePressed:
		return color.RGBA{R: 180, G: 180, B: 180, A: 255}
	case theme.ColorNamePrimary:
		return color.RGBA{R: 33, G: 150, B: 243, A: 255} // blue
	case theme.ColorNameHover:
		return color.RGBA{R: 230, G: 230, B: 230, A: 255}
	default:
		return color.Black
	}
}

func (LightTheme) Font(style fyne.TextStyle) fyne.Resource {
	return theme.DefaultTheme().Font(style)
}

func (LightTheme) Icon(name fyne.ThemeIconName) fyne.Resource {
	return theme.DefaultTheme().Icon(name)
}

func (LightTheme) Size(name fyne.ThemeSizeName) float32 {
	return theme.DefaultTheme().Size(name)
}
