"""Select unused product photos and export WebP gallery assets."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

PUBLIC = Path(r"D:\Guaufresh\web\public\gallery")
PARRILLA = Path(r"D:\Guaufresh\Parrilla_8")
FOTOS = Path(r"D:\Guaufresh\fotos guaufresh\nuevos_reels_e_imagenes")

# Already used in carousel / como-usar
USED = {
    "Día 03.jpg",
    "Día 08.jpg",
    "Día 06.jpg",
    "Día 14.jpg",
    "Día 17.jpg",
    "Día 13.jpg",
    "Día 25.jpg",
    "Día 20.jpg",
    "Día 02.1.jpg",
    "Día 05.jpg",
}

# Manual curated pick: category tags for Gallery filters
# Prefer Parrilla_8 variants not in carousel; skip reel thumbs and ascii duplicates
PICKS = [
    # (source_path, dest_name, category, alt)
    (PARRILLA / "Día 08.1.jpg", "gal-01.webp", "mascotas", "Caniche blanco con Guau Fresh"),
    (PARRILLA / "Día 08.2.jpg", "gal-02.webp", "producto", "Producto Guau Fresh en escena"),
    (PARRILLA / "Día 08.3.jpg", "gal-03.webp", "mascotas", "Mascota junto a Espuma Limpiadora"),
    (PARRILLA / "Día 14.1.jpg", "gal-04.webp", "uso", "Uso de Guau Fresh en cuidado diario"),
    (PARRILLA / "Día 14.2.jpg", "gal-05.webp", "producto", "Detalle de botella Guau Fresh"),
    (PARRILLA / "Día 14.3.jpg", "gal-06.webp", "mascotas", "Mascota feliz con Guau Fresh"),
    (PARRILLA / "Día 17.1.jpg", "gal-07.webp", "uso", "Aplicación de espuma limpiadora"),
    (PARRILLA / "Día 17.2.jpg", "gal-08.webp", "mascotas", "Cuidado suave para peludos"),
    (PARRILLA / "Día 17.3.jpg", "gal-09.webp", "producto", "Presentación Guau Fresh"),
    (PARRILLA / "Día 22.jpg", "gal-10.webp", "uso", "Rutina después del paseo"),
    (PARRILLA / "Día 24.jpg", "gal-11.webp", "mascotas", "Mascota con producto Guau Fresh"),
    (PARRILLA / "Día 28.jpg", "gal-12.webp", "producto", "Espuma Limpiadora Guau Fresh"),
]


def to_webp(src: Path, dest: Path, max_side: int = 1400, quality: int = 80) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=quality, method=6)
    print(f"OK {dest.name} {im.size} {dest.stat().st_size // 1024}KB")


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    manifest = []
    for src, dest_name, category, alt in PICKS:
        if not src.exists():
            print(f"MISSING {src}")
            continue
        if src.name in USED:
            print(f"SKIP used {src.name}")
            continue
        dest = PUBLIC / dest_name
        to_webp(src, dest)
        manifest.append(
            {
                "src": f"/gallery/{dest_name}?v=1",
                "category": category,
                "alt": alt,
            }
        )

    # Write a small JS/TS helper comment file for the Gallery component
    ts_path = Path(r"D:\Guaufresh\web\src\lib\gallery-items.ts")
    lines = [
        'import { baseHref } from "@/lib/base-href"',
        "",
        'export type GalleryCategory = "all" | "producto" | "mascotas" | "uso"',
        "",
        "export type GalleryItem = {",
        "  id: string",
        "  src: string",
        "  alt: string",
        "  category: Exclude<GalleryCategory, \"all\">",
        "}",
        "",
        "export const galleryItems: GalleryItem[] = [",
    ]
    for i, item in enumerate(manifest, 1):
        lines.append(
            f'  {{ id: "gal-{i:02d}", src: baseHref("{item["src"]}"), alt: "{item["alt"]}", category: "{item["category"]}" }},'
        )
    lines.append("]")
    lines.append("")
    ts_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"manifest {len(manifest)} -> {ts_path}")


if __name__ == "__main__":
    main()
