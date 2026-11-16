-- ====================================================
-- Clínica Latino — Título, nombres y apellidos separados en la ficha del médico
-- Permite ordenar el listado por primer apellido sin adivinar dónde termina
-- el nombre y empieza el apellido. full_name se mantiene (el admin lo arma
-- como "título + nombres + apellidos") para que el resto del sitio no cambie.
-- Las columnas son opcionales: mientras un médico no tenga last_names, el
-- orden usa una estimación a partir de full_name.
-- Ejecutar DESPUÉS de 019_bilingual_content.sql.
-- No requiere cambios de RLS: las políticas actuales son por fila.
-- ====================================================

alter table public.doctors
  add column if not exists title text,
  add column if not exists first_names text,
  add column if not exists last_names text;
