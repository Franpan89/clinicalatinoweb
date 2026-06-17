import { getSiteSettings } from '@/lib/data/settings'
import { SERVICES } from '@/lib/services'
import MediaUploader from './_components/MediaUploader'

export const dynamic = 'force-dynamic'

export default async function MediosPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          Medios del sitio
        </h1>
        <p className="font-lato text-brand-gray">
          Sube y gestiona las imágenes y videos del sitio público. Si no subes nada, se
          muestra el placeholder local con el gradiente de marca.
        </p>
      </div>

      {/* ── IDENTIDAD VISUAL ────────────────────────────── */}
      <SectionHeader
        title="Identidad visual"
        subtitle="Logo de la marca que aparece en el header, footer y panel admin."
      />
      <div className="mb-12">
        <MediaUploader
          mediaKey="logo_url"
          label="Logo oficial Clínica Latino"
          description="Aparece en la navegación superior, el footer y este panel de administración. Idealmente SVG o PNG con fondo transparente."
          currentUrl={settings.logo_url}
          recommendedSize="Cuadrado · ej. 240×240px · SVG o PNG transparente"
          previewRatio="1/1"
          accept="image/svg+xml,image/png,image/webp"
        />
      </div>

      {/* ── SLIDESHOW SUPERIOR ──────────────────────────── */}
      <SectionHeader
        title="Slideshow superior (Inicio)"
        subtitle="Banner full-width en el tope del home. Hasta 5 slides (imágenes y/o videos) que rotan automáticamente. Si dejas todos vacíos, el banner no aparece."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {[1, 2, 3, 4, 5].map((n) => (
          <MediaUploader
            key={`top_slide_${n}`}
            mediaKey={`top_slide_${n}`}
            label={`Slide ${n}`}
            description={n === 1 ? 'Primer slide' : 'Opcional'}
            currentUrl={settings[`top_slide_${n}`]}
            recommendedSize="1920×500px (panorámico) · img o video"
            previewRatio="42/11"
            mediaType={inferMediaType(settings[`top_slide_${n}`])}
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            allowExternalUrl
          />
        ))}
      </div>

      {/* ── HOME ────────────────────────────────────────── */}
      <SectionHeader title="Página de Inicio" subtitle="Banners principales del home" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
        <MediaUploader
          mediaKey="hero_image_url"
          label="Hero — imagen principal"
          description="Aparece en el lado derecho del banner principal. Idealmente PNG con fondo transparente."
          currentUrl={settings.hero_image_url}
          recommendedSize="875×630px · PNG"
          previewRatio="875/630"
          accept="image/png,image/webp,image/jpeg"
        />
        <MediaUploader
          mediaKey="services_banner_url"
          label="Banner de Servicios"
          description="Banner ancho en la sección Servicios del home."
          currentUrl={settings.services_banner_url}
          recommendedSize="2400×600px"
          previewRatio="4/1"
          accept="image/jpeg,image/png,image/webp"
        />
      </div>

      {/* ── QUIÉNES SOMOS (slideshow) ─────────────────────── */}
      <SectionHeader
        title="Quiénes Somos — Slideshow"
        subtitle="Hasta 5 slides que rotan automáticamente. Mezcla imágenes y videos: las imágenes duran ~5s, los videos MP4 se reproducen completos, los embeds 15s. Deja vacíos los que no uses."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {[1, 2, 3, 4, 5].map((n) => (
          <MediaUploader
            key={`about_slide_${n}`}
            mediaKey={`about_slide_${n}`}
            label={`Slide ${n}`}
            description={n === 1 ? 'Primer slide (imagen o video)' : 'Opcional'}
            currentUrl={settings[`about_slide_${n}`]}
            recommendedSize="MP4 o imagen · 1200×900px"
            previewRatio="4/3"
            mediaType={inferMediaType(settings[`about_slide_${n}`])}
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            allowExternalUrl
          />
        ))}
      </div>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <SectionHeader
        title="Galería de Instalaciones"
        subtitle="Video institucional + 5 imágenes que aparecen en la sección Infraestructura."
      />
      <div className="mb-5">
        <MediaUploader
          mediaKey="gallery_video_url"
          label="Video institucional (grande)"
          description="Aparece en el slot grande de la galería. Sube MP4 o pega URL embed de YouTube/Vimeo."
          currentUrl={settings.gallery_video_url}
          recommendedSize="MP4 1920×1080 · o YouTube embed"
          previewRatio="16/9"
          mediaType="video"
          accept="video/mp4,video/webm"
          allowExternalUrl
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {[
          { key: 'gallery_1_url', label: 'Fachada principal' },
          { key: 'gallery_2_url', label: 'Habitación hospitalaria' },
          { key: 'gallery_3_url', label: 'Quirófano' },
          { key: 'gallery_4_url', label: 'Laboratorio' },
          { key: 'gallery_5_url', label: 'Centro de imágenes' },
        ].map((g) => (
          <MediaUploader
            key={g.key}
            mediaKey={g.key}
            label={g.label}
            currentUrl={settings[g.key]}
            recommendedSize="800×600px"
            previewRatio="4/3"
            accept="image/jpeg,image/png,image/webp"
          />
        ))}
      </div>

      {/* ── LANDINGS DE SERVICIOS ─────────────────────────── */}
      <SectionHeader
        title="Landings de Servicios"
        subtitle="Imagen vertical de cada servicio que aparece en /servicios/[slug]."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <MediaUploader
            key={s.slug}
            mediaKey={`service_image_${s.slug}`}
            label={s.title}
            description={s.tag}
            currentUrl={settings[`service_image_${s.slug}`]}
            recommendedSize="900×1200px (vertical)"
            previewRatio="3/4"
            accept="image/jpeg,image/png,image/webp"
          />
        ))}
      </div>
    </div>
  )
}

function inferMediaType(url: string | null | undefined): 'image' | 'video' {
  if (!url) return 'image'
  if (/\.(mp4|webm|mov|ogg)$/i.test(url)) return 'video'
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(url)) return 'video'
  return 'image'
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5 pb-3 border-b border-brand-surface">
      <h2 className="font-lato text-brand-dark text-xl font-bold">{title}</h2>
      {subtitle && (
        <p className="font-lato text-brand-gray text-sm mt-1">{subtitle}</p>
      )}
    </div>
  )
}
