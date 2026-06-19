-- ====================================================
-- Clínica Latino — Redes sociales (footer)
-- Ejecutar DESPUÉS de 008_hero_slideshow.sql
-- ====================================================

insert into public.site_settings (key, value) values
  ('social_facebook', null),
  ('social_instagram', null),
  ('social_tiktok', null),
  ('social_youtube', null),
  ('social_whatsapp', null),
  ('social_x', null),
  ('social_linkedin', null)
on conflict (key) do nothing;
