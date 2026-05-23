"use client"

import { motion } from "framer-motion"
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
    description: "Producto de uso externo probado y aprobado para el cuidado de perros.",
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
  return (
    <section id="beneficios" className="bg-muted/30 py-20 sm:py-28 relative overflow-hidden">
      
      {/* Elementos decorativos sutiles de fondo */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Cabecera y Slider integrados en una grilla de dos columnas en desktop */}
        <div className="grid gap-12 lg:grid-cols-12 items-center mb-16">
          {/* Texto de Cabecera */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 self-center lg:self-start"
            >
              Beneficios Clave
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-4 font-secondary text-4xl sm:text-5xl font-normal tracking-tight text-foreground leading-[1.15]"
            >
              Beneficios para tu Mascota
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-base text-muted-foreground font-medium leading-relaxed"
            >
              Descubre por qué Guau Fresh es la mejor opción para mantener a tu peludo limpio, hidratado y feliz sin el estrés del baño tradicional. 
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 text-xs font-bold text-primary uppercase tracking-wider hidden lg:block"
            >
              Desliza la barra del comparador a la derecha para ver el cambio instantáneo 🐾👉
            </motion.p>
          </div>

          {/* Slider integrado */}
          <div className="lg:col-span-7 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <BeforeAfter embed={true} />
            </motion.div>
          </div>
        </div>

        {/* Grilla Bento Grid interactiva */}
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
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary cursor-pointer"
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
      </div>
    </section>
  )
}
