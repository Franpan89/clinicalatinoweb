import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import About from '@/components/About'
import EmergencyCTA from '@/components/EmergencyCTA'
import { getSiteSettings } from '@/lib/data/settings'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Quiénes Somos · Clínica Latino',
  description:
    'Conoce nuestra historia. Fundada en 1957 por el Dr. Rubén Astudillo, Clínica Latino consolida 69 años de medicina de excelencia en Cuenca, Ecuador.',
}

export default async function NosotrosPage() {
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
              Quiénes Somos
            </span>
            <div className="h-px w-10 bg-brand-gradient" />
          </div>

          <h1
            className="font-lato font-medium text-brand-dark leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)' }}
          >
            <span className="font-bold text-brand-gradient">69 años</span>{' '}
            consolidando la historia médica de Cuenca
          </h1>

          <p className="font-lato text-brand-gray font-normal text-lg leading-relaxed">
            Desde 1957 brindando atención médica especializada con innovación,
            experiencia y calidez humana.
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
                Nuestra Trayectoria
              </span>
              <div className="h-px w-10 bg-brand-gradient" />
            </div>
            <h2 className="font-lato text-brand-dark text-3xl lg:text-4xl font-medium">
              Hitos que han marcado nuestra historia
            </h2>
          </div>

          {/* Línea de tiempo vertical */}
          <ol className="relative border-l-2 border-brand-teal/25 ml-3 md:ml-6 space-y-10">
            {[
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
            ].map((m) => (
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
              &ldquo;Cuidar de ti ha sido nuestra prioridad desde el inicio. Hoy seguimos
              creciendo e innovando para ofrecerte una atención médica de excelencia.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} />
    </main>
  )
}
