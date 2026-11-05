import type { LucideIcon } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
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
  TestTube,
  Wind,
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
      'Rayos X digital y ecografía (Fluoroscopía)',
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

  // ── Fila 4 ────────────────────────────────────────────
  {
    slug: 'patologia',
    title: 'Patología',
    tag: 'Diagnóstico',
    icon: TestTube,
    shortDesc:
      'Contamos con un servicio especializado que ofrece análisis precisos y confiables, fundamentales para el diagnóstico y seguimiento de diversas enfermedades.',
    longDesc:
      'Contamos con un servicio especializado que ofrece análisis precisos y confiables, fundamentales para el diagnóstico y seguimiento de diversas enfermedades. Nuestro equipo de patólogos trabaja con tecnología moderna para el estudio histopatológico de tejidos y biopsias, garantizando resultados oportunos que orientan el tratamiento adecuado para cada paciente.',
    highlights: [
      'Estudio histopatológico de biopsias',
      'Diagnóstico preciso para el seguimiento clínico',
      'Resultados confiables en tiempos oportunos',
    ],
    image: '/img/servicios/patologia.jpg',
  },
  {
    slug: 'camara-hiperbarica',
    title: 'Cámara Hiperbárica',
    tag: 'Terapia',
    icon: Wind,
    shortDesc:
      'La terapia hiperbárica consiste en respirar oxígeno al 100% dentro de una cámara presurizada, aumentando la cantidad de oxígeno que llega a los tejidos.',
    longDesc:
      'La terapia hiperbárica consiste en respirar oxígeno al 100% dentro de una cámara presurizada, aumentando la cantidad de oxígeno que llega a los tejidos. Este proceso favorece la regeneración celular, acelera la cicatrización y ayuda a disminuir la inflamación, promoviendo una recuperación más rápida y efectiva.',
    highlights: [
      'Oxigenación tisular a presión controlada',
      'Acelera la cicatrización de heridas complejas',
      'Tratamiento supervisado por especialistas',
    ],
    image: '/img/servicios/camara-hiperbarica.jpg',
  },
]

type ServiceCopy = Pick<Service, 'title' | 'tag' | 'shortDesc' | 'longDesc' | 'highlights'>

/** Traducción al inglés, por slug. Un slug ausente cae al texto en español. */
const SERVICES_EN: Record<string, ServiceCopy> = {
  quirofano: {
    title: 'Operating room',
    tag: 'Surgery',
    shortDesc:
      'High-complexity surgical suites equipped with state-of-the-art technology for general, laparoscopic, and highly specialized surgery.',
    longDesc:
      'Our surgical suites offer the technical conditions and the clinical team needed for general, laparoscopic, and highly specialized procedures. We combine cutting-edge technology with certified specialists to ensure safety, efficiency, and the best clinical outcomes in every intervention.',
    highlights: [
      'General, bariatric, and high-complexity surgery',
      'Minimally invasive laparoscopic techniques',
      'Certified medical team and continuous supervision',
    ],
  },
  ginecologia: {
    title: 'Gynecology and human reproduction',
    tag: "Women's Health",
    shortDesc:
      "Specialized care for women's overall health, with diagnosis, treatment, and support in gynecology, fertility, and human reproduction.",
    longDesc:
      "We offer complete care for women's health at every stage of life: clinical gynecology, obstetrics, gynecologic oncology, and reproductive medicine. Our team combines state-of-the-art technology with close, discreet, personal support, delivering effective and respectful solutions.",
    highlights: [
      'Comprehensive gynecology and obstetrics',
      'Fertility and assisted reproduction',
      'High-resolution ultrasound and diagnostics',
    ],
  },
  neonatologia: {
    title: 'Neonatology',
    tag: 'Newborn',
    shortDesc:
      'Intensive, specialized care for premature or critically ill newborns, with constant monitoring and human warmth.',
    longDesc:
      'Our Neonatal Intensive Care Unit cares for premature or critically ill newborns with the technology and expertise they need in their first days of life. Our team of neonatologists and specialized nurses provides 24/7 monitoring with a caring approach that supports parents as well.',
    highlights: [
      'High-complexity neonatal ICU',
      'Continuous 24-hour monitoring',
      'Specialists in prematurity and perinatal conditions',
    ],
  },
  'cuidados-intensivos': {
    title: 'Intensive care',
    tag: 'ICU',
    shortDesc:
      'Continuous critical-care monitoring around the clock, with advanced life support and a highly qualified multidisciplinary team.',
    longDesc:
      'The Intensive Care Unit treats critically ill patients who require close monitoring and advanced life support. A highly trained multidisciplinary team works together with every specialty to ensure the best possible clinical outcome.',
    highlights: [
      'Continuous critical-care monitoring, 24 hours a day',
      'Mechanical ventilation and advanced life support',
      'Highly qualified multidisciplinary team',
    ],
  },
  laboratorio: {
    title: 'Laboratory',
    tag: 'Diagnostics',
    shortDesc:
      'Clinical diagnostic service with modern technology and reliable results.',
    longDesc:
      "Our clinical laboratory provides timely support for the prevention, diagnosis, and monitoring of our patients' health. We work with modern equipment and standardized processes that ensure reliable, fast, and traceable results.",
    highlights: [
      'Complete clinical testing',
      'Reliable results with modern technology',
      'Fast, traceable reports',
    ],
  },
  'centro-imagenes': {
    title: 'Imaging center',
    tag: 'Imaging',
    shortDesc:
      'Accurate diagnoses through CT, X-ray, and high-resolution ultrasound for timely, safe treatment.',
    longDesc:
      'Diagnostic imaging center equipped with state-of-the-art technology. We perform computed tomography, digital X-ray, and high-resolution ultrasound, interpreted by experienced radiologists. Diagnostic accuracy is the foundation of successful treatment.',
    highlights: [
      'High-resolution computed tomography',
      'Digital X-ray and ultrasound (Fluoroscopy)',
      'Interpretation by specialist radiologists',
    ],
  },
  emergencia: {
    title: 'Emergency',
    tag: '24/7',
    shortDesc:
      'Medical care 24/7 and immediate emergency surgical interventions, available at any time with qualified staff.',
    longDesc:
      'The emergency service operates 24 hours a day, 7 days a week. We treat clinical and surgical emergencies with an immediate response, backed by qualified medical staff, life-support infrastructure, and a direct connection to every specialty in the hospital.',
    highlights: [
      'Medical care 24/7, every day of the year',
      'Immediate emergency surgical interventions',
      'Qualified medical team and multidisciplinary support',
    ],
  },
  hospitalizacion: {
    title: 'Inpatient care',
    tag: 'Inpatient',
    shortDesc:
      'Comfortable rooms designed for a safe recovery, with continuous nursing assistance and caring medical attention.',
    longDesc:
      'Our inpatient rooms are designed to support a safe, dignified recovery. They offer continuous nursing assistance, modern clinical equipment, and a comfortable environment that supports patients and their families throughout the process.',
    highlights: [
      'Comfortable private rooms',
      'Continuous nursing assistance',
      'Personalized medical support',
    ],
  },
  farmacia: {
    title: 'Pharmacy',
    tag: 'Medications',
    shortDesc:
      'In-house pharmacy service with a complete stock of medications and guaranteed medical supplies.',
    longDesc:
      'The in-house pharmacy at Clínica Latino keeps a broad, verified inventory of medications and medical supplies. This ensures immediate availability for inpatient and outpatient treatments, with the safety and traceability every patient deserves.',
    highlights: [
      'Complete stock of medications',
      'Guaranteed medical supplies',
      'Immediate availability for patients',
    ],
  },
  'biologia-molecular': {
    title: 'Molecular biology',
    tag: 'Specialized',
    shortDesc:
      'Advanced diagnostic testing and high-precision genetic analysis for early detection of complex conditions.',
    longDesc:
      'Our molecular biology laboratory offers high-precision genetic analysis and molecular testing. These studies enable early diagnosis of complex conditions, identification of infectious agents by PCR, and personalized monitoring of advanced treatments.',
    highlights: [
      'Advanced genetic analysis',
      'Quantitative PCR and sequencing',
      'High-precision diagnostics',
    ],
  },
  cafeteria: {
    title: 'Cafeteria',
    tag: 'Comfort',
    shortDesc:
      'A comfortable space designed for patients and family members to rest, with a varied selection of fresh, healthy, and nutritious food.',
    longDesc:
      'The Clínica Latino cafeteria is a comfortable space designed for patients and family members to rest. We offer a varied selection of fresh, healthy, and nutritious food in an atmosphere that invites you to take a breather during the day.',
    highlights: [
      'Comfortable space for patients and family members',
      'Fresh, healthy food',
      'Varied, nutritious selection',
    ],
  },
  patologia: {
    title: 'Pathology',
    tag: 'Diagnostics',
    shortDesc:
      'We offer a specialized service that provides accurate, reliable analyses, essential for the diagnosis and monitoring of a wide range of diseases.',
    longDesc:
      'We offer a specialized service that provides accurate, reliable analyses, essential for the diagnosis and monitoring of a wide range of diseases. Our team of pathologists uses modern technology for the histopathological study of tissue and biopsies, delivering timely results that guide the right treatment for each patient.',
    highlights: [
      'Histopathological study of biopsies',
      'Accurate diagnosis for clinical follow-up',
      'Reliable results in a timely manner',
    ],
  },
  'camara-hiperbarica': {
    title: 'Hyperbaric chamber',
    tag: 'Therapy',
    shortDesc:
      'Hyperbaric therapy involves breathing 100% oxygen inside a pressurized chamber, increasing the amount of oxygen that reaches the tissues.',
    longDesc:
      'Hyperbaric therapy involves breathing 100% oxygen inside a pressurized chamber, increasing the amount of oxygen that reaches the tissues. This process promotes cell regeneration, speeds up healing, and helps reduce inflammation, supporting a faster, more effective recovery.',
    highlights: [
      'Tissue oxygenation at controlled pressure',
      'Speeds up healing of complex wounds',
      'Treatment supervised by specialists',
    ],
  },
}

const SERVICES_EN_LIST: Service[] = SERVICES.map((s) => {
  const en = SERVICES_EN[s.slug]
  return en ? { ...s, ...en } : s
})

/** Servicios localizados (slug, icon e image no cambian). */
export function getServices(locale: Locale): Service[] {
  return locale === 'en' ? SERVICES_EN_LIST : SERVICES
}

export function getServiceBySlug(slug: string, locale: Locale = 'es'): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug)
}
