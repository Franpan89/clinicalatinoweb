-- ====================================================
-- Clínica Latino — Contenido bilingüe (ES/EN)
-- Agrega columnas *_en opcionales a las tablas con texto editable desde
-- el admin. El español sigue siendo la fuente principal: si una columna
-- *_en está vacía, el sitio público muestra el texto en español.
-- Ejecutar DESPUÉS de la última migración existente.
-- No requiere cambios de RLS: las políticas actuales son por fila.
-- ====================================================

-- Médicos (la especialidad se traduce en specialties.label_en)
alter table public.doctors
  add column if not exists subspecialty_en text,
  add column if not exists bio_en text,
  add column if not exists experience_en text,
  add column if not exists education_en text[] not null default '{}',
  add column if not exists schedule_note_en text;

-- Especialidades
alter table public.specialties
  add column if not exists label_en text,
  add column if not exists description_en text;

-- Noticias
alter table public.news
  add column if not exists title_en text,
  add column if not exists excerpt_en text,
  add column if not exists content_en text;

-- Paquetes
alter table public.packages
  add column if not exists title_en text,
  add column if not exists description_en text,
  add column if not exists price_en text,
  add column if not exists items_en text[] not null default '{}';
