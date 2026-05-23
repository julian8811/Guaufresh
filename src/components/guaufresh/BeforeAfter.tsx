"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { baseHref } from "@/lib/base-href"

export function BeforeAfter() {
  const [position, setPosition] = useState(50)

  return (
    <section className="bg-background py-20 sm:py-28 border-t border-border overflow-hidden relative">
      {/* Decoraciones de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-1"
          >
            Resultados Comprobados
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 font-secondary text-4xl sm:text-5xl font-normal tracking-tight text-foreground"
          >
            Efecto Guau: Limpieza Real
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground font-medium"
          >
            Desplazá la barra del centro para ver cómo nuestra espuma con ingredientes naturales 
            remueve por completo el barro y la suciedad en segundos y sin enjuagar.
          </motion.p>
        </div>

        {/* Contenedor del Comparador Slider */}
        <div className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl border border-border bg-muted/20 select-none">
          
          {/* 1. Imagen del Después (Fondo - Limpio) */}
          <img 
            src={baseHref('/after-paw.png')} 
            alt="Pata limpia con espuma Guau Fresh" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
          <div className="absolute bottom-6 right-6 z-20 bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border text-xs font-bold text-primary shadow-sm tracking-wide">
            Después (Limpio)
          </div>

          {/* 2. Imagen del Antes (Frente - Sucio) con recorte clipPath */}
          <img 
            src={baseHref('/before-paw.png')} 
            alt="Pata sucia de barro antes de limpiar" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 z-20 bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border text-xs font-bold text-muted-foreground shadow-sm tracking-wide">
            Antes (Sucio)
          </div>

          {/* 3. Barra divisoria central visual */}
          <div 
            className="absolute inset-y-0 w-1 bg-white cursor-ew-resize pointer-events-none z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]" 
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white border border-border rounded-full flex items-center justify-center shadow-lg group">
              <svg className="w-5 h-5 text-primary transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
              </svg>
            </div>
          </div>

          {/* 4. Control deslizable HTML nativo e invisible encima para interactividad táctil fluida */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={position} 
            onChange={(e) => setPosition(Number(e.target.value))} 
            className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full touch-pan-y"
            aria-label="Deslizador antes y después de limpieza"
          />
        </div>
      </div>
    </section>
  )
}
