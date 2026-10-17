"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { baseHref } from "@/lib/base-href"
import { PawIcon } from "@/components/guaufresh/PawIcon"

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

const SWIPE_THRESHOLD = 60

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { addItem } = useCartStore()
  const slide = carouselSlides[current]

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % carouselSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }, [])

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  useEffect(() => {
    if (paused) return
    const id = setInterval(nextSlide, 8000)
    return () => clearInterval(id)
  }, [paused, nextSlide])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement) && document.activeElement !== sectionRef.current) {
        return
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [nextSlide, prevSlide])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) {
      nextSlide()
    } else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 500) {
      prevSlide()
    }
  }

  const handleCompraAhora = () => {
    addItem(PRODUCT)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 280 : -280,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 280 : -280,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  return (
    <section
      id="inicio"
      ref={sectionRef}
      tabIndex={0}
      aria-roledescription="carrusel"
      aria-label="Carrusel Guau Fresh"
      className="relative w-full overflow-hidden bg-cream outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 blob bg-primary/25 blur-sm" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 blob-alt bg-lime/40 blur-sm" aria-hidden />

      <div className="container relative z-10 mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Copy card */}
          <div className="order-2 w-full max-w-xl lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex w-full flex-col items-start gap-1 rounded-[1.5rem] border border-primary/20 bg-card/95 p-5 shadow-xl backdrop-blur-md sm:rounded-[2rem] sm:rounded-tr-[5.5rem] sm:p-8 md:p-10"
              >
                <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 blob bg-primary/20" aria-hidden />

                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
                  <PawIcon className="h-4 w-4 text-accent" />
                  Cuidado vegano para mascotas
                </span>

                <h1 className="font-display text-3xl font-normal leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <div className="paw-divider my-2 ml-0 mr-auto max-w-[10rem] text-accent">
                  <PawIcon className="paw-divider-icon" />
                </div>

                <p className="mt-1 font-sans text-base font-bold leading-tight text-ink sm:text-lg md:text-xl">
                  {slide.subtitle1}
                </p>
                <p className="mt-0.5 font-sans text-xs font-semibold lowercase italic tracking-[0.2em] text-muted-foreground sm:text-sm md:text-base">
                  {slide.subtitle2}
                </p>

                <p className="mt-2 font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground sm:mt-3 sm:text-sm">
                  Espuma Limpiadora 150&nbsp;mL ·{" "}
                  <span className="font-extrabold text-primary">$45.000&nbsp;COP</span>
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      size="lg"
                      className="h-auto rounded-full bg-primary px-5 py-4 font-sans text-xs font-bold tracking-wide text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/95 sm:px-8 sm:py-6 sm:text-sm"
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
                      className="h-auto rounded-full border-primary/40 bg-card px-5 py-4 font-sans text-xs font-bold text-ink transition-all hover:bg-primary/5 hover:text-ink sm:px-7 sm:py-6 sm:text-sm"
                      asChild
                    >
                      <a href="#producto">Ver detalles</a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Photo frame — height driven by square aspect, no crop */}
          <div className="relative order-1 w-full lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[2rem] border border-primary/15 bg-cream shadow-lg sm:rounded-[2.5rem] lg:max-w-none">
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
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 h-full w-full cursor-grab object-contain object-center active:cursor-grabbing"
                  decoding="async"
                  draggable={false}
                />
              </AnimatePresence>

              <div className="absolute right-3 top-3 z-20 rounded-full border border-primary/20 bg-cream/90 px-3 py-1 text-xs font-bold tracking-widest text-ink backdrop-blur-md">
                {String(current + 1).padStart(2, "0")} / {String(carouselSlides.length).padStart(2, "0")}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-cream/95 text-ink shadow-md backdrop-blur-md transition-all hover:bg-primary hover:text-white md:left-0 md:-translate-x-1/2"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-cream/95 text-ink shadow-md backdrop-blur-md transition-all hover:bg-primary hover:text-white md:right-0 md:translate-x-1/2"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="mt-8 flex max-w-full flex-wrap justify-center gap-2">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? "w-6 bg-primary" : "w-2 bg-ink/25 hover:bg-ink/50"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
              aria-current={current === idx ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
