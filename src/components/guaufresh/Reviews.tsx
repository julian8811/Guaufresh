"use client"

import { useState, useEffect, useMemo, useCallback, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"
import { supabase, type Review as DbReview } from "@/lib/supabase"

const PET_IMAGES = {
  luna: baseHref("/reviews/luna-golden-retriever.png"),
  max: baseHref("/reviews/max-bulldog-frances.png"),
  coco: baseHref("/reviews/coco-poodle.png"),
  toby: baseHref("/reviews/toby-labrador.png"),
  bella: baseHref("/reviews/bella-shih-tzu.png"),
  rocky: baseHref("/reviews/rocky-pastor-aleman.png"),
} as const

const PET_IMAGE_LIST = Object.values(PET_IMAGES)

function pickPetImage(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % 10007
  return PET_IMAGE_LIST[h % PET_IMAGE_LIST.length]
}

interface Review {
  id: string
  name: string
  location: string
  petImage: string
  rating: number
  date: string
  petName: string
  petBreed: string
  comment: string
  verified: boolean
}

const seedReviews: Review[] = [
  {
    id: "seed-1",
    name: "María Fernández",
    location: "Bogotá",
    petImage: PET_IMAGES.luna,
    rating: 5,
    date: "Hace 2 semanas",
    petName: "Luna",
    petBreed: "Golden Retriever",
    comment:
      "Increíble producto. Luna queda con el pelaje súper suave y brillante. Lo mejor es que no necesita agua, perfecto para los días fríos cuando no quiero bañarla completamente.",
    verified: true,
  },
  {
    id: "seed-2",
    name: "Carlos Rodríguez",
    location: "Medellín",
    petImage: PET_IMAGES.max,
    rating: 5,
    date: "Hace 1 mes",
    petName: "Max",
    petBreed: "Bulldog francés",
    comment:
      "Mi Max tiene la piel sensible y este producto no le causa ninguna irritación. El aroma es muy agradable y dura bastante. Muy recomendado para perros con piel delicada.",
    verified: true,
  },
  {
    id: "seed-3",
    name: "Ana Martínez",
    location: "Cali",
    petImage: PET_IMAGES.coco,
    rating: 4,
    date: "Hace 3 semanas",
    petName: "Coco",
    petBreed: "Caniche toy",
    comment:
      "Excelente para mantener a Coco limpio entre baños. La espuma es muy fácil de aplicar y el pelaje queda muy manejable. Lo uso cada semana y me encanta el resultado.",
    verified: true,
  },
  {
    id: "seed-4",
    name: "Pedro González",
    location: "Barranquilla",
    petImage: PET_IMAGES.toby,
    rating: 5,
    date: "Hace 1 semana",
    petName: "Toby",
    petBreed: "Labrador retriever",
    comment:
      "Toby odia los baños tradicionales pero con esta espuma es súper fácil limpiarlo. Solo aplico, masajeo y listo. El pelaje queda increíblemente limpio y con un olor delicioso.",
    verified: true,
  },
  {
    id: "seed-5",
    name: "Laura Sánchez",
    location: "Cartagena",
    petImage: PET_IMAGES.bella,
    rating: 5,
    date: "Hace 2 meses",
    petName: "Bella",
    petBreed: "Shih Tzu",
    comment:
      "Lo mejor que he comprado para Bella. Su pelaje largo se enreda mucho pero con este producto queda súper suave y fácil de peinar. ¡Ya llevo 3 envases!",
    verified: true,
  },
  {
    id: "seed-6",
    name: "Diego Herrera",
    location: "Bucaramanga",
    petImage: PET_IMAGES.rocky,
    rating: 4,
    date: "Hace 1 mes",
    petName: "Rocky",
    petBreed: "Pastor alemán",
    comment:
      "Rocky es un perro muy activo y se ensucia mucho. Este producto me ayuda a mantenerlo limpio entre baños. El único detalle es que me gustaría que el envase fuera más grande.",
    verified: true,
  },
]

function mapDbRow(row: DbReview): Review {
  const created = row.created_at ? new Date(row.created_at) : new Date()
  const dateLabel = formatDistanceToNow(created, { addSuffix: true, locale: es })
  const img = row.pet_image?.trim() || pickPetImage(row.id)
  return {
    id: row.id,
    name: (row.author_name && row.author_name.trim()) || "Cliente",
    location: (row.location && row.location.trim()) || "Colombia",
    petImage: img.startsWith("http") || img.startsWith("/") ? img : baseHref(img),
    rating: row.rating,
    date: dateLabel,
    petName: (row.pet_name && row.pet_name.trim()) || "—",
    petBreed: (row.pet_breed && row.pet_breed.trim()) || "—",
    comment: (row.comment && row.comment.trim()) || "",
    verified: row.verified === true,
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4 transition-transform duration-300 hover:scale-110",
            star <= rating ? "fill-secondary text-secondary" : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function RatingInput({
  value,
  onChange,
  id,
}: {
  value: number
  onChange: (n: number) => void
  id?: string
}) {
  return (
    <div className="flex gap-1" role="group" aria-labelledby={id}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="rounded p-0.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          onClick={() => onChange(star)}
          aria-label={`${star} de 5 estrellas`}
          aria-pressed={value === star}
        >
          <Star
            className={cn(
              "h-8 w-8 sm:h-7 sm:w-7",
              star <= value ? "fill-secondary text-secondary" : "fill-muted text-muted"
            )}
          />
        </motion.button>
      ))}
    </div>
  )
}

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dbReviews, setDbReviews] = useState<Review[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [authorName, setAuthorName] = useState("")
  const [location, setLocation] = useState("")
  const [petName, setPetName] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const reviews = useMemo(() => [...seedReviews, ...dbReviews], [dbReviews])

  const loadReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.warn("Reseñas: no se pudieron cargar desde el servidor", error)
      return
    }
    if (data?.length) {
      setDbReviews(data.map(mapDbRow))
    }
  }, [])

  useEffect(() => {
    void loadReviews()
  }, [loadReviews])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const reviewsPerPage = isMobile ? 1 : 3
  const totalPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage))

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, totalPages - 1))
  }, [totalPages])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 7000)
    return () => clearInterval(interval)
  }, [totalPages])

  const currentReviews = reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  )

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / Math.max(reviews.length, 1)
  ).toFixed(1)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const resetForm = () => {
    setAuthorName("")
    setLocation("")
    setPetName("")
    setPetBreed("")
    setRating(5)
    setComment("")
    setFormError(null)
  }

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const name = authorName.trim()
    const loc = location.trim() || "Colombia"
    const pName = petName.trim()
    const pBreed = petBreed.trim()
    const text = comment.trim()

    if (name.length < 2) {
      setFormError("Escribe tu nombre (al menos 2 caracteres).")
      return
    }
    if (text.length < 10) {
      setFormError("El comentario debe tener al menos 10 caracteres.")
      return
    }
    if (!pName || !pBreed) {
      setFormError("Indica el nombre y la raza de tu mascota.")
      return
    }

    setSubmitting(true)
    try {
      const pet_image = pickPetImage(`${name}-${Date.now()}`)

      const { data: sessionData } = await supabase.auth.getSession()

      const payload: Record<string, unknown> = {
        author_name: name,
        location: loc,
        pet_name: pName,
        pet_breed: pBreed,
        rating,
        comment: text,
        pet_image,
        verified: false,
      }

      if (sessionData.session?.user?.id) {
        payload.user_id = sessionData.session.user.id
      }

      const { data, error } = await supabase.from("reviews").insert(payload).select("*").single()

      if (error) {
        if (error.code === "42501" || error.message?.toLowerCase().includes("policy")) {
          setFormError(
            "No se pudo publicar: falta permiso en la base de datos. Ejecuta la migración SQL en Supabase (archivo supabase/migrations/20260404_reviews_public_insert.sql)."
          )
        } else if (error.message?.includes("author_name") || error.message?.includes("column")) {
          setFormError(
            "Falta la columna author_name en Supabase. Ejecuta el script de migración del proyecto."
          )
        } else {
          setFormError(error.message || "No se pudo enviar la reseña. Intenta de nuevo.")
        }
        return
      }

      if (data) {
        setDbReviews((prev) => [mapDbRow(data as DbReview), ...prev])
      }
      setDialogOpen(false)
      resetForm()
      setCurrentIndex(0)
    } finally {
      setSubmitting(false)
    }
  }

  // Animación del contenedor grid en cambio de página
  const gridVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.08 } 
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  }

  return (
    <section id="reseñas" className="bg-muted/30 py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Título */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-secondary text-4xl sm:text-5xl font-normal tracking-tight text-foreground"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground font-medium"
          >
            Miles de mascotas felices y limpias gracias a Guau Fresh.
          </motion.p>

          {/* Promedio animado */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 bg-card border border-border p-5 rounded-3xl shadow-sm inline-flex mx-auto"
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl font-extrabold font-sans text-primary">{averageRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= Math.round(Number(averageRating))
                          ? "fill-secondary text-secondary"
                          : "fill-muted text-muted"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-muted-foreground mt-1">
                  Basado en {reviews.length} testimonios reales
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carrusel de reseñas con AnimatePresence */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-12 grid auto-rows-max grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {currentReviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)" }}
                  className="h-full"
                >
                  <Card className="relative flex h-full flex-col overflow-hidden bg-card border border-border shadow-sm rounded-3xl transition-all">
                    {/* Imagen de la mascota */}
                    <div className="relative h-56 w-full overflow-hidden bg-muted group">
                      <img
                        src={review.petImage}
                        alt={`${review.petName} - ${review.petBreed}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    <CardContent className="flex flex-1 flex-col p-6 relative">
                      <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" aria-hidden="true" />

                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-foreground">{review.name}</h3>
                            {review.verified && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary border border-primary/20">
                                Verificado
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-muted-foreground mt-0.5">{review.location}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <StarRating rating={review.rating} />
                        <span className="text-xs font-medium text-muted-foreground">{review.date}</span>
                      </div>

                      {/* Info de la Mascota */}
                      <div className="mt-4 rounded-2xl border border-secondary/15 bg-secondary/5 px-4 py-2.5">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Mascota: <span className="font-bold text-foreground">{review.petName}</span>
                          {" · "}
                          Raza: <span className="text-primary font-bold">{review.petBreed}</span>
                        </p>
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80 font-medium italic">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                aria-label="Reseñas anteriores"
                className="rounded-full h-10 w-10 border-border bg-card shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>

            <div className="flex gap-2" role="tablist" aria-label="Páginas de reseñas">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === index}
                  aria-label={`Página ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToNext} 
                aria-label="Reseñas siguientes"
                className="rounded-full h-10 w-10 border-border bg-card shadow-sm"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        )}

        {/* Botón de acción escribir reseña */}
        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            ¿Ya probaste Guau Fresh? Comparte tu experiencia con nosotros
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block mt-4">
            <Button
              type="button"
              className="bg-primary text-white hover:bg-primary/95 font-sans font-bold text-sm tracking-wide rounded-full px-8 py-5 h-12 shadow-md shadow-primary/10 border border-primary/20"
              onClick={() => {
                resetForm()
                setDialogOpen(true)
              }}
            >
              Escribir una Reseña
            </Button>
          </motion.div>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="max-h-[min(90vh,640px)] overflow-y-auto sm:max-w-lg rounded-3xl border-border bg-card p-6 shadow-2xl">
          <form onSubmit={handleSubmitReview}>
            <DialogHeader>
              <DialogTitle className="font-secondary text-2xl text-foreground font-normal">Escribe tu reseña</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Tu opinión se publicará en esta sección para ayudar a otras familias con mascotas.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="review-author" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tu nombre</Label>
                <Input
                  id="review-author"
                  autoComplete="name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ej. Andrea Gómez"
                  maxLength={80}
                  className="rounded-xl border-border bg-muted/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-location" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Ciudad</Label>
                <Input
                  id="review-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Bogotá"
                  maxLength={80}
                  className="rounded-xl border-border bg-muted/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="review-pet" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Nombre de tu mascota</Label>
                  <Input
                    id="review-pet"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Ej. Firulais"
                    maxLength={60}
                    className="rounded-xl border-border bg-muted/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-breed" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Raza</Label>
                  <Input
                    id="review-breed"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    placeholder="Ej. Mestizo"
                    maxLength={80}
                    className="rounded-xl border-border bg-muted/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label id="review-rating-label" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Calificación</Label>
                <RatingInput value={rating} onChange={setRating} id="review-rating-label" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-comment" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Comentario</Label>
                <Textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo te fue con el producto (mínimo 10 caracteres)."
                  rows={4}
                  maxLength={1200}
                  className="min-h-[100px] resize-y rounded-xl border-border bg-muted/20"
                  required
                />
              </div>
              {formError && (
                <p className="text-sm font-semibold text-destructive mt-1" role="alert">
                  {formError}
                </p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0 mt-4 border-t border-border pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                disabled={submitting}
                className="rounded-xl font-bold text-sm"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
                className="bg-primary hover:bg-primary/95 text-white font-bold rounded-xl px-5"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                    Publicando…
                  </>
                ) : (
                  "Publicar reseña"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
