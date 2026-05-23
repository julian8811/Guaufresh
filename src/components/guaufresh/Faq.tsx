"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: "¿Cómo reemplaza el baño tradicional?",
    answer: "Guau Fresh limpia la suciedad acumulada y elimina malos olores en segundos y sin necesidad de agua. Es el aliado perfecto para la rutina de higiene diaria o para espaciar los baños tradicionales, evitando el estrés que estos causan en muchos perros y previniendo la resequedad en su piel por exceso de humedad."
  },
  {
    question: "¿Es seguro usarlo todos los días en las patas después del paseo?",
    answer: "Sí, es 100% seguro. De hecho, está diseñado precisamente para limpiar y desinfectar las huellas, el pelaje y el rostro de tu perro después de salir a la calle. Su fórmula con extracto de manzanilla y proteína de trigo acondiciona las almohadillas de las patas evitando que se agrieten o se resequen."
  },
  {
    question: "¿Qué hago si mi perro tiene piel sensible o alergias?",
    answer: "Nuestra espuma limpiadora es hipoalergénica y está formulada libre de parabenos, sulfatos, alcohol o siliconas que puedan irritar la dermis. La manzanilla tiene propiedades calmantes y desinflamatorias naturales, lo que la hace ideal para mascotas con pieles sensibles, atópicas o propensas a alergias."
  },
  {
    question: "¿Se puede usar en cachorros?",
    answer: "¡Claro que sí! Puedes utilizar la espuma limpiadora en cachorros a partir de las 8 semanas de vida. Su suavidad cuida el pelaje y la piel delicada de los más pequeños, y es excelente para introducirlos a la rutina de aseo sin la fricción ni el frío del agua."
  },
  {
    question: "¿Qué ingredientes naturales contiene?",
    answer: "Guau Fresh está hecho con ingredientes premium de origen vegetal: Proteína de Trigo Hidrolizada (que nutre profundamente, repara la cutícula del pelo y da brillo), Extracto de Manzanilla (que calma y protege la piel) y agentes de limpieza biodegradables y ultra suaves derivados del coco."
  }
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="bg-background py-20 sm:py-28 border-t border-border overflow-hidden relative">
      {/* Elementos decorativos */}
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-1"
          >
            Preguntas Frecuentes
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 font-secondary text-4xl sm:text-5xl font-normal tracking-tight text-foreground"
          >
            Resuelve tus dudas
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground font-medium"
          >
            Todo lo que necesitas saber sobre el cuidado, uso e ingredientes de nuestra espuma limpiadora natural.
          </motion.p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-sans font-bold text-sm sm:text-base text-foreground focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                    isOpen ? "bg-primary text-white rotate-180" : "bg-muted text-muted-foreground"
                  }`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm font-medium leading-relaxed text-muted-foreground border-t border-primary/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
