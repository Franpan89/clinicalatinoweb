-- ====================================================
-- Clínica Latino — Redes sociales del médico
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

alter table public.doctors
  add column if not exists facebook_url text,
  add column if not exists instagram_url text,
  add column if not exists linkedin_url text,
  add column if not exists whatsapp_url text;

-- Sin defaults — son opcionales. La UI muestra solo los iconos de las redes que están llenas.
