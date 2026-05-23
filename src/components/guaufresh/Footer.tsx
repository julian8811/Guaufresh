import { baseHref } from "@/lib/base-href"

const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#producto", label: "Producto" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#como-usar", label: "Cómo usar" },
  { href: "#contacto", label: "Contacto" },
]

const legalLinks = [
  { href: baseHref("/terminos"), label: "Términos y condiciones" },
  { href: baseHref("/privacidad"), label: "Privacidad" },
  { href: baseHref("/tratamiento-de-datos"), label: "Tratamiento de datos (Ley 1581)" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <a href={baseHref('/')} className="flex items-center">
              <img
                src={baseHref('/logo-guaufresh.png')}
                alt="Guau Fresh Logo"
                width={400}
                height={160}
                className="h-[5.5rem] w-auto max-w-[min(100%,400px)] object-contain sm:h-24 md:h-28 lg:h-32"
                decoding="async"
              />
            </a>
            <p className="max-w-xs text-center text-sm text-muted-foreground lg:text-left font-medium">
              Espuma limpiadora para perros con ingredientes naturales. Cuida a tu peludo con amor.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Navegación de pie de página">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-6"
          aria-label="Información legal"
        >
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 border-t border-border pt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground font-medium order-2 sm:order-1">
            © {currentYear} Guau Fresh. Todos los derechos reservados.
          </p>
          
          {/* Métodos de Pago */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-muted-foreground/35 order-1 sm:order-2" aria-label="Métodos de pago aceptados">
            {/* Visa */}
            <img 
              src={baseHref('/payments/visa.png')} 
              alt="Visa" 
              className="h-4 sm:h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            {/* Mastercard */}
            <img 
              src={baseHref('/payments/mastercard.png')} 
              alt="Mastercard" 
              className="h-5 sm:h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            {/* American Express */}
            <img 
              src={baseHref('/payments/american-express.png')} 
              alt="American Express" 
              className="h-4 sm:h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            {/* PSE */}
            <img 
              src={baseHref('/payments/pse.png')} 
              alt="PSE" 
              className="h-5 sm:h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            {/* Nequi */}
            <img 
              src={baseHref('/payments/nequi.png')} 
              alt="Nequi" 
              className="h-4 sm:h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            {/* Daviplata */}
            <img 
              src={baseHref('/payments/daviplata.png')} 
              alt="Daviplata" 
              className="h-4 sm:h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            {/* Efecty */}
            <img 
              src={baseHref('/payments/efecty.png')} 
              alt="Efecty" 
              className="h-4 sm:h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
