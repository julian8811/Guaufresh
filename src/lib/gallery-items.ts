import { baseHref } from "@/lib/base-href"

export type GalleryCategory = "all" | "producto" | "mascotas" | "uso"

export type GalleryItem = {
  id: string
  src: string
  alt: string
  category: Exclude<GalleryCategory, "all">
}

export const galleryItems: GalleryItem[] = [
  { id: "gal-01", src: baseHref("/gallery/gal-01.webp?v=1"), alt: "Caniche blanco con Guau Fresh", category: "mascotas" },
  { id: "gal-02", src: baseHref("/gallery/gal-02.webp?v=1"), alt: "Producto Guau Fresh en escena", category: "producto" },
  { id: "gal-03", src: baseHref("/gallery/gal-03.webp?v=1"), alt: "Mascota junto a Espuma Limpiadora", category: "mascotas" },
  { id: "gal-04", src: baseHref("/gallery/gal-04.webp?v=1"), alt: "Uso de Guau Fresh en cuidado diario", category: "uso" },
  { id: "gal-05", src: baseHref("/gallery/gal-05.webp?v=1"), alt: "Detalle de botella Guau Fresh", category: "producto" },
  { id: "gal-06", src: baseHref("/gallery/gal-06.webp?v=1"), alt: "Mascota feliz con Guau Fresh", category: "mascotas" },
  { id: "gal-07", src: baseHref("/gallery/gal-07.webp?v=1"), alt: "Aplicación de espuma limpiadora", category: "uso" },
  { id: "gal-08", src: baseHref("/gallery/gal-08.webp?v=1"), alt: "Cuidado suave para peludos", category: "mascotas" },
  { id: "gal-09", src: baseHref("/gallery/gal-09.webp?v=1"), alt: "Presentación Guau Fresh", category: "producto" },
  { id: "gal-10", src: baseHref("/gallery/gal-10.webp?v=1"), alt: "Rutina después del paseo", category: "uso" },
  { id: "gal-11", src: baseHref("/gallery/gal-11.webp?v=1"), alt: "Mascota con producto Guau Fresh", category: "mascotas" },
  { id: "gal-12", src: baseHref("/gallery/gal-12.webp?v=1"), alt: "Espuma Limpiadora Guau Fresh", category: "producto" },
]
