-- =====================================================
-- ACTUALIZACIÓN DE BASE DE DATOS - STEADY GUARDIANS
-- Agregar campos de propietario a la tabla certifications
-- =====================================================

-- Agregar columnas de propietario
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS owner_name TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS owner_phone TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS owner_email TEXT;

-- Agregar columna de vacunas si no existe
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS vaccination_record_url TEXT;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD PARA SUPABASE STORAGE
-- Bucket: certifications
-- =====================================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can read files" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow update files" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete files" ON storage.objects;

-- Crear políticas nuevas
-- Permitir lectura pública (SELECT)
CREATE POLICY "Public can read files" ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'certifications');

-- Permitir subir archivos (INSERT)
CREATE POLICY "Allow upload files" ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'certifications');

-- Permitir actualizar archivos (UPDATE)
CREATE POLICY "Allow update files" ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'certifications')
WITH CHECK (bucket_id = 'certifications');

-- Permitir eliminar archivos (DELETE)
CREATE POLICY "Allow delete files" ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'certifications');
