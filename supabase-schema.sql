-- =====================================================
-- STEADY GUARDIANS - SUPABASE DATABASE SCHEMA
-- Sistema de Certificación de Entrenamiento Canino
-- =====================================================

-- Eliminar tabla si existe (solo para desarrollo)
-- DROP TABLE IF EXISTS certifications CASCADE;

-- =====================================================
-- TABLA PRINCIPAL: certifications
-- =====================================================

CREATE TABLE IF NOT EXISTS certifications (
  -- Identificadores
  id BIGSERIAL PRIMARY KEY,
  cert_id TEXT UNIQUE NOT NULL,
  
  -- Información del entrenamiento
  status TEXT NOT NULL DEFAULT 'Vigente' CHECK (status IN ('Vigente', 'Condicional', 'Vencido', 'Revocado')),
  animal_type TEXT NOT NULL DEFAULT 'Perro',
  animal_name TEXT NOT NULL,
  animal_photo TEXT,
  program_type TEXT NOT NULL CHECK (program_type IN (
    'Apoyo Emocional',
    'Servicio',
    'Lazarillo (Guía)',
    'Alerta Médica',
    'Evaluación Conductual'
  )),
  
  -- Información del entrenador
  trainer_name TEXT NOT NULL,
  verification_code TEXT UNIQUE NOT NULL,
  
  -- Fechas
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  
  -- Detalles
  scope TEXT,
  notes_private TEXT,
  
  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES para mejorar el rendimiento
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_cert_id ON certifications(cert_id);
CREATE INDEX IF NOT EXISTS idx_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_program_type ON certifications(program_type);
CREATE INDEX IF NOT EXISTS idx_issued_at ON certifications(issued_at DESC);
CREATE INDEX IF NOT EXISTS idx_valid_until ON certifications(valid_until);

-- =====================================================
-- FUNCIÓN: Actualizar timestamp automáticamente
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- TRIGGER: Actualizar updated_at en cada UPDATE
-- =====================================================

DROP TRIGGER IF EXISTS update_certifications_updated_at ON certifications;

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Eliminar policies existentes si existen
DROP POLICY IF EXISTS "Public can view active certifications" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can insert" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can update" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can delete" ON certifications;

-- Policy 1: Lectura pública (para verificación)
-- Cualquier persona puede consultar las certificaciones
CREATE POLICY "Public can view active certifications"
  ON certifications
  FOR SELECT
  USING (true);

-- Policy 2: Solo usuarios autenticados pueden insertar
CREATE POLICY "Authenticated users can insert"
  ON certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update"
  ON certifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete"
  ON certifications
  FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- COMENTARIOS en la tabla
-- =====================================================

COMMENT ON TABLE certifications IS 'Registros de entrenamiento y certificaciones emitidas por Steady Guardians';
COMMENT ON COLUMN certifications.cert_id IS 'Identificador único del formato SG-NAR-YYYY-XXXXXX';
COMMENT ON COLUMN certifications.status IS 'Estado actual: Vigente, Condicional, Vencido, Revocado';
COMMENT ON COLUMN certifications.program_type IS 'Tipo de programa de entrenamiento completado';
COMMENT ON COLUMN certifications.scope IS 'Descripción del alcance y capacidades del entrenamiento';
COMMENT ON COLUMN certifications.notes_private IS 'Notas privadas solo visibles para administradores';

-- =====================================================
-- DATOS DE EJEMPLO (SEED)
-- =====================================================

-- Eliminar datos de ejemplo existentes (2025 y 2026)
DELETE FROM certifications WHERE cert_id LIKE 'SG-NAR-2026-%' OR cert_id LIKE 'SG-NAR-2025-%';

-- Insertar datos de ejemplo
INSERT INTO certifications (cert_id, status, animal_type, animal_name, animal_photo, program_type, trainer_name, verification_code, issued_at, valid_until, scope, notes_private) VALUES

-- Certificación 1: Apoyo Emocional Vigente
('SG-NAR-2026-000001', 
 'Vigente', 
 'Perro', 
 'Luna',
 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
 'Apoyo Emocional',
 'María González',
 'VER-2026-001',
 '2026-01-01 10:00:00-05', 
 '2027-01-01 10:00:00-05', 
 'El animal ha completado satisfactoriamente el programa de entrenamiento de apoyo emocional. Demuestra estabilidad emocional, rutinas de calma, manejo adecuado en espacios públicos y un vínculo sólido con el tutor. El entrenamiento incluye respuesta a señales de ansiedad y comportamiento calmado en diversas situaciones.',
 'Completó 120 horas de entrenamiento. Evaluación final: Excelente.'),

-- Certificación 2: Servicio Vigente
('SG-NAR-2026-000002', 
 'Vigente', 
 'Perro',
 'Max',
 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop',
 'Servicio',
 'Carlos Rodríguez',
 'VER-2026-002',
 '2026-01-05 14:30:00-05', 
 '2027-01-05 14:30:00-05', 
 'El animal ha sido entrenado como perro de servicio con obediencia avanzada, capacidad de acceso público responsable, control bajo estímulos intensos y asistencia funcional específica al tutor. Entrenamiento especializado en tareas de movilidad y recuperación de objetos.',
 'Completó 200 horas de entrenamiento especializado. Certificado en tareas de asistencia física.'),

-- Certificación 3: Lazarillo Vigente
('SG-NAR-2026-000003', 
 'Vigente', 
 'Perro',
 'Bella',
 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
 'Lazarillo (Guía)',
 'Ana Martínez',
 'VER-2026-003',
 '2026-01-10 09:00:00-05', 
 '2027-01-10 09:00:00-05', 
 'El animal ha completado el programa intensivo de entrenamiento como perro guía. Capacitado para guiado seguro, detección y detención ante riesgos, navegación urbana compleja, enfoque continuo y disciplina excepcional. Certificado para asistir a personas con discapacidad visual.',
 'Completó 300 horas de entrenamiento. Evaluación de movilidad urbana: Sobresaliente.'),

-- Certificación 4: Alerta Médica Vigente
('SG-NAR-2026-000004', 
 'Vigente', 
 'Perro',
 'Rocky',
 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
 'Alerta Médica',
 'Pedro Sánchez',
 'VER-2026-004',
 '2026-01-15 11:00:00-05', 
 '2027-01-15 11:00:00-05', 
 'El animal ha sido entrenado para detectar y alertar crisis epilépticas. Demuestra respuesta entrenada y consistente ante síntomas específicos del tutor, incluyendo alertas tempranas y comportamiento de asistencia post-crisis. Entrenamiento especializado en reconocimiento de patrones fisiológicos.',
 'Completó 180 horas de entrenamiento médico especializado. Tasa de alerta: 95%.'),

-- Certificación 5: Alerta de Diabetes Vigente
('SG-NAR-2026-000005', 
 'Vigente', 
 'Perro',
 'Coco',
 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=400&fit=crop',
 'Alerta Médica',
 'Laura Fernández',
 'VER-2026-005',
 '2026-01-20 15:45:00-05', 
 '2027-01-20 15:45:00-05', 
 'El animal ha completado el programa de entrenamiento para alerta de hipoglucemia y diabetes. Capacitado para detectar cambios en niveles de glucosa y alertar al tutor antes de episodios críticos. Respuesta entrenada incluye búsqueda de ayuda en emergencias.',
 'Completó 160 horas de entrenamiento. Especialización en detección olfativa de hipoglucemia.'),

-- Certificación 6: Condicional (en reentrenamiento)
('SG-NAR-2026-000006', 
 'Condicional', 
 'Perro',
 'Toby',
 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop',
 'Servicio',
 'Jorge López',
 'VER-2026-006',
 '2025-12-01 10:00:00-05', 
 '2026-12-01 10:00:00-05', 
 'El animal completó el programa de servicio pero requiere sesiones de refuerzo en control de impulsos en entornos con alta densidad de personas. Actualmente en programa de reentrenamiento para mantener certificación.',
 'En reentrenamiento. Próxima evaluación: 2026-02-01.'),

-- Certificación 7: Vencida
('SG-NAR-2025-000007', 
 'Vencido', 
 'Perro',
 'Nina',
 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
 'Apoyo Emocional',
 'Sofía Ramírez',
 'VER-2025-007',
 '2025-01-01 10:00:00-05', 
 '2026-01-01 10:00:00-05', 
 'Certificación vencida. El animal completó el programa de apoyo emocional en 2025. Requiere evaluación de reentrenamiento y actualización para renovar certificación.',
 'Certificación expirada. Contactar para renovación.'),

-- Certificación 8: Evaluación Conductual
('SG-NAR-2026-000008', 
 'Vigente', 
 'Perro',
 'Simba',
 'https://images.unsplash.com/photo-1600804889194-e6fbab1da8b9?w=400&h=400&fit=crop',
 'Evaluación Conductual',
 'Miguel Torres',
 'VER-2026-008',
 '2026-01-25 13:00:00-05', 
 '2026-07-25 13:00:00-05', 
 'Evaluación conductual profesional completada. El animal demuestra aptitudes para programas de servicio. Se recomienda iniciar entrenamiento formal en programa de Servicio. Informe técnico completo disponible.',
 'Evaluación inicial. Recomendación: Programa de Servicio. Temperamento: Estable y receptivo.'),

-- Certificación 9: Revocada (ejemplo de gestión)
('SG-NAR-2025-000009', 
 'Revocado', 
 'Perro',
 'Duke',
 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=400&h=400&fit=crop',
 'Servicio',
 'Patricia Díaz',
 'VER-2025-009',
 '2025-06-01 10:00:00-05', 
 '2026-06-01 10:00:00-05', 
 'Certificación revocada por solicitud del tutor debido a cambio de circunstancias personales. El entrenamiento fue completado satisfactoriamente.',
 'Revocada por solicitud del tutor. Sin problemas de comportamiento.'),

-- Certificación 10: Alerta de Ansiedad
('SG-NAR-2026-000010', 
 'Vigente', 
 'Perro',
 'Chispita',
 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=crop',
 'Alerta Médica',
 'Roberto Vargas',
 'VER-2026-010',
 '2026-01-28 16:00:00-05', 
 '2027-01-28 16:00:00-05', 
 'El animal ha sido entrenado para detectar y alertar episodios de ansiedad y pánico. Respuesta entrenada incluye presión táctil profunda (DPT), interrupción de comportamientos autodestructivos y búsqueda de ambiente seguro. Certificado para asistencia en trastornos de ansiedad.',
 'Completó 150 horas de entrenamiento. Especialización en respuesta a crisis de ansiedad.');

-- =====================================================
-- FUNCIÓN: Generar próximo ID de certificación
-- =====================================================

CREATE OR REPLACE FUNCTION generate_next_cert_id()
RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  current_year TEXT;
  new_id TEXT;
BEGIN
  current_year := TO_CHAR(NOW(), 'YYYY');
  
  -- Obtener el último número del año actual
  SELECT COALESCE(
    MAX(
      CAST(
        SUBSTRING(cert_id FROM 'SG-NAR-' || current_year || '-(\d{6})') 
        AS INTEGER
      )
    ), 
    0
  ) + 1 INTO next_number
  FROM certifications
  WHERE cert_id LIKE 'SG-NAR-' || current_year || '-%';
  
  -- Formatear el ID
  new_id := 'SG-NAR-' || current_year || '-' || LPAD(next_number::TEXT, 6, '0');
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso: SELECT generate_next_cert_id();

-- =====================================================
-- VISTA: Certificaciones activas (opcional)
-- =====================================================

CREATE OR REPLACE VIEW active_certifications AS
SELECT 
  cert_id,
  status,
  animal_type,
  program_type,
  issued_at,
  valid_until,
  scope,
  CASE 
    WHEN valid_until < NOW() THEN 'Expirado'
    WHEN status = 'Vigente' AND valid_until > NOW() THEN 'Activo'
    ELSE status
  END as computed_status
FROM certifications
WHERE status IN ('Vigente', 'Condicional')
  AND (valid_until IS NULL OR valid_until > NOW());

-- =====================================================
-- FIN DEL SCHEMA
-- =====================================================

-- Verificar la instalación
SELECT 
  'Instalación completada exitosamente' as mensaje,
  COUNT(*) as total_certificaciones,
  COUNT(*) FILTER (WHERE status = 'Vigente') as vigentes,
  COUNT(*) FILTER (WHERE status = 'Vencido') as vencidas,
  COUNT(*) FILTER (WHERE status = 'Condicional') as condicionales,
  COUNT(*) FILTER (WHERE status = 'Revocado') as revocadas
FROM certifications;
