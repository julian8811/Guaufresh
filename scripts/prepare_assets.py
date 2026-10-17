"""Prepare GuauFresh 2026 brand assets for public/."""
from __future__ import annotations

import os
import shutil
from PIL import Image

PUBLIC = r"D:\Guaufresh\web\public"
PARRILLA = r"D:\Guaufresh\Parrilla_8"


def to_webp(src: str, dest: str, max_side: int = 1600, quality: int = 82) -> None:
    im = Image.open(src).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(dest, "WEBP", quality=quality, method=6)
    print(f"OK {dest} {im.size} {os.path.getsize(dest) // 1024}KB")


def recolor_near_white_to_teal(
    im: Image.Image, teal=(0, 167, 159, 255), thresh: int = 210
) -> Image.Image:
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 10:
                continue
            # Keep yellow paw
            if r > 200 and g > 180 and b < 180:
                continue
            if r > thresh and g > thresh and b > thresh:
                px[x, y] = (teal[0], teal[1], teal[2], a)
            elif min(r, g, b) > 180 and abs(r - g) < 40 and abs(g - b) < 40:
                px[x, y] = (teal[0], teal[1], teal[2], a)
    return im


def main() -> None:
    os.makedirs(os.path.join(PUBLIC, "carousel"), exist_ok=True)

    to_webp(
        r"D:\Guaufresh\Guaufresh 150 mL.png",
        os.path.join(PUBLIC, "product-foam-150ml.webp"),
        900,
        85,
    )
    to_webp(
        r"D:\Guaufresh\Guaufresh 50 mL.png",
        os.path.join(PUBLIC, "product-foam-50ml.webp"),
        900,
        85,
    )
    Image.open(os.path.join(PUBLIC, "product-foam-150ml.webp")).save(
        os.path.join(PUBLIC, "product-foam.png"), "PNG"
    )

    logo = Image.open(r"D:\Guaufresh\Logo\Logo amarillo.png").convert("RGBA")
    bbox = logo.getbbox()
    if bbox:
        logo = logo.crop(bbox)
    pad = 20
    canvas = Image.new("RGBA", (logo.width + pad * 2, logo.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(logo, (pad, pad), logo)
    logo = canvas

    logo_white = logo.copy()
    # Downscale for web
    max_logo = 640
    scale = min(1.0, max_logo / max(logo.size))
    if scale < 1:
        logo_white = logo_white.resize(
            (int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS
        )
        logo_scaled = logo.resize(
            (int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS
        )
    else:
        logo_scaled = logo

    logo_white.save(os.path.join(PUBLIC, "logo-guaufresh-white.png"), "PNG")
    logo_teal = recolor_near_white_to_teal(logo_scaled.copy())
    logo_teal.save(os.path.join(PUBLIC, "logo-guaufresh.png"), "PNG")
    logo_teal.save(os.path.join(PUBLIC, "logo-guaufresh-teal.png"), "PNG")
    print("logos", logo_teal.size)

    # Favicon from yellow paw (top of logo)
    paw = logo.crop((0, 0, logo.width, int(logo.height * 0.42)))
    bbox = paw.getbbox()
    if bbox:
        paw = paw.crop(bbox)
    side = max(paw.size)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(paw, ((side - paw.width) // 2, (side - paw.height) // 2), paw)
    fav = sq.resize((64, 64), Image.Resampling.LANCZOS)
    fav.save(os.path.join(PUBLIC, "favicon-paw.png"), "PNG")
    print("favicon", fav.size)

    carousel_map = [
        ("Día 03.jpg", "hero-01.webp"),
        ("Día 08.jpg", "hero-02.webp"),
        ("Día 06.jpg", "hero-03.webp"),
        ("Día 14.jpg", "hero-04.webp"),
        ("Día 17.jpg", "hero-05.webp"),
        ("Día 13.jpg", "hero-06.webp"),
        ("Día 25.jpg", "hero-07.webp"),
        ("Día 20.jpg", "hero-08.webp"),
        ("Día 02.1.jpg", "hero-09.webp"),
        ("Día 05.jpg", "hero-10.webp"),
    ]
    for src_name, dest_name in carousel_map:
        src = os.path.join(PARRILLA, src_name)
        dest = os.path.join(PUBLIC, "carousel", dest_name)
        im = Image.open(src).convert("RGB")
        w, h = im.size
        scale = min(1.0, 1920 / max(w, h))
        if scale < 1:
            im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        im.save(dest, "WEBP", quality=80, method=6)
        print(f"carousel {dest_name} {im.size} {os.path.getsize(dest) // 1024}KB")

    im = Image.open(os.path.join(PARRILLA, "Día 25.jpg")).convert("RGB")
    w, h = im.size
    scale = min(1.0, 1600 / max(w, h))
    im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(os.path.join(PUBLIC, "como-usar-banner.webp"), "WEBP", quality=80, method=6)

    ba = Image.open(os.path.join(PARRILLA, "Día 28.jpg")).convert("RGB")
    w, h = ba.size
    left = ba.crop((0, 0, w // 2, h)).resize((600, 600), Image.Resampling.LANCZOS)
    right = ba.crop((w // 2, 0, w, h)).resize((600, 600), Image.Resampling.LANCZOS)
    left.save(os.path.join(PUBLIC, "before-paw.png"), "PNG")
    right.save(os.path.join(PUBLIC, "after-paw.png"), "PNG")
    print("before/after updated")
    print("DONE")


if __name__ == "__main__":
    main()
