'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Scissors, Baby, Stethoscope, Activity, ScanLine, FlaskConical,
  Siren, BedDouble, Pill, Microscope, Coffee, ArrowRight, Building2,
} from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

const services = [
  // ── Fila 1 ────────────────────────────────────────────
  {
    icon: Scissors,
    title: 'Quirófano',
    desc: 'Salas quirúrgicas de alta complejidad equipadas con tecnología de vanguardia para cirugías generales, laparoscópicas y de alta especialidad.',
    tag: 'Cirugía',
  },
  {
    icon: Stethoscope,
    title: 'Ginecología y reproducción humana',
    desc: 'Atención especializada para la salud integral de la mujer, con diagnóstico, tratamiento y acompañamiento en ginecología, fertilidad y reproducción humana, respaldados por tecnología de vanguardia y un equipo médico altamente calificado.',
    tag: 'Mujer',
  },
  {
    icon: Baby,
    title: 'Neonatología',
    desc: 'Cuidado intensivo y especializado para el recién nacido prematuro o en estado crítico, con monitoreo constante y calidez humana.',
    tag: 'Recién nacido',
  },
  {
    icon: Activity,
    title: 'Cuidados Intensivos',
    desc: 'Monitoreo crítico continuo las 24 horas con soporte vital avanzado y un equipo multidisciplinario altamente calificado.',
    tag: 'UCI',
  },

  // ── Fila 2 ────────────────────────────────────────────
  {
    icon: FlaskConical,
    title: 'Laboratorio',
    desc: 'Servicio de diagnóstico clínico con tecnología moderna y resultados confiables, brindando apoyo oportuno para la prevención, diagnóstico y seguimiento de la salud de nuestros pacientes.',
    tag: 'Diagnóstico',
  },
  {
    icon: ScanLine,
    title: 'Centro de Imágenes',
    desc: 'Diagnósticos precisos mediante tomografía, rayos X y ecografía de alta resolución para un tratamiento oportuno y seguro.',
    tag: 'Imagen',
  },
  {
    icon: Siren,
    title: 'Emergencia',
    desc: 'Atención médica 24/7 e intervenciones quirúrgicas de urgencia inmediatas, disponibles en cualquier momento con personal calificado.',
    tag: '24/7',
  },

  // ── Fila 3 ────────────────────────────────────────────
  {
    icon: BedDouble,
    title: 'Hospitalización',
    desc: 'Habitaciones confortables diseñadas para una recuperación segura, con asistencia de enfermería permanente y calidez médica.',
    tag: 'Internación',
  },
  {
    icon: Pill,
    title: 'Farmacia',
    desc: 'Servicio farmacéutico interno con stock completo de medicamentos e insumos médicos garantizados para la seguridad de nuestros pacientes.',
    tag: 'Medicamentos',
  },
  {
    icon: Microscope,
    title: 'Biología Molecular',
    desc: 'Pruebas diagnósticas avanzadas y análisis genéticos de alta precisión para la detección temprana de patologías complejas.',
    tag: 'Especializado',
  },
  {
    icon: Coffee,
    title: 'Cafetería',
    desc: 'Un espacio confortable diseñado para el descanso de pacientes y familiares, con una variada selección de alimentos frescos, saludables y nutritivos.',
    tag: 'Confort',
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
            filename="public/img/banner-servicios.jpg"
            recommendedSize="2400×600px"
            icon={Building2}
            variant="brand"
            ratio="4/1"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
              Nuestros Servicios
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>
          <h2 className="font-lato text-brand-dark text-5xl font-light mb-4">
            Atención Médica Integral
          </h2>
          <p className="text-brand-gray font-lato font-light max-w-lg mx-auto leading-relaxed text-[15px]">
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
            <motion.a
              key={i}
              href="#contacto"
              variants={item}
              className="group p-6 border border-brand-surface hover:border-brand-teal/60 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-400 cursor-pointer flex flex-col"
            >
              <div className="w-10 h-10 bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center mb-4 transition-colors duration-300">
                <s.icon className="text-brand-teal" size={18} />
              </div>
              <span className="font-lato text-[10px] text-brand-teal uppercase tracking-[0.2em] font-bold">
                {s.tag}
              </span>
              <h3 className="font-lato text-brand-dark text-lg font-bold mt-1 mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="font-lato text-brand-gray text-sm leading-relaxed font-light flex-grow">
                {s.desc}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-brand-teal font-lato text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Agendar cita</span>
                <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
