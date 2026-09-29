-- ====================================================
-- Clínica Latino — Nota adicional de horario por médico
-- Texto libre para casos que no encajan en los bloques
-- estructurados (ej. "Sábados y domingos bajo cita previa").
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

alter table public.doctors
  add column if not exists schedule_note text;
