"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { baseHref } from "@/lib/base-href"

type Slide = {
  src: string
  alt: string
  title: string
  subtitle1: string
  subtitle2: string
}

const carouselSlides: Slide[] = [
  {
    src: baseHref("/carousel/hero-01.webp?v=3"),
    alt: "Espuma Limpiadora Guau Fresh 150 mL y 50 mL en entorno natural",
    title: "Guau Fresh",
    subtitle1: "Espuma limpiadora para mascotas",
    subtitle2: "frescura y bienestar en segundos",
  },
  {
    src: baseHref("/carousel/hero-02.webp?v=3"),
    alt: "Caniche blanco junto a botella Guau Fresh Espuma Limpiadora",
    title: "Cuidado Suave",
    subtitle1: "Limpieza sin agua para perros y gatos",
    subtitle2: "fórmula amable todos los días",
  },
  {
    src: baseHref("/carousel/hero-03.webp?v=3"),
    alt: "Beagle al aire libre con Espuma Limpiadora Guau Fresh",
    title: "Rutina Práctica",
    subtitle1: "Ideal después del paseo",
    subtitle2: "sin estrés y sin enjuague",
  },
  {
    src: baseHref("/carousel/hero-04.webp?v=3"),
    alt: "Espuma Limpiadora Guau Fresh en mesa veterinaria",
    title: "Confianza Diaria",
    subtitle1: "pH seguro y libre de parabenos",
    subtitle2: "cuidado experto y cercano",
  },
  {
    src: baseHref("/carousel/hero-05.webp?v=3"),
    alt: "Cachorro golden recibiendo espuma Guau Fresh",
    title: "Bienestar Real",
    subtitle1: "Limpieza suave entre baños",
    subtitle2: "para peludos sensibles",
  },
  {
    src: baseHref("/carousel/hero-06.webp?v=3"),
    alt: "Producto Guau Fresh con ingredientes naturales",
    title: "Naturalmente",
    subtitle1: "Vegano y libre de crueldad",
    subtitle2: "ingredientes de origen vegetal",
  },
  {
    src: baseHref("/carousel/hero-07.webp?v=3"),
    alt: "Aplicación de espuma limpiadora Guau Fresh en la mano",
    title: "Textura Espumosa",
    subtitle1: "Fácil de aplicar y extender",
    subtitle2: "resultados en pocos segundos",
  },
  {
    src: baseHref("/carousel/hero-08.webp?v=3"),
    alt: "Flat lay Guau Fresh con accesorios para mascotas",
    title: "Listo para Salir",
    subtitle1: "Práctico en casa y de viaje",
    subtitle2: "presentaciones 50 y 150 mL",
  },
  {
    src: baseHref("/carousel/hero-09.webp?v=3"),
    alt: "Patitas de perro junto a Espuma Limpiadora Guau Fresh",
    title: "Patitas Limpias",
    subtitle1: "Higiene diaria sin agua",
    subtitle2: "frescura después de cada paseo",
  },
  {
    src: baseHref("/carousel/hero-10.webp?v=3"),
    alt: "Mujer aplicando Guau Fresh a golden retriever en casa",
    title: "Amor en Acción",
    subtitle1: "Cuidado cercano y confiable",
    subtitle2: "para tu mejor amigo",
  },
]

const PRODUCT = {
  id: "guaufresh-150ml",
  name: "Guau Fresh - Espuma Limpiadora 150mL",
  price: 45000,
  image: baseHref("/product-foam-150ml.webp?v=2"),
}

function PawIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <ellipse cx="12" cy="15.5" rx="5.2" ry="4.2" />
      <ellipse cx="6.2" cy="9.2" rx="2.2" ry="2.6" />
      <ellipse cx="17.8" cy="9.2" rx="2.2" ry="2.6" />
      <ellipse cx="8.8" cy="5.8" rx="1.9" ry="2.3" />
      <ellipse cx="15.2" cy="5.8" rx="1.9" ry="2.3" />
    </svg>
  )
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const { addItem } = useCartStore()
  const slide = carouselSlides[current]

  const nextSlide = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  useEffect(() => {
    const id = setInterval(() => {
      nextSlide()
    }, 8000)
    return () => clearInterval(id)
  }, [])

  const handleCompraAhora = () => {
    addItem(PRODUCT)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  }

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 blob bg-primary/25 blur-sm" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 blob-alt bg-lime/40 blur-sm" aria-hidden />

      <div className="relative min-h-[60vh] sm:min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] w-full flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={`slide-${current}`}
              src={slide.src}
              alt={slide.alt}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 h-full w-full object-cover object-center"
              decoding="async"
            />
          </AnimatePresence>
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent md:bg-gradient-to-r md:from-ink/40 md:via-ink/10 md:to-transparent"
          aria-hidden
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 md:py-24 flex items-end md:items-center justify-start h-full">
          <div className="w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative bg-cream/95 backdrop-blur-md border border-primary/20 p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] rounded-tr-[4.5rem] sm:rounded-tr-[5.5rem] w-full max-w-[88vw] xs:max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] shadow-xl flex flex-col items-start gap-1"
              >
                <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 blob bg-primary/20" aria-hidden />

                <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-3 border border-primary/20">
                  <PawIcon className="h-3.5 w-3.5 text-accent" />
                  Cuidado vegano para mascotas
                </span>

                <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-ink tracking-tight">
                  {slide.title}
                </h1>

                <div className="paw-divider my-2 max-w-[10rem] ml-0 mr-auto text-accent">
                  <PawIcon className="paw-divider-icon" />
                </div>

                <p className="mt-1 font-sans text-sm xs:text-base sm:text-lg md:text-xl text-ink font-bold leading-tight">
                  {slide.subtitle1}
                </p>
                <p className="font-sans text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground italic tracking-[0.2em] font-semibold mt-0.5 lowercase">
                  {slide.subtitle2}
                </p>

                <p className="mt-2 sm:mt-3 font-sans text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
                  Espuma Limpiadora 150&nbsp;mL ·{" "}
                  <span className="text-primary font-extrabold">$45.000&nbsp;COP</span>
                </p>

                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      size="lg"
                      className="bg-primary hover:bg-primary/95 text-white font-sans text-xs sm:text-sm font-bold tracking-wide rounded-full px-5 py-4 sm:px-8 sm:py-6 shadow-lg shadow-primary/25 transition-all h-auto"
                      onClick={handleCompraAhora}
                    >
                      Comprar ahora
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="rounded-full border-primary/40 text-ink bg-card hover:bg-primary/5 hover:text-ink px-5 py-4 sm:px-7 sm:py-6 font-sans text-xs sm:text-sm font-bold transition-all h-auto"
                      asChild
                    >
                      <a href="#producto">Ver detalles</a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-cream/90 text-ink backdrop-blur-md transition-all hover:bg-primary hover:text-white"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-cream/90 text-ink backdrop-blur-md transition-all hover:bg-primary hover:text-white"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>

        <div className="absolute bottom-6 left-1/2 z-20 flex max-w-[90vw] -translate-x-1/2 flex-wrap justify-center gap-2">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? "w-6 bg-primary" : "w-2 bg-cream/70 hover:bg-cream"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            />
          ))}
        </div>

        <div className="absolute top-24 right-6 z-20 rounded-full bg-cream/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-ink tracking-widest border border-primary/20">
          {String(current + 1).padStart(2, "0")} / {String(carouselSlides.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  )
}
