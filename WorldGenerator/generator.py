from PIL import Image

filename = "world.png"

blockID = {
	"000000": "", # Null
	"ffffff": 1, # Wall
	"ff0000": 2, # Start Point
	"2c0058": 3, # Generic Floor
	"0000ff": 4, # Generic Button
	"ffff00": 5, # Generic Sensor
}

img = Image.open(filename)
pix = img.load()

def rgba2hex(rgba_color):
	red = int(rgba_color[0])
	green = int(rgba_color[1])
	blue = int(rgba_color[2])
	return '{r:02x}{g:02x}{b:02x}'.format(r = red, g = green, b = blue)

w, h = img.size
print(str(w) + "," + str(h))
for y in range(h):
	line = ""
	for x in range(w):
		line += str(blockID[rgba2hex(pix[x, y])])
		if x < w-1:
			line += ","
	print(line)