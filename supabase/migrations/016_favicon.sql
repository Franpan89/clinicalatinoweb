-- ====================================================
-- Clínica Latino — Favicon del sitio
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

insert into public.site_settings (key, value) values
  ('favicon_url', null)
on conflict (key) do nothing;
