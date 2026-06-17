'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { inferMediaType, isVideoEmbed } from '@/lib/utils/maps'

type Slide = { url: string; type: 'image' | 'video'; isEmbed: boolean }

const IMAGE_DURATION = 6000
const EMBED_DURATION = 18000

export default function TopSlideshow({
  slides: rawSlides,
}: {
  slides: (string | null | undefined)[]
}) {
  const slides: Slide[] = rawSlides
    .filter((u): u is string => Boolean(u))
    .map((url) => ({
      url,
      type: inferMediaType(url),
      isEmbed: isVideoEmbed(url),
    }))

  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (i: number) => setIndex((i + slides.length) % slides.length),
    [slides.length]
  )
  const goNext = useCallback(() => setIndex((p) => (p + 1) % slides.length), [slides.length])
  const goPrev = useCallback(() => setIndex((p) => (p - 1 + slides.length) % slides.length), [slides.length])

  const current = slides[index]

  useEffect(() => {
    if (slides.length <= 1 || !current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    if (current.type === 'image') {
      timerRef.current = setTimeout(goNext, IMAGE_DURATION)
    } else if (current.isEmbed) {
      timerRef.current = setTimeout(goNext, EMBED_DURATION)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, current, goNext, slides.length])

  // Si no hay slides configurados, no renderiza nada
  if (slides.length === 0) return null

  return (
    <>
      {/* Spacer para la barra de navegación fija */}
      <div className="h-[76px] bg-white" />
      <section className="relative w-full bg-brand-dark overflow-hidden h-[42vw] max-h-[500px] min-h-[260px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {current.type === 'video' ? (
            current.isEmbed ? (
              <iframe
                src={current.url}
                title="Clínica Latino"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={current.url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={goNext}
              />
            )
          ) : (
            <img src={current.url} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controles — solo con 2+ slides */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
      </section>
    </>
  )
}
