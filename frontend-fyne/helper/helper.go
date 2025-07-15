package helper

import (
	"bytes"
	"image"
	"image/png"
)

func EncodeToPNG(img image.Image) []byte {
	buf := new(bytes.Buffer)
	_ = png.Encode(buf, img)
	return buf.Bytes()
}
