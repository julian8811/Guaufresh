import { siteUrl } from "@/lib/site-url"

export function StructuredData() {
  const base = siteUrl()

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Guau Fresh - Espuma Limpiadora para Perros",
    image: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post10_origen_vegetal-YK0v2xfT3HkGhVm0GXWdJEVUAY9tTg.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post11_rutina_3pasos-M26keFJIaHf6X7ADXlETOy4ArudJSF.png"
    ],
    description: "Espuma limpiadora en seco para perros con ingredientes 100% naturales. Limpia, humecta y elimina el mal olor después del paseo sin necesidad de agua. Contiene proteína de trigo hidrolizada y extracto de manzanilla.",
    sku: "GUAUFRESH-150ML",
    brand: {
      "@type": "Brand",
      name: "Guau Fresh"
    },
    offers: [
      {
        "@type": "Offer",
        name: "Guau Fresh 150mL - Individual",
        url: base,
        priceCurrency: "COP",
        price: "45000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Guau Fresh Colombia"
        }
      },
      {
        "@type": "Offer",
        name: "Guau Fresh 150mL - Pack Dúo (10% Descuento)",
        url: base,
        priceCurrency: "COP",
        price: "81000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Guau Fresh Colombia"
        }
      },
      {
        "@type": "Offer",
        name: "Guau Fresh 150mL - Kit Paseo Premium (con Toalla)",
        url: base,
        priceCurrency: "COP",
        price: "55000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Guau Fresh Colombia"
        }
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "María García"
        },
        reviewBody: "Mi perro queda súper limpio y con un aroma delicioso. Lo mejor es que no necesito agua."
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Carlos Rodríguez"
        },
        reviewBody: "Excelente producto, el pelaje de mi mascota brilla como nunca. 100% recomendado."
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Guau Fresh",
    url: base,
    logo: `${base}/logo-guaufresh.png`,
    sameAs: [
      "https://www.facebook.com/guaufresh",
      "https://www.instagram.com/guaufresh",
      "https://www.tiktok.com/@guaufresh"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-XXX-XXX-XXXX",
      contactType: "customer service",
      areaServed: "CO",
      availableLanguage: "Spanish"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Guau Fresh Colombia",
    image: `${base}/logo-guaufresh.png`,
    "@id": base,
    url: base,
    telephone: "+57-XXX-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressRegion: "Cundinamarca",
      addressCountry: "CO"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.7110,
      longitude: -74.0721
    },
    priceRange: "$$"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo reemplaza el baño tradicional?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Guau Fresh limpia la suciedad acumulada y elimina malos olores en segundos y sin necesidad de agua. Es el aliado perfecto para la rutina de higiene diaria o para espaciar los baños tradicionales, evitando el estrés que estos causan en muchos perros."
        }
      },
      {
        "@type": "Question",
        name: "¿Es seguro usarlo todos los días en las patas después del paseo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, es 100% seguro. De hecho, está diseñado precisamente para limpiar y desinfectar las huellas, el pelaje y el rostro de tu perro después de salir a la calle. Su fórmula con extracto de manzanilla y proteína de trigo acondiciona las almohadillas de las patas."
        }
      },
      {
        "@type": "Question",
        name: "¿Qué hago si mi perro tiene piel sensible o alergias?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nuestra espuma limpiadora es hipoalergénica y está formulada libre de parabenos, sulfatos, alcohol o siliconas que puedan irritar la dermis. Contiene manzanilla y proteína de trigo para calmar y proteger la piel sensible."
        }
      },
      {
        "@type": "Question",
        name: "¿Se puede usar en cachorros?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "¡Claro que sí! Puedes utilizar la espuma limpiadora en cachorros a partir de las 8 semanas de vida. Su suavidad cuida el pelaje y la piel delicada de los más pequeños."
        }
      },
      {
        "@type": "Question",
        name: "¿Qué ingredientes naturales contiene?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Guau Fresh está hecho con ingredientes de origen vegetal: Proteína de Trigo Hidrolizada (que nutre y da brillo), Extracto de Manzanilla (que calma la piel) y agentes de limpieza biodegradables derivados del coco."
        }
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: base
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Espuma Limpiadora",
        item: `${base}/#producto`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
