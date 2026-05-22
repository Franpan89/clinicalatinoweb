# Clínica Latino — Análisis de Marca Aplicado

> Fuente: Logo oficial (vertical + horizontal) + instrucción explícita sobre tipografía.
> El PDF del Manual de Imagen (27MB) no se pudo extraer programáticamente — los valores
> derivan del análisis visual del logo. Si el manual tiene HEX/Pantone exactos diferentes,
> ajustar los tokens en `tailwind.config.ts` y `app/globals.css`.

## Paleta oficial (gradiente del logo)

| Token            | HEX        | Uso                                              |
|------------------|------------|--------------------------------------------------|
| `brand-green`    | `#A4D65E`  | Inicio del gradiente · acentos frescos           |
| `brand-teal`     | `#2BB3B2`  | Color medio · acento principal                   |
| `brand-blue`     | `#2C6FB1`  | Fin del gradiente · CTAs · enlaces               |
| `brand-gray`     | `#6E7F8E`  | Texto secundario, tipografía del logo            |
| `brand-dark`     | `#1A3B5C`  | Texto principal · headers oscuros · alto contraste |
| `brand-surface`  | `#F4F6F8`  | Fondos suaves                                    |

## Gradiente firma

```css
linear-gradient(135deg, #A4D65E 0%, #2BB3B2 50%, #2C6FB1 100%)
```

Aplicar en: logo, CTA primario del Hero, líneas decorativas, badges destacados.

## Tipografía

**Lato** (Google Fonts) en variables:
- Thin 100 · Light 300 · Regular 400 · Bold 700 · Black 900
- Itálicas disponibles para 100, 300, 400, 700, 900

Reemplaza Cormorant Garamond + Outfit. Una sola familia tipográfica para todo el sistema
crea coherencia con la sobriedad clínica de la marca.

## Logo

- **Vertical**: `public/logo.svg` — para headers cuadrados, mobile, redes sociales
- **Horizontal**: `public/logo-horizontal.svg` — para navegación, firmas, header desktop

La SVG actual es una **aproximación basada en análisis visual**. Reemplazar con el archivo
oficial vectorial (preferentemente del manual) para precisión absoluta.

## Aplicación al sitio

1. Navy oscuro → `brand-dark` (`#1A3B5C`)
2. Oro → `brand-teal` (`#2BB3B2`) como acento principal
3. Crema → `brand-surface` (`#F4F6F8`) fondos suaves
4. Cormorant Garamond + Outfit → **Lato** (peso variable)
5. Líneas decorativas doradas → gradiente verde→teal→azul
6. Monograma "CL" placeholder → SVG del logo oficial
