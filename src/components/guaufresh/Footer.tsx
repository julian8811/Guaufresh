import { baseHref } from "@/lib/base-href"
import { PawIcon } from "@/components/guaufresh/PawIcon"

const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#producto", label: "Producto" },
  { href: "#como-usar", label: "Cómo usar" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#reseñas", label: "Reseñas" },
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
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 blob bg-secondary/40" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 blob-alt bg-lime/25" aria-hidden />
      <div className="pointer-events-none absolute right-1/3 top-8 h-16 w-16 rounded-full border-2 border-white/20" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <a href={baseHref("/")} className="flex items-center">
              <img
                src={baseHref("/logo-guaufresh-white.png?v=2")}
                alt="Guau Fresh"
                width={160}
                height={160}
                className="h-20 w-auto max-w-[180px] object-contain sm:h-24"
                decoding="async"
              />
            </a>
            <p className="max-w-xs text-center text-sm text-primary-foreground/85 lg:text-left font-semibold">
              Espuma limpiadora para mascotas. Frescura, limpieza y bienestar en segundos.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Navegación de pie de página">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-bold"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="paw-divider my-8 text-accent">
          <PawIcon className="paw-divider-icon" />
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Información legal"
        >
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-primary-foreground/70 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm font-semibold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 border-t border-white/20 pt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-center text-sm text-primary-foreground/75 font-semibold order-2 sm:order-1">
            © {currentYear} Guau Fresh. Todos los derechos reservados.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-5 order-1 sm:order-2"
            aria-label="Métodos de pago aceptados"
          >
            {[
              ["visa.png", "Visa", "h-4 sm:h-5"],
              ["mastercard.png", "Mastercard", "h-5 sm:h-6"],
              ["american-express.png", "American Express", "h-4 sm:h-5"],
              ["pse.png", "PSE", "h-5 sm:h-6"],
              ["nequi.png", "Nequi", "h-4 sm:h-5"],
              ["daviplata.png", "Daviplata", "h-4 sm:h-5"],
              ["efecty.png", "Efecty", "h-4 sm:h-5"],
            ].map(([file, alt, cls]) => (
              <img
                key={file}
                src={baseHref(`/payments/${file}`)}
                alt={alt}
                className={`${cls} w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
