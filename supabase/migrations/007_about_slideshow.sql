-- ====================================================
-- Clínica Latino — Slideshow de "Quiénes Somos"
-- Hasta 5 slides (imágenes y/o videos) que rotan automáticamente.
-- Ejecutar DESPUÉS de 006_site_media.sql
-- ====================================================

insert into public.site_settings (key, value) values
  ('about_slide_1', null),
  ('about_slide_2', null),
  ('about_slide_3', null),
  ('about_slide_4', null),
  ('about_slide_5', null)
on conflict (key) do nothing;

-- Migra el valor existente de about_media_url al primer slide (si existe)
update public.site_settings s
set value = (select value from public.site_settings where key = 'about_media_url')
where s.key = 'about_slide_1'
  and s.value is null
  and (select value from public.site_settings where key = 'about_media_url') is not null;
