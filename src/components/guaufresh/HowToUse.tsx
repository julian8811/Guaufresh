"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { baseHref } from "@/lib/base-href"

const steps = [
  {
    number: "01",
    title: "Agitar Antes de Usar",
    description: "Agita bien el envase antes de cada aplicación para asegurar una mezcla homogénea.",
  },
  {
    number: "02",
    title: "Aplicar la Espuma",
    description: "Presiona la válvula en posición vertical y dosifica la espuma directamente sobre tu peludo.",
  },
  {
    number: "03",
    title: "Masajear en Círculos",
    description: "Masajea suavemente en forma circular para distribuir el producto por todo el pelaje.",
  },
  {
    number: "04",
    title: "Limpiar con Toalla",
    description: "Limpia con una toalla seca o húmeda para remover la suciedad. ¡Listo, peludo limpio y feliz!",
  },
]

const precautions = [
  "Producto de uso externo, seguro para perros de todas las edades.",
  "Manténgase fuera del alcance de niños y animales domésticos sin supervisión.",
  "Evite la ingestión directa y el contacto directo con los ojos o fosas nasales.",
  "En caso de presentar alguna irritación alérgica, suspenda su uso de inmediato.",
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, x: -30, y: 10 },
  show: { 
    opacity: 1, 
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 14 } 
  },
}

export function HowToUse() {
  return (
    <section id="como-usar" className="bg-muted/10 py-20 sm:py-28 relative overflow-hidden">
      
      {/* Círculo decorativo de fondo animado y sutilmente respirando */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.45, 0.3],
          x: ["-50%", "-48%", "-50%"],
          y: ["-50%", "-52%", "-50%"]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Título de la sección */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-secondary text-4xl sm:text-5xl font-normal tracking-tight text-foreground"
          >
            Cómo usar Guau Fresh
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground font-medium text-wrap-pretty"
          >
            Sigue estos sencillos pasos para mantener a tu compañero de cuatro patas limpio y perfumado en pocos minutos.
          </motion.p>
        </div>

        {/* Grilla principal de 2 columnas en Desktop */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Columna Izquierda: Los Pasos en Línea Temporal */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 relative space-y-12 pl-2 sm:pl-4"
          >
            {/* Línea conectora vertical de fondo con animación de scroll */}
            <div className="absolute left-[2.5rem] sm:left-[3.5rem] top-10 bottom-10 w-[3px] bg-primary/10 pointer-events-none">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full w-full bg-primary origin-top"
              />
            </div>

            {steps.map((step, index) => (
              <motion.article 
                key={step.number} 
                variants={stepVariants}
                className="flex gap-4 sm:gap-6 items-start relative group cursor-pointer"
              >
                {/* Círculo animado con el número */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold font-sans text-white shadow-md border-4 border-background transition-colors duration-300 group-hover:bg-secondary group-hover:shadow-lg relative z-10"
                >
                  {step.number}
                </motion.div>
                
                {/* Contenido del Paso */}
                <div className="flex-1 pt-2 sm:pt-4">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Columna Derecha: El Banner Visual con Flotación */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center w-full"
          >
            {/* Brillo dinámico detrás del banner */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/15 rounded-[2.5rem] blur-3xl opacity-75 pointer-events-none" />
            
            {/* Card del Banner Flotante */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-[400px] lg:max-w-none rounded-[2rem] overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl p-3 sm:p-4 transition-all duration-300 hover:shadow-primary/10 hover:border-primary/40 will-change-gpu"
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/10">
                <img 
                  src={baseHref("/como-usar-banner.webp?v=1")} 
                  alt="Banner instructivo - Rutina de 3 pasos de Guau Fresh" 
                  className="w-full h-auto object-cover select-none"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Caja de Precauciones Rediseñada */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
          className="mt-24 rounded-3xl bg-secondary/5 p-8 border border-secondary/25 shadow-sm max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold text-foreground tracking-wide font-sans">Precauciones de Uso</h3>
          </div>
          
          <ul className="grid gap-4 sm:grid-cols-2" role="list">
            {precautions.map((precaution, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 + 0.4 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="text-muted-foreground font-medium text-sm leading-relaxed">{precaution}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}
