"""Remove baked-in checkerboard from Logo amarillo and export teal/white logos."""
from __future__ import annotations

import os
from PIL import Image

SRC = r"D:\Guaufresh\Logo\Logo amarillo.png"
PUBLIC = r"D:\Guaufresh\web\public"


def remove_checkerboard(im: Image.Image) -> Image.Image:
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 10:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            # dark/mid gray checkerboard
            if mx - mn < 35 and mx < 200:
                px[x, y] = (0, 0, 0, 0)
                continue
            # soften near-gray antialias around checkerboard
            if mx - mn < 45 and mx < 160 and a < 220:
                px[x, y] = (0, 0, 0, 0)
    return im


def recolor_white_to_teal(im: Image.Image, teal=(0, 167, 159)) -> Image.Image:
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 10:
                continue
            # keep yellow paw
            if r > 190 and g > 170 and b < 190:
                continue
            # whites and light grays -> teal, preserve alpha for soft edges
            if min(r, g, b) > 150:
                px[x, y] = (teal[0], teal[1], teal[2], a)
            elif abs(r - g) < 40 and abs(g - b) < 40 and r > 120:
                px[x, y] = (teal[0], teal[1], teal[2], a)
    return im


def trim_and_pad(im: Image.Image, pad: int = 24) -> Image.Image:
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    return canvas


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    clean = remove_checkerboard(src)
    clean = trim_and_pad(clean)

    # scale
    max_side = 640
    scale = min(1.0, max_side / max(clean.size))
    if scale < 1:
        clean = clean.resize(
            (int(clean.width * scale), int(clean.height * scale)),
            Image.Resampling.LANCZOS,
        )

    white = clean.copy()
    white.save(os.path.join(PUBLIC, "logo-guaufresh-white.png"), "PNG")

    teal = recolor_white_to_teal(clean.copy())
    teal.save(os.path.join(PUBLIC, "logo-guaufresh.png"), "PNG")
    teal.save(os.path.join(PUBLIC, "logo-guaufresh-teal.png"), "PNG")

    # favicon from yellow region
    paw = clean.crop((0, 0, clean.width, int(clean.height * 0.45)))
    bbox = paw.getbbox()
    if bbox:
        paw = paw.crop(bbox)
    side = max(paw.size)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(paw, ((side - paw.width) // 2, (side - paw.height) // 2), paw)
    fav = sq.resize((64, 64), Image.Resampling.LANCZOS)
    fav.save(os.path.join(PUBLIC, "favicon-paw.png"), "PNG")

    # verify
    for path in ["logo-guaufresh.png", "logo-guaufresh-white.png"]:
        im = Image.open(os.path.join(PUBLIC, path))
        opaque = sum(1 for p in im.getdata() if p[3] > 10)
        dark = sum(
            1
            for p in im.getdata()
            if p[3] > 200 and max(p[:3]) - min(p[:3]) < 30 and max(p[:3]) < 80
        )
        print(path, im.size, "opaque", opaque, "dark", dark)

    print("DONE")


if __name__ == "__main__":
    main()
