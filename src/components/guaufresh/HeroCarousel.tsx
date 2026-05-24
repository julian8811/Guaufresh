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
  headline: string
}

const carouselSlides: Slide[] = [
  {
    src: baseHref("/carousel/hero-01.webp?v=2"),
    alt: "Perro alegre recibiendo limpieza con espuma Guau Fresh en hogar luminoso",
    headline: "Baño seco para perros: espuma limpiadora sin enjuague",
  },
  {
    src: baseHref("/carousel/hero-02.webp?v=2"),
    alt: "Perro salchicha con botella Guau Fresh sobre fondo claro",
    headline: "Limpieza suave entre baños",
  },
  {
    src: baseHref("/carousel/hero-03.webp?v=2"),
    alt: "Salchicha de pelo largo con producto y toalla Guau Fresh",
    headline: "Cuidado en casa, sin complicaciones",
  },
  {
    src: baseHref("/carousel/hero-04.webp?v=2"),
    alt: "Golden retriever en jardín con espuma limpiadora Guau Fresh",
    headline: "Brillo y frescura al aire libre",
  },
  {
    src: baseHref("/carousel/hero-05.webp?v=2"),
    alt: "Mascota y producto Guau Fresh en entorno soleado",
    headline: "Ingredientes naturales para tu peludo",
  },
  {
    src: baseHref("/carousel/hero-06.webp?v=2"),
    alt: "Espuma limpiadora Guau Fresh con ingredientes naturales sobre mármol",
    headline: "Fórmula pensada para tu mascota",
  },
  {
    src: baseHref("/carousel/hero-07.webp?v=2"),
    alt: "Bulldog francés con espuma limpiadora Guau Fresh",
    headline: "Patas y rostro, sin enjuague",
  },
  {
    src: baseHref("/carousel/hero-08.webp?v=2"),
    alt: "Bulldog francés con iluminación de estudio y Guau Fresh",
    headline: "Calidad que se nota",
  },
  {
    src: baseHref("/carousel/hero-09.webp?v=2"),
    alt: "Aplicación de espuma Guau Fresh en el pelaje al aire libre",
    headline: "Rutina fácil, resultados reales",
  },
  {
    src: baseHref("/carousel/hero-10.webp?v=2"),
    alt: "Ingredientes naturales de manzanilla y trigo junto a Guau Fresh",
    headline: "Guau Fresh · naturalmente",
  },
]

const PRODUCT = {
  id: "guaufresh-espuma-150ml",
  name: "Guau Fresh - Espuma Limpiadora 150mL",
  price: 45000,
  image: baseHref("/product-foam.png"),
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
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

  // Animación del contenedor de la imagen
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 1.05
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  }

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-neutral-900">
      <div className="relative min-h-[60vh] sm:min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] w-full flex items-center justify-center">
        
        {/* Imagen deslizable */}
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

        {/* Overlay degradado elegante */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent"
          aria-hidden
        />

        {/* Contenido de texto con animación Stagger */}
        <div className="container relative z-10 mx-auto px-6 py-12 md:py-24 flex items-end md:items-center justify-start h-full">
          <div className="w-full max-w-2xl text-left md:max-w-xl lg:max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Categoría superior */}
                <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-primary bg-primary/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-4 border border-primary/20">
                  Guau Fresh Cuidado Vegano
                </span>
                
                {/* Headline con tipografía MADE Dillan (font-secondary) */}
                <h1 className="font-secondary text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1] text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  {slide.headline}
                </h1>
                
                <p className="mt-4 font-sans text-base md:text-lg text-neutral-200 font-medium drop-shadow-[0_1px_5px_rgba(0,0,0,0.3)]">
                  Espuma Limpiadora 150&nbsp;mL · <span className="text-[#F9F871] font-bold">$45.000&nbsp;COP</span>
                </p>

                {/* CTAs animados */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      size="lg"
                      className="bg-primary hover:bg-primary/95 text-white font-sans text-sm font-bold tracking-wide rounded-full px-8 py-6 shadow-lg shadow-primary/20 transition-all"
                      onClick={handleCompraAhora}
                    >
                      Comprar ahora
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="rounded-full border-white/60 text-white bg-transparent hover:text-white px-7 py-6 font-sans text-sm font-medium transition-all"
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

        {/* Navegación - Flechas */}
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-neutral-900"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-neutral-900"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>

        {/* Paginación - Puntos */}
        <div className="absolute bottom-6 left-1/2 z-20 flex max-w-[90vw] -translate-x-1/2 flex-wrap justify-center gap-2">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            />
          ))}
        </div>

        {/* Contador superior en esquina */}
        <div className="absolute top-24 right-6 z-20 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white tracking-widest border border-white/10">
          {String(current + 1).padStart(2, "0")} / {String(carouselSlides.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  )
}
