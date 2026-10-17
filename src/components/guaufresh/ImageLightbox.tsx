"use client"

import { useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export type LightboxItem = {
  src: string
  alt: string
}

type ImageLightboxProps = {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageLightbox({ items, index, onClose, onNavigate }: ImageLightboxProps) {
  const open = index !== null && items.length > 0
  const current = open ? items[index!] : null

  const goPrev = useCallback(() => {
    if (index === null || items.length === 0) return
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  const goNext = useCallback(() => {
    if (index === null || items.length === 0) return
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose, goPrev, goNext])

  if (typeof document === "undefined") {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          data-testid="image-lightbox"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition hover:bg-primary hover:text-white sm:right-6 sm:top-6"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition hover:bg-primary hover:text-white sm:left-6"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition hover:bg-primary hover:text-white sm:right-6"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="max-h-[min(90vh,900px)] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {items.length > 1 && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold tracking-widest text-ink">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
