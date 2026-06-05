import type { LucideIcon } from 'lucide-react'
import {
  Scissors,
  Baby,
  Stethoscope,
  Activity,
  ScanLine,
  FlaskConical,
  Siren,
  BedDouble,
  Pill,
  Microscope,
  Coffee,
} from 'lucide-react'

export type Service = {
  slug: string
  title: string
  tag: string
  icon: LucideIcon
  /** Descripción corta para tarjetas (home) */
  shortDesc: string
  /** Descripción larga para landing — puede ser igual a shortDesc si no aplica */
  longDesc: string
  /** Bullets de highlights */
  highlights: string[]
  /** Ruta de la imagen vertical en la landing */
  image: string
}

export const SERVICES: Service[] = [
  // ── Fila 1 ────────────────────────────────────────────
  {
    slug: 'quirofano',
    title: 'Quirófano',
    tag: 'Cirugía',
    icon: Scissors,
    shortDesc:
      'Salas quirúrgicas de alta complejidad equipadas con tecnología de vanguardia para cirugías generales, laparoscópicas y de alta especialidad.',
    longDesc:
      'Nuestras salas quirúrgicas reúnen las condiciones técnicas y el equipo humano necesarios para procedimientos generales, laparoscópicos y de alta especialidad. Combinamos tecnología de punta con especialistas certificados para garantizar seguridad, eficiencia y los mejores resultados clínicos en cada intervención.',
    highlights: [
      'Cirugía general, bariátrica y de alta complejidad',
      'Técnicas laparoscópicas mínimamente invasivas',
      'Equipo médico certificado y supervisión continua',
    ],
    image: '/img/servicios/quirofano.jpg',
  },
  {
    slug: 'ginecologia',
    title: 'Ginecología y reproducción humana',
    tag: 'Salud Femenina',
    icon: Stethoscope,
    shortDesc:
      'Atención especializada para la salud integral de la mujer con diagnóstico, tratamiento y acompañamiento en ginecología, fertilidad y reproducción humana.',
    longDesc:
      'Ofrecemos cobertura completa para la salud de la mujer en cada etapa: ginecología clínica, obstetricia, oncología ginecológica y medicina reproductiva. Nuestro equipo combina tecnología de vanguardia con un acompañamiento humano cercano y discreto, brindando soluciones efectivas y respetuosas.',
    highlights: [
      'Ginecología y obstetricia integral',
      'Fertilidad y reproducción asistida',
      'Ecografía y diagnóstico de alta resolución',
    ],
    image: '/img/servicios/ginecologia.jpg',
  },
  {
    slug: 'neonatologia',
    title: 'Neonatología',
    tag: 'Recién Nacido',
    icon: Baby,
    shortDesc:
      'Cuidado intensivo y especializado para el recién nacido prematuro o en estado crítico, con monitoreo constante y calidez humana.',
    longDesc:
      'Nuestra Unidad de Cuidados Intensivos Neonatales atiende al recién nacido prematuro o en estado crítico con la tecnología y experiencia que se requieren en sus primeros días de vida. El equipo de neonatólogos y enfermeras especializadas brinda monitoreo 24/7 con un enfoque humano que acompaña también a los padres.',
    highlights: [
      'UCI neonatal de alta complejidad',
      'Monitoreo continuo 24 horas',
      'Especialistas en prematurez y patología perinatal',
    ],
    image: '/img/servicios/neonatologia.jpg',
  },
  {
    slug: 'cuidados-intensivos',
    title: 'Cuidados Intensivos',
    tag: 'UCI',
    icon: Activity,
    shortDesc:
      'Monitoreo crítico continuo las 24 horas con soporte vital avanzado y un equipo multidisciplinario altamente calificado.',
    longDesc:
      'La Unidad de Cuidados Intensivos atiende a pacientes en estado crítico que requieren vigilancia y soporte vital avanzado. Contamos con un equipo multidisciplinario altamente entrenado que trabaja en conjunto con todas las especialidades para garantizar la mejor evolución clínica posible.',
    highlights: [
      'Monitoreo crítico continuo las 24 horas',
      'Ventilación mecánica y soporte vital avanzado',
      'Equipo multidisciplinario altamente calificado',
    ],
    image: '/img/servicios/cuidados-intensivos.jpg',
  },

  // ── Fila 2 ────────────────────────────────────────────
  {
    slug: 'laboratorio',
    title: 'Laboratorio',
    tag: 'Diagnóstico',
    icon: FlaskConical,
    shortDesc:
      'Servicio de diagnóstico clínico con tecnología moderna y resultados confiables.',
    longDesc:
      'Nuestro laboratorio clínico brinda apoyo oportuno para la prevención, el diagnóstico y el seguimiento de la salud de nuestros pacientes. Trabajamos con equipos modernos y procesos estandarizados que aseguran resultados confiables, rápidos y trazables.',
    highlights: [
      'Análisis clínicos completos',
      'Resultados confiables con tecnología moderna',
      'Reportes rápidos y trazables',
    ],
    image: '/img/servicios/laboratorio.jpg',
  },
  {
    slug: 'centro-imagenes',
    title: 'Centro de Imágenes',
    tag: 'Imagen',
    icon: ScanLine,
    shortDesc:
      'Diagnósticos precisos mediante tomografía, rayos X y ecografía de alta resolución para un tratamiento oportuno y seguro.',
    longDesc:
      'Centro de imágenes diagnósticas equipado con tecnología de última generación. Realizamos tomografía computada, rayos X digital y ecografía de alta resolución, con interpretación a cargo de radiólogos experimentados. La precisión del diagnóstico es la base de un tratamiento exitoso.',
    highlights: [
      'Tomografía computada de alta resolución',
      'Rayos X digital y ecografía',
      'Interpretación por radiólogos especialistas',
    ],
    image: '/img/servicios/centro-imagenes.jpg',
  },
  {
    slug: 'emergencia',
    title: 'Emergencia',
    tag: '24/7',
    icon: Siren,
    shortDesc:
      'Atención médica 24/7 e intervenciones quirúrgicas de urgencia inmediatas, disponibles en cualquier momento con personal calificado.',
    longDesc:
      'El servicio de emergencia opera las 24 horas, los 7 días de la semana. Atendemos urgencias clínicas y quirúrgicas con respuesta inmediata, contando con personal médico calificado, infraestructura de soporte vital y conexión directa con todas las especialidades del hospital.',
    highlights: [
      'Atención médica 24/7 todos los días del año',
      'Intervenciones quirúrgicas de urgencia inmediatas',
      'Equipo médico calificado y soporte multidisciplinario',
    ],
    image: '/img/servicios/emergencia.jpg',
  },

  // ── Fila 3 ────────────────────────────────────────────
  {
    slug: 'hospitalizacion',
    title: 'Hospitalización',
    tag: 'Internación',
    icon: BedDouble,
    shortDesc:
      'Habitaciones confortables diseñadas para una recuperación segura, con asistencia de enfermería permanente y calidez médica.',
    longDesc:
      'Las habitaciones de hospitalización están diseñadas para favorecer una recuperación segura y digna. Cuentan con asistencia de enfermería permanente, equipamiento clínico moderno y un ambiente confortable que acompaña al paciente y a su familia durante el proceso.',
    highlights: [
      'Habitaciones individuales confortables',
      'Asistencia de enfermería permanente',
      'Acompañamiento médico personalizado',
    ],
    image: '/img/servicios/hospitalizacion.jpg',
  },
  {
    slug: 'farmacia',
    title: 'Farmacia',
    tag: 'Medicamentos',
    icon: Pill,
    shortDesc:
      'Servicio farmacéutico interno con stock completo de medicamentos e insumos médicos garantizados.',
    longDesc:
      'La farmacia interna de Clínica Latino dispone de un inventario amplio y verificado de medicamentos e insumos médicos. Esto garantiza disponibilidad inmediata para tratamientos hospitalarios y ambulatorios, con la seguridad y trazabilidad que cada paciente merece.',
    highlights: [
      'Stock completo de medicamentos',
      'Insumos médicos garantizados',
      'Disponibilidad inmediata para pacientes',
    ],
    image: '/img/servicios/farmacia.jpg',
  },
  {
    slug: 'biologia-molecular',
    title: 'Biología Molecular',
    tag: 'Especializado',
    icon: Microscope,
    shortDesc:
      'Pruebas diagnósticas avanzadas y análisis genéticos de alta precisión para la detección temprana de patologías complejas.',
    longDesc:
      'Nuestro laboratorio de biología molecular ofrece análisis genéticos y pruebas moleculares de alta precisión. Estos estudios permiten diagnóstico temprano de patologías complejas, identificación de agentes infecciosos por PCR y seguimiento personalizado de tratamientos avanzados.',
    highlights: [
      'Análisis genéticos avanzados',
      'PCR cuantitativa y secuenciación',
      'Diagnóstico de alta precisión',
    ],
    image: '/img/servicios/biologia-molecular.jpg',
  },
  {
    slug: 'cafeteria',
    title: 'Cafetería',
    tag: 'Confort',
    icon: Coffee,
    shortDesc:
      'Un espacio confortable diseñado para el descanso de pacientes y familiares, con una variada selección de alimentos frescos, saludables y nutritivos.',
    longDesc:
      'La cafetería de Clínica Latino es un espacio confortable pensado para el descanso de pacientes y familiares. Ofrecemos una selección variada de alimentos frescos, saludables y nutritivos, en un ambiente que invita a tomar un respiro durante la jornada.',
    highlights: [
      'Espacio confortable para pacientes y familiares',
      'Alimentos frescos y saludables',
      'Variada selección nutritiva',
    ],
    image: '/img/servicios/cafeteria.jpg',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
