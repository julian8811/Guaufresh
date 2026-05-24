"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Dog, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

const STORAGE_KEY = "guaufresh_chat_history"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const MODEL_NAME = "llama-3.3-70b-versatile"

const SYSTEM_PROMPT = `Eres el "Asistente Guau Fresh 🐾", un asistente de inteligencia artificial súper amigable y entusiasta que responde preguntas sobre la tienda Guau Fresh en Colombia. Tu objetivo es ayudar a los clientes y resolver dudas con calidez y un tono que refleje amor por los animales.

Detalles importantes sobre Guau Fresh que DEBÉS saber y usar:
1. Producto Principal: Espuma Limpiadora en Seco para perros y gatos (¡segura para todas las edades!). No requiere agua ni enjuague.
2. Presentaciones y Precios:
   - 150mL: $45.000 COP (¡Actualmente en oferta por primera compra a $40.500 COP, un 10% de descuento!).
   - 50mL: $38.000 COP (Ideal para viajes, patitas y hocicos).
3. Ingredientes Estrella (100% naturales):
   - Proteína de Trigo Hidrolizada: Nutre y repara el pelaje, previniendo resequedad en la piel.
   - Extracto de Manzanilla: Calma la piel sensible, desinflama y da brillo.
   - Agentes de limpieza suaves derivados del Coco: Limpian eficazmente sin eliminar los aceites naturales.
4. Modo de Uso (Fácil en 4 pasos):
   - Paso 1: Agitar bien el envase.
   - Paso 2: Aplicar la espuma (colocar la válvula vertical).
   - Paso 3: Masajear circularmente a contrapelo.
   - Paso 4: Limpiar con toalla seca o húmeda para retirar el exceso. ¡Listo, no necesita agua!
5. Políticas de Envío y Pagos:
   - Envío gratuito en compras superiores a $150.000 COP a nivel nacional en Colombia.
   - El costo del envío estándar se calcula automáticamente al finalizar la compra en el checkout.
   - Métodos de pago aceptados: Tarjetas de crédito (Visa, Mastercard, American Express), PSE, Nequi, Daviplata y Efecty.
6. Enlaces y Contacto (IMPORTANTE: Cuando te pregunten dónde comprar o por los productos, debés poner estos enlaces exactos usando Markdown):
   - Enlace para comprar los Productos (50mL y 150mL): [Ver Productos Guau Fresh](https://guaufresh.vercel.app/#producto) (o simplemente usá la ruta de anclaje [#producto](#producto)).
   - Enlace para calcular dosis recomendada: [Calculadora para Mascotas](https://guaufresh.vercel.app/#calculadora) (o [#calculadora](#calculadora)).
   - Los botones de WhatsApp en la página permiten hablar directamente con servicio al cliente.
   - El carrito se puede abrir desde la esquina superior derecha o tocando "Finalizar Compra".
7. Mejoras Recientes de la Página Web:
   - Diseño móvil 100% optimizado y fluido.
   - Carrusel automático de testimonios ("Lo que dicen nuestros clientes") y beneficios para mascotas para ahorrar espacio y mejorar la lectura en dispositivos móviles.
   - Galería interactiva con 10 fotos nuevas de alta calidad que muestran los beneficios de Guau Fresh.
   - Fotos de producto (50 mL y 150 mL) y del carrito de compras actualizadas con formato WebP ultrarrápido, recortadas para aprovechar al máximo el contenedor visual de las tarjetas.

Reglas de comportamiento:
- Hablá de forma alegre y cercana, usando modismos colombianos o un tono neutro y muy cariñoso con los peludos.
- Usá emojis relacionados con mascotas y limpieza (🐾, 🐶, 🐱, 🧼, 🫧, 🐕, ✨).
- Sé breve y conciso en tus respuestas. Evitá textos larguísimos; es mejor responder en 2 o 3 párrafos cortos como máximo.
- Si el usuario te pregunta por temas completamente ajenos a mascotas o a Guau Fresh, redirigí la conversación amablemente diciendo que estás programado para hablar de limpieza canina/felina y bienestar animal.`

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! 🐾 Soy tu Asistente Guau Fresh. ¿En qué puedo ayudarte hoy? Preguntame sobre nuestros ingredientes, cómo usar la espuma o sobre tu pedido. 🐶✨",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Cargar historial de chat si existe
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch (e) {
        console.error("Error al cargar historial del chat", e)
      }
    }
  }, [])

  // Guardar historial al actualizar mensajes
  const saveMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newMsgs))
  };

  // Scroll al fondo automático al agregar mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setInput("")
    saveMessages(updatedMessages)
    setIsLoading(true)

    // Clave de API de Groq desde variables de entorno
    const apiKey = import.meta.env.PUBLIC_GROQ_API_KEY

    if (!apiKey) {
      setTimeout(() => {
        saveMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: "Lo siento, la clave de la API de chat no está configurada correctamente en el servidor. Por favor, intenta de nuevo más tarde o comunícate por WhatsApp. 🐾",
          },
        ])
        setIsLoading(false)
      }, 1000)
      return
    }

    try {
      // Filtrar el prompt de sistema y últimos mensajes para mantener contexto compacto
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...updatedMessages.slice(-10), // Enviar solo los últimos 10 mensajes para ahorrar tokens
      ]

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 400,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const assistantReply = data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu respuesta en este momento. 🐾"
      
      saveMessages([...updatedMessages, { role: "assistant", content: assistantReply }])
    } catch (error) {
      console.error("Error llamando a la API de Groq:", error)
      saveMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "¡Uy! Tuve un problemita de conexión. ¿Me lo podés volver a preguntar o lo intentamos de nuevo? 🐾",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      
      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[360px] h-[480px] bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col will-change-gpu"
          >
            {/* Header del Chat */}
            <div className="bg-primary p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Dog className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-sans leading-none flex items-center gap-1.5">
                    Asistente Guau Fresh
                    <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  </h3>
                  <span className="text-[10px] opacity-80 font-medium">Línea de atención 100% natural</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5 font-medium text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-muted/30 border border-border text-foreground rounded-tl-none flex gap-2.5 items-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <Dog className="h-4 w-4 shrink-0 text-primary mt-1" />
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {/* Animación de carga de escritura */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/30 border border-border rounded-2xl rounded-tl-none p-3 flex items-center gap-2 max-w-[80%]">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Guau Fresh está escribiendo...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Envío */}
            <form onSubmit={handleSend} className="p-3 border-t border-border bg-card flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Preguntame lo que quieras..."
                className="flex-1 rounded-xl border border-border bg-muted/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary text-white p-2 rounded-xl hover:bg-primary/95 transition-colors disabled:opacity-50 disabled:hover:bg-primary flex items-center justify-center h-10 w-10 shrink-0"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/95 border border-primary/20 relative cursor-pointer group will-change-gpu"
        aria-label="Abrir asistente de chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <MessageSquare className="h-6 w-6 group-hover:hidden" />
              <Dog className="h-6 w-6 hidden group-hover:block animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  )
}
