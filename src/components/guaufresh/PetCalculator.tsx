"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ShoppingCart, Info, Dog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"

type PetSize = "small" | "medium" | "large"

const SIZES_DATA = {
  small: {
    label: "Pequeño",
    desc: "Hasta 10 kg (ej. Poodle, Shih Tzu, Salchicha)",
    mlPerUse: 1.2,
    iconSize: "h-5 w-5",
  },
  medium: {
    label: "Mediano",
    desc: "11 a 25 kg (ej. Bulldog Francés, Cocker, Border Collie)",
    mlPerUse: 2.5,
    iconSize: "h-6 w-6",
  },
  large: {
    label: "Grande",
    desc: "Más de 25 kg (ej. Golden Retriever, Pastor Alemán, Samoyedo)",
    mlPerUse: 4.2,
    iconSize: "h-7 w-7",
  },
}

const PRODUCTS_DATA = {
  "guaufresh-50ml": {
    id: "guaufresh-50ml",
    name: "Guau Fresh - Espuma Limpiadora 50mL",
    price: 38000,
    volume: 50,
  },
  "guaufresh-150ml": {
    id: "guaufresh-150ml",
    name: "Guau Fresh - Espuma Limpiadora 150mL",
    price: 45000,
    volume: 150,
  },
}

export function PetCalculator() {
  const [petSize, setPetSize] = useState<PetSize>("medium")
  const [useFrequency, setUseFrequency] = useState(7) // veces por semana
  const [selectedProductKey, setSelectedProductKey] = useState<"guaufresh-50ml" | "guaufresh-150ml">("guaufresh-150ml")
  const [isAdding, setIsAdding] = useState(false)
  const { addItem, setIsOpen } = useCartStore()

  const activeSize = SIZES_DATA[petSize]
  const activeProduct = PRODUCTS_DATA[selectedProductKey]

  // Cálculos
  const mlPerWeek = activeSize.mlPerUse * useFrequency
  const totalUses = activeProduct.volume / activeSize.mlPerUse
  const weeksDuration = Math.max(1, Math.round(activeProduct.volume / mlPerWeek))
  const costPerUse = (activeProduct.price / activeProduct.volume) * activeSize.mlPerUse

  // Recomendación inteligente automática
  const recommendedProductKey = (petSize === "large" || useFrequency >= 10) ? "guaufresh-150ml" : "guaufresh-50ml"

  const handleBuy = () => {
    setIsAdding(true)
    setTimeout(() => {
      addItem({
        id: activeProduct.id,
        name: activeProduct.name,
        price: activeProduct.price,
        image: baseHref("/product-foam.png"),
      })
      setIsAdding(false)
      setIsOpen(true)
    }, 600)
  }

  return (
    <section className="bg-muted/10 py-20 sm:py-28 border-t border-border overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-1"
          >
            Compra Inteligente
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 font-secondary text-4xl sm:text-5xl font-normal tracking-tight text-foreground"
          >
            Calculá el Rendimiento
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground font-medium"
          >
            Ingresá el tamaño de tu perro y la frecuencia de uso para estimar cuánto tiempo 
            te durará el envase y cuál será el costo por limpieza.
          </motion.p>
        </div>

        {/* Contenedor Principal de la Calculadora */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Columna Izquierda: Entradas de datos */}
          <div className="lg:col-span-7 bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* 1. Tamaño del perro */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                1. Tamaño de tu Mascota
              </label>
              <div className="grid gap-3 grid-cols-3">
                {(Object.keys(SIZES_DATA) as PetSize[]).map((sizeKey) => {
                  const size = SIZES_DATA[sizeKey]
                  const isSelected = petSize === sizeKey
                  return (
                    <button
                      key={sizeKey}
                      onClick={() => setPetSize(sizeKey)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <Dog className={size.iconSize} />
                      <span className="text-xs font-bold font-sans tracking-wide">{size.label}</span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground font-medium text-center italic">
                {activeSize.desc}
              </p>
            </div>

            {/* 2. Frecuencia de uso */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  2. Limpiezas por semana
                </label>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {useFrequency} {useFrequency === 1 ? "vez" : "veces"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={useFrequency}
                onChange={(e) => setUseFrequency(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[0.7rem] text-muted-foreground font-bold mt-2 uppercase tracking-wide">
                <span>1 vez/semana</span>
                <span>Diario (7)</span>
                <span>2 veces/día (14)</span>
              </div>
            </div>

            {/* 3. Selección de Envase */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                3. Tamaño del Envase
              </label>
              <div className="grid gap-3 grid-cols-2">
                {(Object.keys(PRODUCTS_DATA) as Array<keyof typeof PRODUCTS_DATA>).map((prodKey) => {
                  const prod = PRODUCTS_DATA[prodKey]
                  const isSelected = selectedProductKey === prodKey
                  const isRecommended = recommendedProductKey === prodKey
                  return (
                    <button
                      key={prodKey}
                      onClick={() => setSelectedProductKey(prodKey)}
                      className={`relative flex flex-col p-4 rounded-2xl border-2 transition-all items-start ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {isRecommended && (
                        <span className="absolute -top-2.5 right-3 bg-secondary text-primary text-[0.6rem] font-bold px-2 py-0.5 rounded-full border border-primary/10">
                          Recomendado
                        </span>
                      )}
                      <span className="text-sm font-bold font-sans">{prod.volume} mL</span>
                      <span className="text-xs font-medium text-muted-foreground mt-1">{formatPrice(prod.price)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Resultados y Call to Action */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary/10 via-background to-secondary/5 border border-primary/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-3 mb-6">
                <Info className="h-4 w-4" />
                <span>Resultados de Rendimiento</span>
              </div>

              {/* Estadísticas */}
              <div className="space-y-6">
                
                {/* Duración */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duración Estimada</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-5xl font-bold text-foreground font-sans">{weeksDuration}</span>
                    <span className="text-lg font-bold text-muted-foreground">{weeksDuration === 1 ? "semana" : "semanas"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 font-medium leading-relaxed">
                    Te rinde aproximadamente para <span className="font-bold text-foreground">{Math.round(totalUses)} usos</span> completos de patitas y rostro.
                  </p>
                </div>

                {/* Costo por uso */}
                <div className="border-t border-primary/5 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Costo por Limpieza</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-bold text-primary font-sans">{formatPrice(Math.round(costPerUse))}</span>
                    <span className="text-xs font-bold text-muted-foreground">COP</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    Una alternativa súper económica frente a los baños tradicionales o toallitas húmedas desechables.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de compra */}
            <div className="mt-8 border-t border-primary/5 pt-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleBuy}
                  disabled={isAdding}
                  size="lg"
                  className="w-full gap-3 bg-primary text-white hover:bg-primary/95 font-sans font-bold text-sm uppercase tracking-wider rounded-2xl h-14 shadow-lg shadow-primary/15"
                >
                  {isAdding ? (
                    <span className="animate-spin mr-2">⏳</span>
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                  {isAdding ? "Agregando..." : `Comprar Envase de ${activeProduct.volume}mL`}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
