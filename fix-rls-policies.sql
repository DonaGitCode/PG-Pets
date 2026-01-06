-- =====================================================
-- POLÍTICAS RLS PARA TABLA CERTIFICATIONS
-- Permitir operaciones CRUD públicas
-- =====================================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Enable read access for all users" ON certifications;
DROP POLICY IF EXISTS "Enable insert for all users" ON certifications;
DROP POLICY IF EXISTS "Enable update for all users" ON certifications;
DROP POLICY IF EXISTS "Enable delete for all users" ON certifications;

-- Crear políticas públicas para todas las operaciones
-- SELECT (leer)
CREATE POLICY "Enable read access for all users" ON certifications
FOR SELECT
TO public
USING (true);

-- INSERT (crear)
CREATE POLICY "Enable insert for all users" ON certifications
FOR INSERT
TO public
WITH CHECK (true);

-- UPDATE (actualizar)
CREATE POLICY "Enable update for all users" ON certifications
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- DELETE (eliminar)
CREATE POLICY "Enable delete for all users" ON certifications
FOR DELETE
TO public
USING (true);
