-- ====================================================
-- Clínica Latino — Slideshow banner full-width en el top del inicio
-- Hasta 5 slides (imágenes y/o videos). Ejecutar DESPUÉS de 007_about_slideshow.sql
-- ====================================================

insert into public.site_settings (key, value) values
  ('top_slide_1', null),
  ('top_slide_2', null),
  ('top_slide_3', null),
  ('top_slide_4', null),
  ('top_slide_5', null)
on conflict (key) do nothing;
