"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { baseHref } from "@/lib/base-href"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#producto", label: "Producto" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#como-usar", label: "Cómo usar" },
  { href: "#contacto", label: "Contacto" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getTotalItems, setIsOpen } = useCartStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 px-4 py-2 sm:px-6">
      <motion.div
        animate={{
          y: 0,
          borderRadius: isScrolled ? "9999px" : "0px",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 1)",
          boxShadow: isScrolled 
            ? "0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.03)" 
            : "0 1px 0 0 rgba(0,0,0,0.02)",
          borderColor: isScrolled ? "rgba(0, 167, 159, 0.15)" : "rgba(0, 0, 0, 0.05)",
          paddingLeft: isScrolled ? "1.5rem" : "0.75rem",
          paddingRight: isScrolled ? "1.5rem" : "0.75rem",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`mx-auto flex items-center justify-between gap-4 border border-solid backdrop-blur-md max-w-7xl py-1 sm:py-2 md:py-2.5 ${
          isScrolled ? "dark:bg-card/85 dark:border-primary/20" : "dark:bg-card dark:border-transparent"
        }`}
      >
        {/* Logo */}
        <a href={baseHref("/")} className="group relative z-10 flex min-w-0 shrink-0 items-center">
          <img
            src={baseHref("/logo-guaufresh.png")}
            alt="Guau Fresh Logo"
            width={800}
            height={400}
            className="h-[5.5rem] w-auto max-w-[min(100%,400px)] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-24 md:h-28 lg:h-32"
            decoding="async"
          />
        </a>

        {/* Enlaces de navegación desktop */}
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-1 sm:gap-x-1.5 md:gap-x-2 lg:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary rounded-lg text-[0.7rem] sm:text-xs md:text-[0.8125rem] lg:text-xs xl:text-sm"
            >
              {link.label}
              {/* Micro-animación en hover (línea inferior) */}
              <motion.span
                className="absolute bottom-1 left-3 right-3 h-[2px] bg-primary origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100"
                style={{ transformOrigin: "left" }}
              />
            </a>
          ))}
        </nav>

        {/* Acciones */}
        <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2.5 md:gap-3 lg:border-l lg:border-border lg:pl-6">
          <a
            href={baseHref("/login")}
            className="hidden sm:flex text-muted-foreground hover:text-primary items-center justify-center rounded-lg p-2 transition-colors hover:bg-primary/5"
            aria-label="Iniciar sesión"
          >
            <User className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          </a>

          <a
            href={baseHref("/admin")}
            className="hidden sm:flex text-muted-foreground hover:text-primary items-center justify-center rounded-lg p-2 transition-colors hover:bg-primary/5"
            aria-label="Administrador"
          >
            <Package className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`Carrito de compras${totalItems > 0 ? `, ${totalItems} productos` : ""}`}
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} aria-hidden />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-secondary px-0.5 font-sans text-[0.6rem] font-bold leading-none text-white sm:h-5 sm:min-w-[1.25rem] sm:text-[0.7rem]"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <div className="hidden md:block">
            <Button
              size="sm"
              className="h-9 px-4 text-xs font-semibold shadow-sm transition-all hover:shadow-md hover:translate-y-[-1px] active:translate-y-[0px] lg:h-10 lg:px-5 lg:text-sm"
              onClick={() => setIsOpen(true)}
            >
              Comprar ahora
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-primary transition-colors lg:hidden hover:bg-primary/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </motion.div>

      {/* Menú móvil desplegable con animación */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 mt-2 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-xl dark:bg-card lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-border" />
              <div className="flex gap-2 justify-around py-2">
                <a
                  href={baseHref("/login")}
                  className="flex items-center gap-2 text-muted-foreground px-3 py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">Mi Cuenta</span>
                </a>
                <a
                  href={baseHref("/admin")}
                  className="flex items-center gap-2 text-muted-foreground px-3 py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-5 w-5" />
                  <span className="text-sm font-medium">Admin</span>
                </a>
              </div>
              <Button
                className="mt-2 w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/95"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsOpen(true)
                }}
              >
                Comprar ahora
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
