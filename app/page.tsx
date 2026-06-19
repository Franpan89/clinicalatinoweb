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
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import { getActiveSpecialties } from '@/lib/data/specialties'
import { getSiteSettings } from '@/lib/data/settings'
import type { Doctor } from '@/lib/types'

export const revalidate = 60

async function getDoctors(): Promise<Doctor[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
    if (error) {
      console.error('Error fetching doctors:', error)
      return []
    }
    return data ?? []
  } catch (e) {
    console.error('Supabase fetch failed:', e)
    return []
  }
}

export default async function Home() {
  const [doctors, specialties, settings] = await Promise.all([
    getDoctors(),
    getActiveSpecialties(),
    getSiteSettings(),
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
        ]}
      />
      <Hero imageSrc={settings.hero_image_url} />
      <Services bannerSrc={settings.services_banner_url} />
      <Doctors doctors={doctors} specialties={specialties} />
      <Gallery
        videoUrl={settings.gallery_video_url}
        videoHref="/nosotros"
        items={[
          { url: settings.gallery_1_url, fallback: '/img/fachada.jpg', label: 'Fachada principal', href: '/nosotros' },
          { url: settings.gallery_2_url, fallback: '/img/habitacion.jpg', label: 'Habitación hospitalaria', href: '/servicios/hospitalizacion' },
          { url: settings.gallery_3_url, fallback: '/img/quirofano.jpg', label: 'Quirófano', href: '/servicios/quirofano' },
          { url: settings.gallery_4_url, fallback: '/img/laboratorio.jpg', label: 'Laboratorio', href: '/servicios/laboratorio' },
          { url: settings.gallery_5_url, fallback: '/img/imagenes.jpg', label: 'Centro de imágenes', href: '/servicios/centro-imagenes' },
        ]}
      />
      <Contact
        mapEmbedUrl={settings.map_embed_url}
        mapAddress={settings.map_address}
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
      <Footer logoUrl={settings.logo_url} socials={settings} />
    </main>
  )
}
