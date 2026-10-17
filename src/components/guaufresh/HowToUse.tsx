"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { baseHref } from "@/lib/base-href"

const steps = [
  {
    number: "01",
    title: "Agitar Antes de Usar",
    description: "Agita bien el envase antes de cada aplicación para asegurar una mezcla homogénea.",
    image: baseHref("/howto/paso-01.webp?v=1"),
    alt: "Botellas Guau Fresh listas para agitar antes de usar",
  },
  {
    number: "02",
    title: "Aplicar la Espuma",
    description: "Presiona la válvula en posición vertical y dosifica la espuma directamente sobre tu peludo.",
    image: baseHref("/howto/paso-02.webp?v=1"),
    alt: "Aplicación de espuma Guau Fresh sobre la pata de un perro",
  },
  {
    number: "03",
    title: "Masajear en Círculos",
    description: "Masajea suavemente en forma circular para distribuir el producto por todo el pelaje.",
    image: baseHref("/howto/paso-03.webp?v=1"),
    alt: "Masaje de espuma Guau Fresh en el pelaje de la mascota",
  },
  {
    number: "04",
    title: "Limpiar con Toalla",
    description: "Limpia con una toalla seca o húmeda para remover la suciedad. ¡Listo, peludo limpio y feliz!",
    image: baseHref("/howto/paso-04.webp?v=1"),
    alt: "Limpieza final con toalla después de usar Guau Fresh",
  },
]

const precautions = [
  "Producto de uso externo, seguro para perros y gatos de todas las edades.",
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
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
}

export function HowToUse() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]

  return (
    <section id="como-usar" className="relative overflow-hidden bg-primary/5 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 blob bg-primary/15" aria-hidden />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 blob-alt bg-lime/25" aria-hidden />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.45, 0.3],
          x: ["-50%", "-48%", "-50%"],
          y: ["-50%", "-52%", "-50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-normal tracking-tight text-foreground sm:text-5xl"
          >
            Cómo usar Guau Fresh
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base font-medium text-muted-foreground text-wrap-pretty sm:text-lg"
          >
            Toca cada paso para ver la imagen correspondiente. Así mantienes a tu compañero limpio y perfumado en pocos minutos.
          </motion.p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative space-y-6 pl-2 sm:space-y-8 sm:pl-4 lg:col-span-7"
            role="tablist"
            aria-label="Pasos de uso Guau Fresh"
          >
            <div className="pointer-events-none absolute bottom-10 left-[2.5rem] top-10 w-[3px] bg-primary/10 sm:left-[3.5rem]">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full w-full origin-top bg-primary"
              />
            </div>

            {steps.map((step, index) => {
              const isActive = index === activeIndex
              return (
                <motion.button
                  key={step.number}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="howto-step-image"
                  id={`howto-step-${step.number}`}
                  variants={stepVariants}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex w-full items-start gap-4 rounded-2xl border p-3 text-left transition-all sm:gap-6 sm:p-4 ${
                    isActive
                      ? "border-primary/40 bg-card shadow-md shadow-primary/10"
                      : "border-transparent hover:border-primary/20 hover:bg-card/70"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background font-sans text-xl font-bold text-white shadow-md transition-colors duration-300 sm:h-20 sm:w-20 sm:text-2xl ${
                      isActive ? "bg-secondary text-ink" : "bg-primary group-hover:bg-secondary group-hover:text-ink"
                    }`}
                  >
                    {step.number}
                  </motion.div>

                  <div className="flex-1 pt-2 sm:pt-3">
                    <h3
                      className={`text-lg font-bold leading-snug transition-colors duration-300 sm:text-xl ${
                        isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="relative flex w-full items-center justify-center lg:col-span-5"
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-transparent to-secondary/15 opacity-75 blur-3xl" />

            <div className="relative w-full max-w-[400px] rounded-[2rem] border border-primary/20 bg-background/50 p-3 shadow-2xl backdrop-blur-md transition-all duration-300 sm:p-4 lg:max-w-none">
              <div
                id="howto-step-image"
                role="tabpanel"
                aria-labelledby={`howto-step-${activeStep.number}`}
                className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-primary/10 bg-cream"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep.image}
                    src={activeStep.image}
                    alt={activeStep.alt}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 h-full w-full object-cover select-none"
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>

                <div className="absolute bottom-3 left-3 rounded-full border border-primary/20 bg-cream/95 px-3 py-1 text-xs font-bold tracking-widest text-ink shadow-sm">
                  Paso {activeStep.number}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile thumbnail strip for quick switching */}
        <div className="mt-8 flex justify-center gap-2 lg:hidden" aria-hidden>
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-primary" : "w-2 bg-ink/25"
              }`}
              aria-label={`Ver paso ${step.number}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
          className="mx-auto mt-24 max-w-4xl rounded-3xl border border-secondary/25 bg-secondary/5 p-8 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-primary" />
            <h3 className="font-sans text-lg font-bold tracking-wide text-foreground">Precauciones de Uso</h3>
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
                <span
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="text-sm font-medium leading-relaxed text-muted-foreground">{precaution}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
