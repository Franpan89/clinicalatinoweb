import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Accordion, { type AccordionItem } from '@/components/Accordion'
import EmergencyCTA from '@/components/EmergencyCTA'
import { CheckCircle2 } from 'lucide-react'
import { getSiteSettings } from '@/lib/data/settings'
import { getLocale } from '@/lib/i18n/server'

export const revalidate = 60

const es = {
  metaTitle: 'Quiénes Somos',
  metaDescription:
    'Conoce nuestra historia. Fundada en 1957 por el Dr. Rubén Astudillo, Clínica Latino consolida 69 años de medicina de excelencia en Cuenca, Ecuador.',
  eyebrow: 'Quiénes Somos',
  heroYears: '69 años',
  heroTitle: 'consolidando la historia médica de Cuenca',
  heroText:
    'Desde 1957 brindando atención médica especializada con innovación, experiencia y calidez humana.',
  timelineEyebrow: 'Nuestra Trayectoria',
  timelineTitle: 'Hitos que han marcado nuestra historia',
  milestones: [
    {
      year: '1957',
      title: 'Fundación',
      desc: 'El 4 de febrero de 1957 surgió la Clínica Santa Clara como la primera clínica de Cuenca, creada por el Dr. Rubén Astudillo Quintanilla.',
    },
    {
      year: '1985',
      title: 'Clínica Latinoamericana',
      desc: 'Con la participación de un nuevo grupo de médicos ampliaron el servicio y le cambiaron el nombre a Clínica Latinoamericana.',
    },
    {
      year: '1992',
      title: 'Pioneros en cirugía laparoscópica',
      desc: 'Fuimos los pioneros en el país en realizar intervenciones quirúrgicas mínimas invasivas para la extirpación de la vesícula biliar, apéndice, útero y ovarios.',
    },
    {
      year: '1995',
      title: 'Hospital Latinoamericano',
      desc: 'Se terminó la construcción del actual edificio, que contaba con la capacidad suficiente para formar a partir de entonces el Hospital Latinoamericano, con todos los servicios y atención especializada.',
    },
    {
      year: '2020',
      title: 'Hospital centinela',
      desc: 'Durante la pandemia por COVID-19, Clínica Latino asumió un papel fundamental como hospital centinela, implementando estrictos protocolos de bioseguridad y adecuando áreas seguras para la atención de pacientes.',
    },
    {
      year: '2026',
      title: 'Certificación ISO 9001:2015',
      desc: 'Clínica Latino obtuvo la certificación ISO 9001:2015, un reconocimiento internacional que avala la calidad de sus procesos y su compromiso con la mejora continua.',
    },
  ],
  quote:
    'Cuidar de ti ha sido nuestra prioridad desde el inicio. Hoy seguimos creciendo e innovando para ofrecerte una atención médica de excelencia.',
  identityEyebrow: 'Nuestra Identidad',
  identityTitle: 'Lo que nos guía cada día',
  qualityPolicyTitle: 'Política de calidad',
  qualityPolicy:
    'Proporcionar a la comunidad una atención integral y especializada en salud, dentro de un ambiente de calidez, eficiencia y calidad, con altos estándares profesionales, capacitación permanente y tecnología de punta, buscando el mejoramiento continuo.',
  qualityObjectivesTitle: 'Objetivos de calidad',
  qualityObjectives: [
    'Ofrecer a la comunidad servicios de salud con calidez, eficiencia y calidad.',
    'Disponer de un talento humano profesional, especializado, permanentemente capacitado.',
    'Ser una organización sólida, manteniendo los índices adecuados para su sostenibilidad.',
    'Gestionar y mantener el compromiso de sus colaboradores a fin de promover el mejoramiento continuo.',
  ],
  visionTitle: 'Visión',
  vision:
    'Ser los pioneros en el desarrollo institucional en salud en la ciudad de Cuenca, con el reconocimiento nacional e internacional.',
  missionTitle: 'Misión',
  mission:
    'Proporcionar a la comunidad, dentro de un ambiente de calidez, eficiencia y calidad, las acciones necesarias y oportunas para la recuperación de la salud, con altos estándares profesionales, investigación especializada, capacitación permanente y tecnología de punta, sin olvidar los principios y valores de ética y profesionalismo de cada uno de sus colaboradores.',
  valuesTitle: 'Valores institucionales',
  values: [
    'Respeto',
    'Compasión',
    'Empatía',
    'Integridad',
    'Altruismo',
    'Honestidad',
    'Innovación',
    'Profesionalismo',
  ],
}

const en: typeof es = {
  metaTitle: 'About Us',
  metaDescription:
    'Learn about our history. Founded in 1957 by Dr. Rubén Astudillo, Clínica Latino has built 69 years of excellence in medicine in Cuenca, Ecuador.',
  eyebrow: 'About Us',
  heroYears: '69 years',
  heroTitle: 'shaping the medical history of Cuenca',
  heroText:
    'Delivering specialized medical care since 1957 with innovation, experience, and a human touch.',
  timelineEyebrow: 'Our Journey',
  timelineTitle: 'Milestones that have shaped our history',
  milestones: [
    {
      year: '1957',
      title: 'Founding',
      desc: 'On February 4, 1957, Clínica Santa Clara opened as the first clinic in Cuenca, founded by Dr. Rubén Astudillo Quintanilla.',
    },
    {
      year: '1985',
      title: 'Clínica Latinoamericana',
      desc: 'With the participation of a new group of physicians, the clinic expanded its services and changed its name to Clínica Latinoamericana.',
    },
    {
      year: '1992',
      title: 'Pioneers in laparoscopic surgery',
      desc: 'We were pioneers in the country in performing minimally invasive surgery to remove the gallbladder, appendix, uterus, and ovaries.',
    },
    {
      year: '1995',
      title: 'Hospital Latinoamericano',
      desc: 'Construction of the current building was completed, with enough capacity to establish the Hospital Latinoamericano from then on, offering all services and specialized care.',
    },
    {
      year: '2020',
      title: 'Sentinel hospital',
      desc: 'During the COVID-19 pandemic, Clínica Latino took on a key role as a sentinel hospital, implementing strict biosafety protocols and setting up safe areas for patient care.',
    },
    {
      year: '2026',
      title: 'ISO 9001:2015 Certification',
      desc: 'Clínica Latino earned ISO 9001:2015 certification, an international recognition that attests to the quality of its processes and its commitment to continuous improvement.',
    },
  ],
  quote:
    'Caring for you has been our priority from the start. Today we keep growing and innovating to offer you excellent medical care.',
  identityEyebrow: 'Our Identity',
  identityTitle: 'What guides us every day',
  qualityPolicyTitle: 'Quality policy',
  qualityPolicy:
    'To provide the community with comprehensive, specialized health care in an environment of warmth, efficiency, and quality, with high professional standards, ongoing training, and cutting-edge technology, always pursuing continuous improvement.',
  qualityObjectivesTitle: 'Quality objectives',
  qualityObjectives: [
    'To offer the community health services with warmth, efficiency, and quality.',
    'To have a professional, specialized, and continuously trained workforce.',
    'To be a solid organization, maintaining the right indicators for its sustainability.',
    'To manage and sustain the commitment of its team members in order to promote continuous improvement.',
  ],
  visionTitle: 'Vision',
  vision:
    'To be pioneers in institutional healthcare development in the city of Cuenca, with national and international recognition.',
  missionTitle: 'Mission',
  mission:
    'To provide the community, in an environment of warmth, efficiency, and quality, with the necessary and timely actions for the recovery of health, with high professional standards, specialized research, ongoing training, and cutting-edge technology, without losing sight of the ethical principles and professional values of each of its team members.',
  valuesTitle: 'Institutional values',
  values: [
    'Respect',
    'Compassion',
    'Empathy',
    'Integrity',
    'Altruism',
    'Honesty',
    'Innovation',
    'Professionalism',
  ],
}

const COPY = { es, en }

function getIdentityItems(t: typeof es): AccordionItem[] {
  return [
    {
      id: 'politica-calidad',
      title: t.qualityPolicyTitle,
      content: <p>{t.qualityPolicy}</p>,
    },
    {
      id: 'objetivos-calidad',
      title: t.qualityObjectivesTitle,
      content: (
        <ol className="space-y-3">
          {t.qualityObjectives.map((objective, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="font-lato text-brand-gradient text-xl font-bold leading-none w-5 flex-shrink-0">
                {i + 1}
              </span>
              <span>{objective}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'vision',
      title: t.visionTitle,
      content: <p>{t.vision}</p>,
    },
    {
      id: 'mision',
      title: t.missionTitle,
      content: <p>{t.mission}</p>,
    },
    {
      id: 'valores',
      title: t.valuesTitle,
      content: (
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
          {t.values.map((value) => (
            <li key={value} className="flex items-center gap-2.5">
              <CheckCircle2 className="text-brand-teal flex-shrink-0" size={15} />
              <span className="text-brand-dark/80 font-medium">{value}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ]
}

export function generateMetadata(): Metadata {
  const t = COPY[getLocale()]
  return {
    title: `${t.metaTitle} · Clínica Latino`,
    description: t.metaDescription,
  }
}

export default async function NosotrosPage() {
  const t = COPY[getLocale()]
  const settings = await getSiteSettings()
  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />

      {/* Page header */}
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-brand-gradient" />
            <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.35em] uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            <span className="font-bold text-brand-gradient">{t.heroYears}</span>{' '}
            {t.heroTitle}
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            {t.heroText}
          </p>
        </div>
      </section>

      <About
        slides={[
          settings.about_slide_1,
          settings.about_slide_2,
          settings.about_slide_3,
          settings.about_slide_4,
          settings.about_slide_5,
        ]}
      />

      {/* Hitos / Cronología */}
      <section className="py-16 bg-brand-surface">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                {t.timelineEyebrow}
              </span>
              <div className="h-px w-10 bg-brand-gradient" />
            </div>
            <h2 className="font-lato text-brand-dark text-3xl lg:text-4xl font-medium">
              {t.timelineTitle}
            </h2>
          </div>

          {/* Línea de tiempo vertical */}
          <ol className="relative border-l-2 border-brand-teal/25 ml-3 md:ml-6 space-y-10">
            {t.milestones.map((m) => (
              <li key={m.year} className="relative pl-8 md:pl-10">
                {/* Punto en la línea */}
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-gradient ring-4 ring-brand-surface" />
                <div className="font-lato text-brand-gradient text-3xl font-bold leading-none mb-2">
                  {m.year}
                </div>
                <h3 className="font-lato text-brand-dark text-lg font-bold mb-1.5 uppercase tracking-wide">
                  {m.title}
                </h3>
                <p className="font-lato text-brand-gray leading-relaxed text-[15px] max-w-2xl">
                  {m.desc}
                </p>
              </li>
            ))}
          </ol>

          {/* Cierre / quote */}
          <div className="mt-14 bg-brand-gradient p-8 md:p-10 text-center">
            <p className="font-lato text-white text-xl md:text-2xl font-medium italic leading-relaxed max-w-3xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Política de calidad, objetivos, visión, misión y valores */}
      <section id="identidad" className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-gradient" />
              <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
                {t.identityEyebrow}
              </span>
              <div className="h-px w-10 bg-brand-gradient" />
            </div>
            <h2 className="font-lato text-brand-dark text-3xl lg:text-4xl font-medium">
              {t.identityTitle}
            </h2>
          </div>

          <Accordion items={getIdentityItems(t)} defaultOpenId="politica-calidad" />
        </div>
      </section>

      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
