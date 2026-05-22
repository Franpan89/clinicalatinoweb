'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Scissors, Baby, Heart, Activity, Sparkles, Stethoscope,
  ScanLine, FlaskConical, BedDouble, Siren, Pill, Microscope,
  Building2,
} from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

const services = [
  {
    icon: Scissors,
    title: 'Quirófano',
    desc: 'Sala quirúrgica de alta complejidad. Cirugía general, bariátrica y endoscópica con especialistas certificados.',
    tag: 'Cirugía',
  },
  {
    icon: Heart,
    title: 'Cardio Latino',
    desc: 'Programa especializado de cirugía cardíaca con cardiocirujanos de excelencia y tecnología cardiovascular de punta.',
    tag: 'Cardiología',
  },
  {
    icon: Baby,
    title: 'Neonatología',
    desc: 'Área distinguida por tecnología de punta que garantiza la calidad de atención al recién nacido prematuro o de riesgo.',
    tag: 'Pediatría',
  },
  {
    icon: Activity,
    title: 'Cuidados Intensivos',
    desc: 'Unidad UCI con monitoreo continuo, ventilación mecánica y equipo médico especializado disponible 24/7.',
    tag: 'UCI',
  },
  {
    icon: Sparkles,
    title: 'Cirugía Estética',
    desc: 'Rinoplastia, otoplastia, remodelación facial y cirugía estética realizadas por especialistas certificados.',
    tag: 'Estética',
  },
  {
    icon: Stethoscope,
    title: 'Ginecología',
    desc: 'Ginecología, obstetricia y reproducción humana. Atención integral de la salud femenina en todas sus etapas.',
    tag: 'Ginecología',
  },
  {
    icon: ScanLine,
    title: 'Centro de Imágenes',
    desc: 'Rayos X, tomografía computada y ecografía con equipos de diagnóstico por imágenes de última generación.',
    tag: 'Diagnóstico',
  },
  {
    icon: FlaskConical,
    title: 'Laboratorio',
    desc: 'Análisis clínicos y pruebas de laboratorio con resultados precisos y tiempos de respuesta ágiles.',
    tag: 'Laboratorio',
  },
  {
    icon: BedDouble,
    title: 'Hospitalización',
    desc: 'Habitaciones confortables con atención de enfermería especializada y seguimiento médico continuo.',
    tag: 'Hospitalización',
  },
  {
    icon: Siren,
    title: 'Emergencia 24/7',
    desc: 'Atención de urgencias y emergencias quirúrgicas y clínicas. Respuesta inmediata, todos los días del año.',
    tag: 'Emergencia',
  },
  {
    icon: Pill,
    title: 'Farmacia',
    desc: 'Farmacia interna con amplio inventario de medicamentos para comodidad de pacientes y familiares.',
    tag: 'Adicionales',
  },
  {
    icon: Microscope,
    title: 'Biología Molecular',
    desc: 'Análisis genéticos y moleculares avanzados para diagnóstico de enfermedades infecciosas y hereditarias.',
    tag: 'Especializado',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto">
        {/* Banner placeholder */}
        <div className="mb-16">
          <PlaceholderImage
            label="Banner de servicios"
            filename="banner-servicios.jpg"
            recommendedSize="2400×600px"
            icon={Building2}
            variant="brand"
            ratio="4/1"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold font-outfit text-xs font-semibold tracking-[0.3em] uppercase">
              Nuestros Servicios
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-cormorant text-navy text-5xl font-semibold mb-4">
            Atención Médica Integral
          </h2>
          <p className="text-gray-500 font-outfit max-w-lg mx-auto leading-relaxed text-[15px]">
            Todas las especialidades y servicios para cubrir integralmente tus necesidades
            de salud bajo un mismo techo.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {services.map((s, i) => (
            <motion.article
              key={i}
              variants={item}
              className="group p-6 border border-gray-100 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/5 transition-all duration-400 cursor-default"
            >
              <div className="w-10 h-10 bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center mb-4 transition-colors duration-300">
                <s.icon className="text-gold" size={18} />
              </div>
              <span className="font-outfit text-[10px] text-gold uppercase tracking-[0.2em] font-bold">
                {s.tag}
              </span>
              <h3 className="font-cormorant text-navy text-xl font-semibold mt-1 mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="font-outfit text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-gold font-outfit text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Saber más</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
