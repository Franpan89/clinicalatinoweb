'use client'

import { Phone, MapPin, Clock, AlertTriangle, Siren } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

export default function EmergencyCTA() {
  return (
    <section className="relative py-20 bg-red-900 overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <PlaceholderImage
          label="Ambulancia / Emergencia"
          filename="emergencia-bg.jpg"
          recommendedSize="2400×800px"
          icon={Siren}
          variant="dark"
          ratio="auto"
          className="w-full h-full"
        />
      </div>

      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-900/95 to-red-900/80 pointer-events-none" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="emg-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#emg-dots)" />
        </svg>
      </div>

      {/* Decorative rings */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/10 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse [animation-delay:0.4s]" />
              </div>
              <span className="text-red-300 font-lato text-xs font-bold uppercase tracking-[0.3em]">
                Atención Inmediata Disponible
              </span>
            </div>
            <h2
              className="font-lato text-white font-normal leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              ¿Necesitas Atención <br />
              <span className="font-bold">de Emergencia?</span>
            </h2>
            <p className="font-lato text-red-200/80 leading-relaxed text-[15px] font-normal">
              Nuestro equipo de emergencias está disponible las 24 horas del día, los 7
              días de la semana. No esperes — cada minuto cuenta en una emergencia médica.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <a
              href="tel:+59372846666"
              className="group flex items-center gap-5 bg-white hover:bg-red-50 text-red-900 px-8 py-5 font-lato font-bold text-xl transition-all duration-200 hover:shadow-2xl min-w-[300px]"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="group-hover:animate-bounce" />
              </div>
              <div>
                <div className="text-red-400 text-xs font-normal uppercase tracking-widest mb-0.5">
                  Llamar ahora
                </div>
                <div>+593 72 846-666</div>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 text-red-300/80">
                <Clock size={15} />
                <span className="font-lato text-sm">Lun–Dom · 24h</span>
              </div>
              <div className="flex items-center gap-2.5 text-red-300/80">
                <MapPin size={15} />
                <span className="font-lato text-sm">Cuenca, Ecuador</span>
              </div>
              <div className="flex items-center gap-2.5 text-red-300/80 col-span-2">
                <AlertTriangle size={15} />
                <span className="font-lato text-sm">
                  Servicio de emergencias activo los 365 días del año
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
