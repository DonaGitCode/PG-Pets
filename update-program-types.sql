-- =====================================================
-- ACTUALIZAR CHECK CONSTRAINT PARA PROGRAMA TYPES
-- Agregar 'Asistencia Psiquiátrica' a los tipos permitidos
-- =====================================================

-- Paso 1: Dropar la vista que depende de program_type
DROP VIEW IF EXISTS active_certifications CASCADE;

-- Paso 2: Crear columna temporal con la nueva restricción
ALTER TABLE certifications
ADD COLUMN program_type_new TEXT NOT NULL DEFAULT 'Apoyo Emocional' CHECK (program_type_new IN (
  'Apoyo Emocional',
  'Servicio',
  'Lazarillo (Guía)',
  'Alerta Médica',
  'Evaluación Conductual',
  'Asistencia Psiquiátrica'
));

-- Paso 3: Copiar datos de la columna antigua a la nueva
UPDATE certifications SET program_type_new = program_type;

-- Paso 4: Eliminar columna antigua
ALTER TABLE certifications DROP COLUMN program_type;

-- Paso 5: Renombrar columna nueva al nombre original
ALTER TABLE certifications RENAME COLUMN program_type_new TO program_type;

-- Paso 6: Recrear la vista (si existía)
-- Si necesitas recrear la vista, ejecuta esta línea después:
-- CREATE VIEW active_certifications AS 
-- SELECT * FROM certifications WHERE status = 'Vigente';

-- Verificación
SELECT DISTINCT program_type FROM certifications ORDER BY program_type;
