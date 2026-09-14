-- ====================================================
-- Clínica Latino — Modo mantenimiento
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

insert into public.site_settings (key, value) values
  ('maintenance_mode', 'false'),
  ('maintenance_message', null)
on conflict (key) do nothing;
