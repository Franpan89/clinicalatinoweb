import type { Locale } from './config'
import type { Doctor, News, PackageItem, Specialty } from '@/lib/types'

/*
 * Contenido editable desde el admin: el español vive en las columnas originales
 * y la versión en inglés en columnas `*_en` opcionales. Estas funciones devuelven
 * la fila con los campos ya resueltos para el idioma pedido; si el campo en inglés
 * está vacío (o la columna aún no existe en la BD) se queda con el español.
 */

function text(es: string, en: string | null | undefined): string {
  return en && en.trim() ? en : es
}

function list(es: string[], en: string[] | null | undefined): string[] {
  return en && en.length > 0 ? en : es
}

/** `specialtyLabels`: slug de especialidad → label en inglés (specialties.label_en). */
export function localizeDoctor(
  doctor: Doctor,
  locale: Locale,
  specialtyLabels: Record<string, string> = {}
): Doctor {
  if (locale === 'es') return doctor
  return {
    ...doctor,
    specialty_label: specialtyLabels[doctor.specialty] ?? doctor.specialty_label,
    subspecialty: text(doctor.subspecialty, doctor.subspecialty_en),
    bio: text(doctor.bio, doctor.bio_en),
    experience: text(doctor.experience, doctor.experience_en),
    education: list(doctor.education, doctor.education_en),
    schedule_note: doctor.schedule_note_en?.trim() ? doctor.schedule_note_en : doctor.schedule_note,
  }
}

export function localizeSpecialty(specialty: Specialty, locale: Locale): Specialty {
  if (locale === 'es') return specialty
  return {
    ...specialty,
    label: text(specialty.label, specialty.label_en),
    description: text(specialty.description, specialty.description_en),
  }
}

export function localizeNews(news: News, locale: Locale): News {
  if (locale === 'es') return news
  return {
    ...news,
    title: text(news.title, news.title_en),
    excerpt: text(news.excerpt, news.excerpt_en),
    content: text(news.content, news.content_en),
  }
}

export function localizePackage(pkg: PackageItem, locale: Locale): PackageItem {
  if (locale === 'es') return pkg
  return {
    ...pkg,
    title: text(pkg.title, pkg.title_en),
    description: text(pkg.description, pkg.description_en),
    price: text(pkg.price, pkg.price_en),
    items: list(pkg.items, pkg.items_en),
  }
}
