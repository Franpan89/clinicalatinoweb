-- ====================================================
-- Clínica Latino — Analítica (Google Analytics / Meta Pixel)
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

insert into public.site_settings (key, value) values
  ('google_analytics_id', null),
  ('meta_pixel_id', null)
on conflict (key) do nothing;
