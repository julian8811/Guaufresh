"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoveHorizontal } from "lucide-react"
import { baseHref } from "@/lib/base-href"

export function BeforeAfter({ embed = false }: { embed?: boolean }) {
  const [position, setPosition] = useState(42)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleChange = (value: number) => {
    setPosition(value)
    if (!hasInteracted) setHasInteracted(true)
  }

  const slider = (
    <div className="relative mx-auto aspect-square w-full max-w-xl select-none overflow-hidden rounded-[1.5rem] border border-primary/20 bg-muted/20 shadow-xl sm:rounded-[2rem]">
      <img
        src={baseHref("/after-paw.png?v=3")}
        alt="Pata limpia con espuma Guau Fresh"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-4 right-4 z-20 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-bold tracking-wide text-primary shadow-sm backdrop-blur-md">
        Después
      </div>

      <img
        src={baseHref("/before-paw.png?v=3")}
        alt="Pata sucia de barro antes de limpiar"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
        loading="lazy"
      />
      <div className="absolute bottom-4 left-4 z-20 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-bold tracking-wide text-muted-foreground shadow-sm backdrop-blur-md">
        Antes
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-1 cursor-ew-resize bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-white shadow-lg">
          <MoveHorizontal className="h-5 w-5 text-primary" aria-hidden />
        </div>
      </div>

      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center px-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-ink/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:text-sm">
              <MoveHorizontal className="h-4 w-4 animate-pulse" aria-hidden />
              Desliza para ver el antes y después
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => handleChange(Number(e.target.value))}
        onPointerDown={() => setHasInteracted(true)}
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        aria-label="Desliza para comparar la pata sucia y limpia"
      />
    </div>
  )

  if (embed) {
    return slider
  }

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-display text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
            Efecto Guau: limpieza real
          </h2>
          <p className="mt-3 text-base font-medium text-muted-foreground sm:text-lg">
            Desliza la barra del centro para ver cómo la espuma remueve el barro en segundos.
          </p>
        </div>
        {slider}
      </div>
    </section>
  )
}
