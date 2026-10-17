"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Expand } from "lucide-react"
import { galleryItems, type GalleryCategory } from "@/lib/gallery-items"
import { ImageLightbox } from "@/components/guaufresh/ImageLightbox"
import { PawIcon } from "@/components/guaufresh/PawIcon"

const FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "producto", label: "Producto" },
  { id: "mascotas", label: "Mascotas" },
  { id: "uso", label: "Uso" },
]

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter]
  )

  return (
    <section id="galeria" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-16 top-20 h-56 w-56 blob bg-primary/10" aria-hidden />
      <div className="pointer-events-none absolute -right-12 bottom-10 h-48 w-48 blob-alt bg-lime/25" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <PawIcon className="h-4 w-4 text-accent" />
            Galería Guau Fresh
          </span>
          <h2 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
            El producto en acción
          </h2>
          <p className="mt-4 text-base font-medium text-muted-foreground">
            Explora fotos del nuevo producto, mascotas y momentos de uso. Toca una imagen para ampliarla.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filtros de galería">
          {FILTERS.map((chip) => {
            const active = filter === chip.id
            return (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(chip.id)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
                  active
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-primary/20 bg-card text-ink hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Ampliar: ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 text-ink opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ImageLightbox
        items={filtered.map((item) => ({ src: item.src, alt: item.alt }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
