"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"
import { Separator } from "@/components/ui/separator"

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, isOpen, setIsOpen, clearCart } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md rounded-l-3xl border-border bg-card p-6 shadow-2xl">
        <SheetHeader className="space-y-2">
          <SheetTitle className="flex items-center gap-2 text-xl font-sans font-bold">
            <ShoppingCart className="h-5 w-5 text-primary" aria-hidden="true" />
            Carrito de Compras
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="ml-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Revisa los productos agregados a tu carrito.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-full bg-muted/30 border border-border p-6"
            >
              <ShoppingCart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            </motion.div>
            <div>
              <p className="text-lg font-bold text-foreground">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega productos para comenzar tu compra.
              </p>
            </div>
            <SheetClose asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="mt-4 bg-primary text-white hover:bg-primary/95 font-sans font-bold text-sm tracking-wide rounded-xl px-6 py-5">
                  Seguir Comprando
                </Button>
              </motion.div>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Lista de productos animada */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {/* Indicador de Envío Gratis */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 my-2">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground font-sans uppercase tracking-wider">Envío Gratis</span>
                  <span className="text-primary">
                    {totalPrice >= 150000
                      ? "¡Alcanzado!"
                      : `Faltan ${formatPrice(150000 - totalPrice)}`}
                  </span>
                </div>
                <div className="h-2 w-full bg-border/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalPrice / 150000) * 100, 100)}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
                <p className="mt-2 text-[0.72rem] text-muted-foreground leading-relaxed text-center font-medium">
                  {totalPrice >= 150000
                    ? "¡Felicidades! Tu envío es 100% gratuito de regalo 🎉"
                    : `Suma ${formatPrice(150000 - totalPrice)} más a tu compra y te regalamos el envío.`}
                </p>
              </div>

              <ul className="divide-y divide-border overflow-hidden" role="list" aria-label="Productos en el carrito">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 30, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="py-4 overflow-hidden"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-muted border border-border">
                          <img
                            src={
                              (item.id.includes("150ml") || item.name.includes("150m") || item.name.includes("150M"))
                                ? baseHref("/product-foam-150ml.webp?v=1") 
                                : baseHref("/product-foam-50ml.webp?v=1")
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-foreground line-clamp-1">{item.name}</h3>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground transition-colors hover:text-destructive p-1 rounded-lg"
                              aria-label={`Eliminar ${item.name} del carrito`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </motion.button>
                          </div>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {formatPrice(item.price)}
                          </p>
                          <div className="mt-2 flex items-center gap-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted font-bold"
                              aria-label={`Reducir cantidad de ${item.name}`}
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </motion.button>
                            <span className="w-8 text-center text-sm font-bold" aria-label={`Cantidad: ${item.quantity}`}>
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted font-bold"
                              aria-label={`Aumentar cantidad de ${item.name}`}
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <Separator className="bg-border" />

            {/* Footer con totales */}
            <SheetFooter className="flex-col gap-4 pt-4 sm:flex-col">
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-foreground">Total Compra</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={totalPrice}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="font-extrabold text-primary text-xl font-sans"
                  >
                    {formatPrice(totalPrice)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                El envío se calcula al finalizar. ¡Envío bonificado por compras mayores a $150.000 COP!
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/95 font-sans font-bold text-sm uppercase tracking-wider rounded-2xl h-14 shadow-lg shadow-primary/15"
                  size="lg"
                  onClick={() => {
                    window.location.href = baseHref('/checkout')
                  }}
                >
                  Finalizar Compra
                </Button>
              </motion.div>
              
              <div className="flex gap-2">
                <SheetClose asChild className="flex-1">
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button variant="outline" className="w-full rounded-2xl border-border hover:bg-muted/30 text-sm font-semibold">
                      Seguir Comprando
                    </Button>
                  </motion.div>
                </SheetClose>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-destructive font-semibold text-xs"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </Button>
                </motion.div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
