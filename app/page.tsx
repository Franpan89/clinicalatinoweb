import Navigation from '@/components/Navigation'
import TopSlideshow from '@/components/TopSlideshow'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Doctors from '@/components/Doctors'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import EmergencyCTA from '@/components/EmergencyCTA'
import InsurancePartners from '@/components/InsurancePartners'
import Footer from '@/components/Footer'
import { getActiveSpecialties } from '@/lib/data/specialties'
import { getSiteSettings } from '@/lib/data/settings'
import { getActiveInsuranceLogos } from '@/lib/data/insurance'
import { getActiveDoctors } from '@/lib/data/doctors'
import { getLocale } from '@/lib/i18n/server'

export const revalidate = 60

const GALLERY_LABELS = {
  es: {
    facade: 'Fachada principal',
    room: 'Habitación hospitalaria',
    surgery: 'Quirófano',
    lab: 'Laboratorio',
    imaging: 'Centro de imágenes',
  },
  en: {
    facade: 'Main building',
    room: 'Hospital room',
    surgery: 'Operating room',
    lab: 'Laboratory',
    imaging: 'Imaging center',
  },
}

export default async function Home() {
  const locale = getLocale()
  const galleryLabels = GALLERY_LABELS[locale]
  const [doctors, specialties, settings, insuranceLogos] = await Promise.all([
    getActiveDoctors(locale),
    getActiveSpecialties(locale),
    getSiteSettings(),
    getActiveInsuranceLogos(),
  ])

  return (
    <main>
      <Navigation logoUrl={settings.logo_url} />
      {/* Orden según diagrama de arquitectura del sitio */}
      <TopSlideshow
        slides={[
          settings.top_slide_1,
          settings.top_slide_2,
          settings.top_slide_3,
          settings.top_slide_4,
          settings.top_slide_5,
          settings.top_slide_6,
          settings.top_slide_7,
          settings.top_slide_8,
          settings.top_slide_9,
          settings.top_slide_10,
        ]}
      />
      <Hero imageSrc={settings.hero_image_url} />
      <Services bannerSrc={settings.services_banner_url} serviceImages={settings} />
      <Doctors doctors={doctors} specialties={specialties} />
      <Gallery
        videoUrl={settings.gallery_video_url}
        items={[
          { url: settings.gallery_1_url, fallback: '/img/fachada.jpg', label: galleryLabels.facade, href: '/nosotros' },
          { url: settings.gallery_2_url, fallback: '/img/habitacion.jpg', label: galleryLabels.room, href: '/servicios/hospitalizacion' },
          { url: settings.gallery_3_url, fallback: '/img/quirofano.jpg', label: galleryLabels.surgery, href: '/servicios/quirofano' },
          { url: settings.gallery_4_url, fallback: '/img/laboratorio.jpg', label: galleryLabels.lab, href: '/servicios/laboratorio' },
          { url: settings.gallery_5_url, fallback: '/img/imagenes.jpg', label: galleryLabels.imaging, href: '/servicios/centro-imagenes' },
        ]}
      />
      <Contact
        mapEmbedUrl={settings.map_embed_url}
        mapAddress={settings.map_address}
        socials={settings}
      />
      <Testimonials />
      <EmergencyCTA />
      <About
        slides={[
          settings.about_slide_1,
          settings.about_slide_2,
          settings.about_slide_3,
          settings.about_slide_4,
          settings.about_slide_5,
        ]}
      />
      <InsurancePartners logos={insuranceLogos} />
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
