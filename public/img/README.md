# Imágenes públicas del sitio

Esta carpeta contiene las imágenes estáticas del sitio público. Cualquier archivo
aquí se sirve desde `/img/...`.

## Archivos esperados

| Archivo | Tamaño | Uso | Notas |
|---|---|---|---|
| `hero-banner.png` | 900×1100 px | Imagen principal del Hero (columna derecha) | PNG con fondo transparente preferido |
| `equipo-clinica.jpg` | 1200×900 px | Sección "Quiénes Somos" | JPG · enfoque natural |
| `banner-servicios.jpg` | 2400×600 px | Banner sección Servicios | JPG · paisaje amplio |
| `fachada.jpg` | 1600×900 px | Galería · fachada principal | — |
| `habitacion.jpg` | 800×600 px | Galería · habitación hospitalaria | — |
| `quirofano.jpg` | 800×600 px | Galería · quirófano | — |
| `imagenes.jpg` | 800×600 px | Galería · centro de imágenes | — |
| `laboratorio.jpg` | 800×600 px | Galería · laboratorio | — |
| `mapa-ubicacion.jpg` | 800×400 px | Contacto · mapa / ubicación | — |
| `emergencia-bg.jpg` | 2400×800 px | Fondo del CTA de emergencia | — |

## Cómo "activar" una imagen

Cada componente tiene una variable `*_SRC` en la parte superior del archivo o un
prop `src` en el `<PlaceholderImage>`. Para mostrar tu imagen real:

1. Guarda el archivo aquí con el nombre exacto de la tabla (ej. `hero-banner.png`)
2. Edita el componente correspondiente (ej. `components/Hero.tsx`) y cambia
   `const HERO_IMAGE_SRC = null` por `const HERO_IMAGE_SRC = '/img/hero-banner.png'`
3. Listo — el placeholder desaparece y aparece tu imagen.

> **Nota:** Vercel cachea las imágenes agresivamente. Si actualizas una imagen
> con el mismo nombre, agrégale `?v=2` al final del path o renómbrala para forzar
> recarga.
