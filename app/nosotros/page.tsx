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
          <div className="text-center mb-12">
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

          <ul className="space-y-6">
            {[
              {
                year: '1957',
                title: 'Fundación',
                desc: 'Dr. Rubén Astudillo y un destacado grupo de especialistas fundan la primera clínica privada del austro ecuatoriano.',
              },
              {
                year: '1991',
                title: 'Pioneros en laparoscopía',
                desc: 'Realizamos las primeras cirugías laparoscópicas a nivel nacional, marcando un antes y un después en la medicina ecuatoriana.',
              },
              {
                year: 'Hoy',
                title: 'Vanguardia médica',
                desc: 'Centro médico privado con tecnología de punta, 40+ especialidades y atención 24/7 los 365 días del año.',
              },
            ].map((m) => (
              <li
                key={m.year}
                className="flex flex-col md:flex-row gap-5 bg-white p-6 border border-brand-surface"
              >
                <div className="md:w-32 flex-shrink-0">
                  <div className="font-lato text-brand-gradient text-3xl font-bold leading-none">
                    {m.year}
                  </div>
                </div>
                <div>
                  <h3 className="font-lato text-brand-dark text-lg font-bold mb-1">
                    {m.title}
                  </h3>
                  <p className="font-lato text-brand-gray leading-relaxed text-[15px]">
                    {m.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EmergencyCTA />
      <Footer logoUrl={settings.logo_url} />
    </main>
  )
}
