"""Extract white paw mark from Parrilla_9/Logo/8.png into a transparent PNG mask."""
from pathlib import Path

from PIL import Image

SRC = Path(r"D:\Guaufresh\Parrilla_9\Logo\8.png")
DEST = Path(r"D:\Guaufresh\web\public\paw-mark.png")

im = Image.open(SRC).convert("RGBA")
# Drop the gray strip at the bottom if present
w, h = im.size
crop_h = int(h * 0.92)
im = im.crop((0, 0, w, crop_h))
px = im.load()
out = Image.new("RGBA", im.size, (0, 0, 0, 0))
opx = out.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = px[x, y]
        # Keep near-white paw pixels; discard teal background
        if a < 10:
            continue
        brightness = (r + g + b) / 3
        if brightness > 200 and abs(r - g) < 40 and abs(g - b) < 40:
            opx[x, y] = (255, 255, 255, 255)

bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)
side = max(out.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(out, ((side - out.width) // 2, (side - out.height) // 2), out)
# Trim a bit of padding
sq = sq.resize((256, 256), Image.Resampling.LANCZOS)
DEST.parent.mkdir(parents=True, exist_ok=True)
sq.save(DEST, "PNG")
print(f"OK {DEST} {sq.size}")
