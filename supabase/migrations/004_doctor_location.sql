-- ====================================================
-- Clínica Latino — Ubicación física y contacto del médico
-- Ejecutar DESPUÉS de 003_specialties_and_schedule.sql
-- ====================================================

alter table public.doctors
  add column if not exists office_number text,
  add column if not exists tower text,
  add column if not exists contact_phone text;

-- Sin defaults — son opcionales. La UI muestra solo los que están llenos.

-- Backfill de ejemplo (puedes ajustar/eliminar)
-- update public.doctors set tower = 'Torre A', office_number = '301'
--   where slug = 'eduardo-vasquez';
