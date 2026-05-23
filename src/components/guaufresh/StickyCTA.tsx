"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"

const PRODUCT = {
  id: "guaufresh-50ml", // default quick buy or we can add 150ml
  name: "Guau Fresh - Espuma Limpiadora 150mL",
  price: 45000,
  image: baseHref("/product-foam.png"),
}

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const { addItem, setIsOpen } = useCartStore()

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar solo si se escrolea más de 500px y es móvil
      if (window.scrollY > 500 && window.innerWidth < 768) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const handleBuy = () => {
    addItem({
      id: "guaufresh-150ml",
      name: "Guau Fresh - Espuma Limpiadora 150mL",
      price: 45000,
      image: baseHref("/product-foam.png"),
    })
    setIsOpen(true)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-md border-t border-border p-3 shadow-2xl flex items-center justify-between gap-3 md:hidden px-4"
        >
          {/* Info Producto */}
          <div className="flex items-center gap-2">
            <img
              src={baseHref("/product-foam.png")}
              alt="Guau Fresh"
              className="h-9 w-auto object-contain rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-foreground font-sans truncate max-w-[120px] leading-tight">
                Espuma 150mL
              </span>
              <span className="text-xs font-extrabold text-primary font-sans leading-none mt-0.5">
                {formatPrice(45000)}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 shrink-0">
            {/* WhatsApp */}
            <Button
              onClick={() => window.open("https://wa.me/573000000000?text=Hola,%20quiero%20comprar%20GuauFresh%20150mL.", "_blank")}
              size="sm"
              variant="outline"
              className="h-10 w-10 p-0 rounded-xl border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 text-[#25D366]"
              aria-label="Comprar por WhatsApp"
            >
              <MessageSquare className="h-5 w-5 fill-[#25D366]/10" />
            </Button>

            {/* Agregar al carrito */}
            <Button
              onClick={handleBuy}
              size="sm"
              className="bg-primary text-white hover:bg-primary/95 text-xs font-bold font-sans uppercase tracking-wider rounded-xl h-10 px-4 gap-2"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Comprar</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
