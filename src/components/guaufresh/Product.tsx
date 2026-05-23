"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { baseHref } from "@/lib/base-href"

interface ProductData {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  category: string
}

const features = [
  "Proteína de trigo hidrolizada",
  "Extractos de origen vegetal",
  "Aroma agradable y fresco",
  "Textura espumosa fácil de aplicar",
  "Sin necesidad de enjuague",
  "Válvula dispensadora de precisión",
]

const specs = [
  { label: "Presentación", value: "Envase biodegradable con válvula" },
  { label: "Vida Útil", value: "1 año desde apertura" },
  { label: "Conservación", value: "Ambiente fresco, bajo sombra" },
]

const FALLBACK_PRODUCTS: ProductData[] = [
  {
    id: "guaufresh-50ml",
    name: "Guau Fresh - Espuma Limpiadora 50mL",
    description: "Espuma limpiadora en seco para perros y gatos con proteínas vegetales y extractos naturales. Ideal para patitas y hocico.",
    price: 38000,
    images: [baseHref("/product-foam.png")],
    stock: 100,
    category: "espuma"
  },
  {
    id: "guaufresh-150ml",
    name: "Guau Fresh - Espuma Limpiadora 150mL",
    description: "Espuma limpiadora en seco para perros y gatos con proteínas vegetales y extractos naturales. Rendimiento extendido para baños completos.",
    price: 45000,
    images: [baseHref("/product-foam.png")],
    stock: 100,
    category: "espuma"
  }
]

export const PACKS_DATA = [
  {
    id: "guaufresh-150ml",
    name: "Guau Fresh 150mL - Individual",
    price: 45000,
    desc: "1 Botella. Rinde hasta 60 limpiezas ($750 por uso).",
    badge: null,
  },
  {
    id: "guaufresh-duo-150ml",
    name: "Guau Fresh 150mL - Pack Dúo (Ahorra 10%)",
    price: 81000,
    desc: "2 Botellas. Rinde hasta 120 limpiezas. ¡Envío gratis!",
    badge: "Más Vendido",
  },
  {
    id: "guaufresh-kit-150ml",
    name: "Guau Fresh 150mL - Kit Paseo Premium",
    price: 55000,
    desc: "1 Botella + Toallita de microfibra premium absorbente.",
    badge: "Recomendado",
  }
]

export function Product() {
  const [products, setProducts] = useState<ProductData[]>(FALLBACK_PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("guaufresh-150ml")
  const [selectedPackId, setSelectedPackId] = useState<string>("guaufresh-150ml")
  const [isAdding, setIsAdding] = useState(false)
  const { addItem, setIsOpen } = useCartStore()
  const [activeTab, setActiveTab] = useState<"ingredients" | "specs" | "usage">("ingredients")

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'espuma')
        .order('price', { ascending: true })

      if (fetchError) throw fetchError

      if (data && data.length > 0) {
        setProducts(data)
        if (!data.find(p => p.id === selectedSize)) {
          setSelectedSize(data[1]?.id || data[0].id)
        }
      }
    } catch (err: any) {
      console.warn('Supabase offline. Usando productos locales.')
    } finally {
      setLoading(false)
    }
  }

  const currentProduct = products.find(p => p.id === selectedSize) || products[0]
  const is150ml = selectedSize === "guaufresh-150ml"
  const activePack = PACKS_DATA.find(p => p.id === selectedPackId) || PACKS_DATA[0]
  const displayPrice = is150ml ? activePack.price : (currentProduct?.price || 38000)

  const handleAddToCart = () => {
    if (!currentProduct) return
    setIsAdding(true)
    
    setTimeout(() => {
      if (is150ml) {
        addItem({
          id: activePack.id,
          name: activePack.name,
          price: activePack.price,
          image: baseHref("/product-foam.png"),
        })
      } else {
        addItem({
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          image: baseHref("/product-foam.png"),
        })
      }
      setIsAdding(false)
      setIsOpen(true) // Abre el carrito automáticamente para mejorar la UX
    }, 600)
  }

  return (
    <section id="producto" className="bg-background py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Contenedor principal asimétrico y moderno */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Columna Izquierda: Imagen de Producto Interactiva */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2.5rem] bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/20 p-8 flex items-center justify-center border border-primary/10 shadow-md group"
            >
              <div className="absolute top-6 left-6 inline-flex rounded-full bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                Envase Ecológico
              </div>

              {/* Imagen principal animada */}
              <motion.img
                key={selectedSize}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                src={baseHref("/product-foam.png")}
                alt={currentProduct?.name || "Guau Fresh Espuma Limpiadora"}
                className="h-[80%] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,167,159,0.25)] transition-all cursor-grab active:cursor-grabbing will-change-gpu"
              />

              {/* Aura de fondo */}
              <div className="absolute -bottom-6 w-3/4 h-6 bg-[#00a79f]/10 rounded-full blur-xl group-hover:scale-105 transition-transform duration-300" />
            </motion.div>
          </div>

          {/* Columna Derecha: Detalles del Producto */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-1">
                Fórmula Natural & Vegana
              </span>
              
              {/* Título de Marca MADE Dillan */}
              <h2 className="mt-4 font-secondary text-4xl sm:text-5xl font-normal leading-tight text-foreground">
                {currentProduct?.name.split(" - ")[1] || "Espuma Limpiadora en Seco"}
              </h2>
              
              {/* Descripción */}
              <p className="mt-4 text-base leading-relaxed text-muted-foreground font-medium">
                {currentProduct?.description}
              </p>
            </motion.div>

            {/* Selector de tamaños interactivo */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Presentación</p>
              <div className="flex gap-3 flex-wrap">
                {products.map((product) => {
                  const sizeMatch = product.name.match(/(\d+m[Ll])/);
                  const sizeLabel = sizeMatch ? sizeMatch[1] : product.name;
                  const isSelected = selectedSize === product.id;
                  
                  return (
                    <motion.button
                      key={product.id}
                      onClick={() => {
                        setSelectedSize(product.id)
                        if (product.id === "guaufresh-150ml") {
                          setSelectedPackId("guaufresh-150ml")
                        }
                      }}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative px-5 py-3 rounded-2xl border-2 font-sans font-bold text-sm tracking-wide transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary shadow-sm"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {sizeLabel}
                      {isSelected && (
                        <motion.span
                          layoutId="selectedIndicator"
                          className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Selector de packs si es 150ml */}
            {is150ml && (
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Elige un Paquete (Ahorro)</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PACKS_DATA.map((pack) => {
                    const isPackSelected = selectedPackId === pack.id
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setSelectedPackId(pack.id)}
                        className={`relative flex flex-col p-4 rounded-2xl border-2 transition-all text-left items-start justify-between min-h-[110px] ${
                          isPackSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {pack.badge && (
                          <span className="absolute -top-2.5 right-3 bg-secondary text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full border border-secondary/15">
                            {pack.badge}
                          </span>
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs font-bold font-sans text-foreground leading-tight">{pack.name.split(" - ")[1]}</span>
                          <span className="text-[10px] text-muted-foreground font-medium mt-1 leading-snug">{pack.desc}</span>
                        </div>
                        <span className="text-xs font-bold text-primary mt-2">{formatPrice(pack.price)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Precio y Añadir al Carrito */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Valor Total</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={displayPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl font-bold text-primary font-sans mt-1"
                  >
                    {formatPrice(displayPrice)}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex-1 min-w-[200px]">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full gap-3 bg-primary text-white hover:bg-primary/95 font-sans font-bold text-sm uppercase tracking-wider rounded-2xl h-14 shadow-lg shadow-primary/15"
                    onClick={handleAddToCart}
                    disabled={!currentProduct || currentProduct.stock === 0 || isAdding}
                  >
                    {isAdding ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                    )}
                    {currentProduct?.stock === 0 ? "Agotado" : isAdding ? "Agregando..." : "Agregar al Carrito"}
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Características con Stagger reveal */}
            <div className="mt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Beneficios Clave</h3>
              <motion.ul 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.05 }
                  }
                }}
                className="mt-3 grid gap-2 sm:grid-cols-2 text-sm" 
                role="list"
              >
                {features.map((feature) => (
                  <motion.li 
                    key={feature}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-2.5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-primary">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-foreground font-medium text-[0.9rem]">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Tabs de Información de Producto */}
            <div className="mt-8">
              {/* Encabezado de Pestañas */}
              <div className="flex border-b border-border gap-6 text-sm font-sans font-bold mb-4">
                {[
                  { id: "ingredients", label: "Ingredientes" },
                  { id: "specs", label: "Especificaciones" },
                  { id: "usage", label: "Modo de Uso" },
                ].map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`relative pb-3 tracking-wide transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Contenido de Pestañas con AnimatePresence */}
              <div className="min-h-[160px] rounded-3xl bg-muted/20 p-6 border border-border relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === "ingredients" && (
                    <motion.div
                      key="ingredients"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-4 sm:grid-cols-2 text-xs font-medium text-muted-foreground"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground font-bold text-sm">Proteína de Trigo</span>
                        <p className="leading-relaxed">Hidrata profundamente, repara la cutícula del pelaje y previene la resequedad cutánea.</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground font-bold text-sm">Extracto de Manzanilla</span>
                        <p className="leading-relaxed">Calma irritaciones de la piel y aporta un brillo natural al pelaje.</p>
                      </div>
                      <div className="flex flex-col gap-1 col-span-full border-t border-border/40 pt-3">
                        <span className="text-foreground font-bold text-sm">Extractos de Origen Vegetal</span>
                        <p className="leading-relaxed">Limpian suavemente eliminando la suciedad y malos olores sin afectar la dermis de tu mascota.</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "specs" && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-4 grid-cols-2 sm:grid-cols-3 text-xs"
                    >
                      {specs.map((spec) => (
                        <div key={spec.label} className="border-r border-border/60 last:border-0 pr-2">
                          <dt className="font-semibold text-muted-foreground">{spec.label}</dt>
                          <dd className="text-foreground font-bold mt-1 leading-tight">{spec.value}</dd>
                        </div>
                      ))}
                      <div>
                        <dt className="font-semibold text-muted-foreground">Contenido Neto</dt>
                        <dd className="text-foreground font-bold mt-1 leading-tight">
                          {currentProduct?.name?.match(/(\d+m[Ll])/)?.[1] || "150mL"}
                        </dd>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "usage" && (
                    <motion.div
                      key="usage"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 text-xs text-muted-foreground font-medium"
                    >
                      <p className="leading-relaxed">
                        <strong className="text-foreground">Aplicación Directa:</strong> Dosificá la espuma en la palma de tu mano o directamente sobre tu mascota y masajeá circularmente a contrapelo.
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-foreground">Sin Enjuague:</strong> Remové el exceso de suciedad pasando una toalla limpia o húmeda. No necesita secadora.
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-foreground">Seguridad:</strong> Producto 100% seguro y biodegradable en caso de lamido ocasional post-limpieza.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
