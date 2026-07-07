-- ====================================================
-- Clínica Latino — Slideshow superior: slots 6-10
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

insert into public.site_settings (key, value) values
  ('top_slide_6', null),
  ('top_slide_7', null),
  ('top_slide_8', null),
  ('top_slide_9', null),
  ('top_slide_10', null)
on conflict (key) do nothing;
