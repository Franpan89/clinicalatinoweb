'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlaceholderImage from './PlaceholderImage'
import { inferMediaType, isVideoEmbed } from '@/lib/utils/maps'

type Slide = { url: string; type: 'image' | 'video'; isEmbed: boolean }

const IMAGE_DURATION = 5000 // ms que dura una imagen en pantalla
const EMBED_DURATION = 15000 // ms para videos embed (no detectamos fin)

export default function AboutSlideshow({
  slides: rawSlides,
  fallbackImage = '/img/equipo-clinica.jpg',
}: {
  slides: (string | null | undefined)[]
  fallbackImage?: string
}) {
  // Construye lista limpia de slides
  const slides: Slide[] = rawSlides
    .filter((u): u is string => Boolean(u))
    .map((url) => ({
      url,
      type: inferMediaType(url),
      isEmbed: isVideoEmbed(url),
    }))

  // Si no hay nada configurado, usa el fallback como única imagen
  if (slides.length === 0) {
    slides.push({ url: fallbackImage, type: 'image', isEmbed: false })
  }

  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const current = slides[index]

  // Auto-advance: imágenes por timer; embeds por timer largo; video file por evento 'ended'
  useEffect(() => {
    if (slides.length <= 1) return
    if (timerRef.current) clearTimeout(timerRef.current)

    if (current.type === 'image') {
      timerRef.current = setTimeout(goNext, IMAGE_DURATION)
    } else if (current.isEmbed) {
      timerRef.current = setTimeout(goNext, EMBED_DURATION)
    }
    // video file → avanza con onEnded del <video>

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, current, goNext, slides.length])

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                ref={videoRef}
                src={current.url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={goNext}
              />
            )
          ) : (
            <PlaceholderImage
              src={current.url}
              alt="Clínica Latino"
              ratio="4/3"
              className="w-full h-full"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Indicadores (dots) — solo si hay más de 1 slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir a slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
