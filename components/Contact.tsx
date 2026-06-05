'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, AlertCircle, Phone, MapPin, Clock, Mail, Map } from 'lucide-react'
import { submitAppointment } from '@/app/actions'
import PlaceholderImage from './PlaceholderImage'

const specialties = [
  'Cirugía General',
  'Cirugía Bariátrica',
  'Cardio Latino',
  'Cirugía Estética',
  'Neonatología',
  'Ginecología',
  'Cuidados Intensivos',
  'Centro de Imágenes',
  'Laboratorio',
  'Biología Molecular',
  'Emergencia',
  'Hospitalización',
  'Otro',
]

type FormState = 'idle' | 'success' | 'error'

type ContactProps = {
  mapEmbedUrl?: string | null
  mapAddress?: string | null
}

export default function Contact({ mapEmbedUrl, mapAddress }: ContactProps = {}) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await submitAppointment(formData)
      if (result.success) {
        setFormState('success')
      } else {
        setErrorMsg(result.error || 'Error inesperado.')
        setFormState('error')
      }
    })
  }

  const contactItems = [
    {
      icon: Phone,
      label: 'Teléfono Principal',
      value: '+593-7-2827-074',
      sub: 'Emergencias disponibles 24/7',
      href: 'tel:+59372827074',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: mapAddress || 'Cuenca, Ecuador',
      sub: 'Consulta la dirección al agendar',
    },
    {
      icon: Clock,
      label: 'Horario de Atención',
      value: 'Lunes a Domingo',
      sub: '24 horas del día, sin excepción',
    },
    {
      icon: Mail,
      label: 'Correo Electrónico',
      value: 'info@clinicalatino.med.ec',
      sub: 'Respondemos en menos de 24h',
      href: 'mailto:info@clinicalatino.med.ec',
    },
  ]

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              Contacto
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>
          <h2 className="font-lato text-brand-dark text-4xl lg:text-5xl font-normal leading-[1.1] mb-4">
            Agenda tu Cita{' '}
            <span className="font-bold text-brand-gradient">Hoy Mismo</span>
          </h2>
          <p className="font-lato text-brand-gray text-[15px] leading-relaxed max-w-2xl mx-auto font-normal">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo a la
            brevedad para confirmar tu cita con el especialista de tu elección.
          </p>
        </motion.div>

        {/* 4 contact items — single horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {contactItems.map((item, i) => {
            const Wrapper: 'a' | 'div' = item.href ? 'a' : 'div'
            return (
              <Wrapper
                key={i}
                {...(item.href ? { href: item.href } : {})}
                className={`flex items-start gap-4 p-5 bg-white border border-brand-surface transition-all duration-300 ${
                  item.href ? 'hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5 cursor-pointer group' : ''
                }`}
              >
                <div className="w-10 h-10 bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                  <item.icon className="text-brand-teal" size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-lato text-[10px] text-brand-gray uppercase tracking-[0.15em] font-bold mb-1">
                    {item.label}
                  </div>
                  <div className="font-lato text-brand-dark font-bold text-sm leading-tight mb-1 truncate">
                    {item.value}
                  </div>
                  <div className="font-lato text-brand-gray text-xs leading-snug">
                    {item.sub}
                  </div>
                </div>
              </Wrapper>
            )
          })}
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full min-h-[480px]"
          >
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 480 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Clínica Latino"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <PlaceholderImage
                label="Mapa / Ubicación"
                filename="Configura en /admin/configuracion"
                recommendedSize="Google Maps embed"
                icon={Map}
                variant="soft"
                ratio="3/4"
                className="h-full"
              />
            )}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-cream rounded-none border border-gold/20">
                <CheckCircle className="text-gold mb-5" size={52} />
                <h3 className="font-cormorant text-navy text-3xl font-semibold mb-3">
                  ¡Solicitud Enviada!
                </h3>
                <p className="font-outfit text-gray-500 max-w-sm leading-relaxed text-[15px]">
                  Hemos recibido tu solicitud de cita. Nuestro equipo se pondrá en contacto
                  contigo muy pronto para confirmar los detalles.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 font-outfit text-sm text-gold hover:text-gold-dark underline underline-offset-2 transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Nombre completo *
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Tu nombre"
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Teléfono *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+593 9XX XXX XXXX"
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white"
                  />
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Especialidad requerida *
                  </label>
                  <select
                    name="specialty"
                    required
                    defaultValue=""
                    className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 transition-colors bg-white appearance-none"
                  >
                    <option value="" disabled>
                      Selecciona una especialidad
                    </option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Fecha preferida *
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Hora preferida *
                    </label>
                    <select
                      name="time"
                      required
                      defaultValue=""
                      className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 transition-colors bg-white"
                    >
                      <option value="" disabled>Selecciona hora</option>
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5 */}
                <div>
                  <label className="block font-outfit text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Motivo de consulta (opcional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Describe brevemente tu motivo de consulta..."
                    className="w-full border border-gray-200 focus:border-gold focus:outline-none px-4 py-3 font-outfit text-sm text-gray-800 placeholder:text-gray-300 transition-colors bg-white resize-none"
                  />
                </div>

                {/* Error */}
                {formState === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                    <AlertCircle size={16} />
                    <span className="font-outfit text-sm">{errorMsg}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-3 bg-navy hover:bg-navy-light disabled:bg-gray-300 text-white font-outfit font-semibold py-4 text-sm tracking-wide transition-colors"
                >
                  {isPending ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isPending ? 'Enviando solicitud...' : 'Solicitar Cita'}
                </button>

                <p className="font-outfit text-gray-400 text-xs text-center leading-relaxed">
                  Al enviar confirmas que has leído nuestra política de privacidad.
                  Tus datos están protegidos y no serán compartidos.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
