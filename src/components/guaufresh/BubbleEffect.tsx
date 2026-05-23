"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type Bubble = {
  id: number
  x: number // porcentaje horizontal inicial
  y: number // porcentaje vertical inicial
  size: number // diámetro en px
  delay: number // retraso de animación en segundos
  duration: number // duración de la flotación en segundos
}

export function BubbleEffect() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [isMobile, setIsMobile] = useState(true)

  // Tracking del mouse para paralaje sutil (solo en desktop)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    // Detectar móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Crear burbujas con valores aleatorios estables
    const count = window.innerWidth < 768 ? 10 : 25
    const newBubbles: Bubble[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 10, // empezar levemente desfasadas
      size: Math.random() * 25 + 8, // entre 8px y 33px
      delay: Math.random() * 5,
      duration: Math.random() * 12 + 10, // entre 10s y 22s para una flotación lenta
    }))
    setBubbles(newBubbles)

    // Capturar mouse
    const handleMouseMove = (e: MouseMoveEvent) => {
      if (window.innerWidth >= 768) {
        // Mapear posición a porcentaje de traslación (-15 a 15 píxeles)
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 30
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 30
        mouseX.set(xPercent)
        mouseY.set(yPercent)
      }
    }

    window.addEventListener("mousemove", handleMouseMove as any)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove as any)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-primary/15 bg-gradient-to-tr from-primary/5 via-transparent to-white/10 backdrop-blur-[0.5px] will-change-transform shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
          style={{
            left: `${bubble.x}%`,
            width: bubble.size,
            height: bubble.size,
            // Aplicar paralaje del mouse en desktop
            x: isMobile ? 0 : springX,
            y: isMobile ? 0 : springY,
          }}
          initial={{ y: "105vh", opacity: 0 }}
          animate={{
            y: "-15vh",
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
