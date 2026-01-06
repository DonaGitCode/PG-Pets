# Registro de Vacunas - Documentación

## Descripción
El sistema ahora permite almacenar y descargar el registro de vacunación de cada mascota certificada.

## Cambios en la Base de Datos

### Campo Agregado
Se agregó el campo `vaccination_record_url` a la tabla `certifications`:

```sql
vaccination_record_url TEXT, -- URL del documento PDF con el registro de vacunas
```

### Actualización del Schema
El archivo `supabase-schema.sql` ha sido actualizado. Para aplicar los cambios en Supabase:

1. **Opción A - Supabase Dashboard:**
   - Ve a tu proyecto en Supabase
   - Navega a SQL Editor
   - Ejecuta el siguiente comando:
   ```sql
   ALTER TABLE certifications 
   ADD COLUMN vaccination_record_url TEXT;
   ```

2. **Opción B - Migración Completa:**
   - Si estás creando la tabla desde cero, usa el archivo `supabase-schema.sql` actualizado

## Cómo Subir Registros de Vacunas

### Método 1: Supabase Storage + URL Pública

1. **Crear Bucket de Storage:**
   ```sql
   -- En Supabase SQL Editor
   insert into storage.buckets (id, name, public)
   values ('vaccination-records', 'vaccination-records', true);
   ```

2. **Configurar Políticas:**
   ```sql
   -- Permitir lectura pública
   create policy "Public Access"
   on storage.objects for select
   using ( bucket_id = 'vaccination-records' );

   -- Permitir subida autenticada
   create policy "Authenticated Upload"
   on storage.objects for insert
   with check ( bucket_id = 'vaccination-records' AND auth.role() = 'authenticated' );
   ```

3. **Subir PDF via Dashboard:**
   - Ve a Storage en Supabase Dashboard
   - Selecciona el bucket `vaccination-records`
   - Sube el PDF (ej: `SG-BOG-2026-000123-vacunas.pdf`)
   - Copia la URL pública

4. **Actualizar Certificación:**
   ```sql
   UPDATE certifications 
   SET vaccination_record_url = 'https://[tu-proyecto].supabase.co/storage/v1/object/public/vaccination-records/SG-BOG-2026-000123-vacunas.pdf'
   WHERE cert_id = 'SG-BOG-2026-000123';
   ```

### Método 2: Servidor Externo

Si prefieres usar tu propio servidor:

```sql
UPDATE certifications 
SET vaccination_record_url = 'https://tuservidor.com/vacunas/mascota-123.pdf'
WHERE cert_id = 'SG-BOG-2026-000123';
```

### Método 3: API Programática

Ejemplo usando JavaScript/TypeScript:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Subir archivo
const file = event.target.files[0]
const fileName = `${certId}-vacunas.pdf`

const { data: uploadData, error: uploadError } = await supabase
  .storage
  .from('vaccination-records')
  .upload(fileName, file)

if (uploadError) {
  console.error('Error subiendo archivo:', uploadError)
  return
}

// Obtener URL pública
const { data: { publicUrl } } = supabase
  .storage
  .from('vaccination-records')
  .getPublicUrl(fileName)

// Actualizar certificación
const { error: updateError } = await supabase
  .from('certifications')
  .update({ vaccination_record_url: publicUrl })
  .eq('cert_id', certId)

if (updateError) {
  console.error('Error actualizando certificación:', updateError)
}
```

## Visualización en la Página de Verificación

Cuando un certificado tiene el campo `vaccination_record_url` poblado:

1. **Se muestra automáticamente** una sección de descarga con:
   - Icono de jeringa (Syringe)
   - Título "Registro de Vacunación"
   - Descripción del contenido
   - Botón de descarga en verde

2. **El botón de descarga:**
   - Descarga el PDF directamente
   - Nombre sugerido: `vacunas-[nombre-mascota]-[cert-id].pdf`
   - Abre en nueva pestaña si el navegador lo requiere

3. **Si NO hay URL:**
   - La sección no se muestra (condicional)
   - No afecta la visualización del resto del certificado

## Recomendaciones

### Seguridad
- ✅ Usa HTTPS siempre
- ✅ Valida que los archivos sean PDFs reales
- ✅ Limita el tamaño de archivo (recomendado: máximo 5MB)
- ✅ Escanea archivos en busca de virus antes de subirlos

### Nombres de Archivo
Formato recomendado:
```
[CERT_ID]-vacunas.pdf
Ejemplo: SG-BOG-2026-000123-vacunas.pdf
```

### Organización
- Crea subcarpetas por año: `/2026/`
- O por ciudad: `/bogota/`, `/medellin/`
- Ejemplo completo: `/vaccination-records/2026/bogota/SG-BOG-2026-000123-vacunas.pdf`

## Migración de Datos Existentes

Si tienes certificaciones existentes sin registro de vacunas:

```sql
-- Ver certificaciones sin registro de vacunas
SELECT cert_id, animal_name 
FROM certifications 
WHERE vaccination_record_url IS NULL;

-- Actualizar en lote (ejemplo)
UPDATE certifications 
SET vaccination_record_url = 
  'https://[tu-proyecto].supabase.co/storage/v1/object/public/vaccination-records/' || cert_id || '-vacunas.pdf'
WHERE vaccination_record_url IS NULL 
  AND EXISTS (
    -- Solo si el archivo existe en storage
    SELECT 1 FROM storage.objects 
    WHERE bucket_id = 'vaccination-records' 
    AND name = cert_id || '-vacunas.pdf'
  );
```

## Troubleshooting

### El botón no aparece
- ✅ Verifica que `vaccination_record_url` no sea NULL
- ✅ Revisa la consola del navegador por errores
- ✅ Confirma que el campo existe en la tabla

### El PDF no descarga
- ✅ Verifica que la URL sea accesible públicamente
- ✅ Revisa las políticas de CORS en Supabase Storage
- ✅ Confirma que el archivo existe en la ruta especificada

### Error de permisos
- ✅ Revisa las políticas del bucket en Supabase
- ✅ Asegúrate que el bucket sea público o tenga las políticas correctas
- ✅ Verifica la autenticación si es requerida

## Próximos Pasos (Opcional)

Para mejorar aún más el sistema:

1. **Panel de Administración:**
   - Crear interfaz para subir PDFs directamente desde la app
   - Vista previa del PDF antes de guardar
   - Historial de cambios en el registro

2. **Validaciones:**
   - Verificar que el archivo sea PDF válido
   - Escaneo de virus automático
   - Límite de tamaño

3. **Notificaciones:**
   - Email al tutor cuando se sube nuevo registro
   - Alertas de vencimiento de vacunas

4. **Versiones:**
   - Mantener historial de registros anteriores
   - Tabla separada para versiones de vacunas
