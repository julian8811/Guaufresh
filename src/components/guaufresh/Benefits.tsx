"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplets, Sparkles, Heart, Leaf, Clock, Shield, type LucideIcon } from "lucide-react"
import { baseHref } from "@/lib/base-href"
import { BeforeAfter } from "./BeforeAfter"

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

const benefits: Benefit[] = [
  {
    icon: Droplets,
    title: "Limpieza Sin Agua",
    description: "Limpia en seco el pelaje de tu mascota sin necesidad de mojarla completamente.",
    image: baseHref("/benefits/benefit-limpieza.png"),
  },
  {
    icon: Sparkles,
    title: "Brillo y Suavidad",
    description: "Deja el pelaje brillante, suave y con un aroma fresco y agradable.",
    image: baseHref("/benefits/benefit-brillo.png"),
  },
  {
    icon: Heart,
    title: "Humecta la Piel",
    description: "Hidrata y cuida la piel de tu peludo gracias a sus proteínas vegetales.",
    image: baseHref("/benefits/benefit-humecta.png"),
  },
  {
    icon: Leaf,
    title: "Ingredientes Naturales",
    description: "Formulado con extractos y proteínas de origen vegetal, seguro para tu mascota.",
    image: baseHref("/benefits/benefit-ingredientes.png"),
  },
  {
    icon: Clock,
    title: "Rápido y Práctico",
    description: "Ideal para limpiezas rápidas entre baños o cuando no hay tiempo.",
    image: baseHref("/benefits/benefit-rapido.png"),
  },
  {
    icon: Shield,
    title: "Seguro y Confiable",
    description: "Producto de uso externo probado y aprobado para el cuidado de perros y gatos.",
    image: baseHref("/benefits/benefit-seguro.png"),
  },
]

// Contenedor stagger para las tarjetas
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Variantes para cada tarjeta de beneficio
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
}

export function Benefits() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <section id="beneficios" className="bg-cream py-20 sm:py-28 relative overflow-hidden">
      
      {/* Elementos decorativos Manual 2026 */}
      <div className="absolute top-10 left-10 h-72 w-72 blob bg-primary/10" aria-hidden />
      <div className="absolute bottom-10 right-10 h-72 w-72 blob-alt bg-lime/30" aria-hidden />
      <div className="absolute top-1/3 right-1/4 h-10 w-10 rounded-full border-2 border-primary/25" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Título único + comparador (sin bloque de párrafo suelto) */}
        <div className="mb-10 text-center lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            Beneficios para tu mascota
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mx-auto mt-2 max-w-xl text-sm font-medium text-muted-foreground sm:text-base"
          >
            Limpieza sin agua, en segundos.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 w-full max-w-lg lg:mb-16 lg:max-w-xl"
        >
          <BeforeAfter embed={true} />
        </motion.div>

        {/* Carrusel en mobile y Bento Grid en desktop */}
        {isMobile ? (
          <div className="mt-12 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] min-h-[300px] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="group relative flex min-h-[300px] w-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-md cursor-pointer"
                >
                  {/* Imagen de fondo */}
                  <div
                    className="absolute inset-0 scale-100 bg-cover bg-center opacity-[0.85] saturate-100 brightness-100"
                    style={{ backgroundImage: `url(${benefits[currentIndex].image})` }}
                  />
                  
                  {/* Capa degradada para contraste de texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-900/40 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-8">
                    {/* Contenedor del icono */}
                    <div className="mb-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white shadow-md backdrop-blur-md border border-white/20">
                      {(() => {
                        const Icon = benefits[currentIndex].icon
                        return <Icon className="h-6 w-6" aria-hidden />
                      })()}
                    </div>
                    
                    {/* Título de la tarjeta */}
                    <h3 className="text-xl font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                      {benefits[currentIndex].title}
                    </h3>
                    
                    {/* Descripción de la tarjeta */}
                    <p className="mt-2 text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                      {benefits[currentIndex].description}
                    </p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Paginación - Puntos */}
            <div className="mt-6 flex gap-2">
              {benefits.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Ver beneficio ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {benefits.map((benefit) => (
              <motion.article
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)" }}
                className="group relative flex min-h-[280px] sm:min-h-[300px] w-[80vw] sm:w-auto shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary cursor-pointer"
              >
                {/* Imagen de fondo */}
                <div
                  className="absolute inset-0 scale-105 bg-cover bg-center transition-all duration-500 ease-out opacity-[0.25] saturate-[0.6] brightness-[0.9] group-hover:scale-100 group-hover:opacity-[0.85] group-hover:saturate-100 group-hover:brightness-100"
                  style={{ backgroundImage: `url(${benefit.image})` }}
                />
                
                {/* Capa degradada para contraste de texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-950/45 to-transparent transition-opacity duration-500 group-hover:from-neutral-950/70 group-hover:via-neutral-900/30" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
                  {/* Contenedor del icono con animación en hover */}
                  <div className="mb-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white border border-white/20">
                    <benefit.icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-12" aria-hidden />
                  </div>
                  
                  {/* Título de la tarjeta */}
                  <h3 className="text-xl font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                    {benefit.title}
                  </h3>
                  
                  {/* Descripción de la tarjeta */}
                  <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                    {benefit.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
