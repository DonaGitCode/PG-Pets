# 📦 GUÍA DE SUBIDA DE ARCHIVOS - STEADY GUARDIANS

## Fecha: Enero 5, 2026

---

## 📋 Opciones para Subir Archivos

### Opción 1: Supabase Storage (Recomendado) ⭐

**Ventajas:**
- Integrado con tu base de datos
- URLs permanentes y seguras
- Control total sobre los archivos
- Sin límites de almacenamiento (plan incluido)

**Pasos para configurar:**

1. **Accede a Supabase Dashboard:**
   ```
   https://app.supabase.com/project/uftrftsdmrejevcqhrck/storage/buckets
   ```

2. **Crea un Bucket Público:**
   - Click en "New bucket"
   - Nombre: `certifications`
   - Marca como "Public bucket" ✓
   - Click en "Create bucket"

3. **Configura Políticas de Acceso:**
   - Ve a "Policies" en el bucket
   - Click en "New policy"
   - **IMPORTANTE:** Crea 4 políticas diferentes:

   **Política 1 - Lectura Pública:**
   - Policy name: `Public can read files`
   - Allowed operation: `SELECT`
   - Target roles: `public`
   - Policy definition: `bucket_id = 'certifications'`
   
   **Política 2 - Subir Archivos:**
   - Policy name: `Allow upload files`
   - Allowed operation: `INSERT`
   - Target roles: `public`
   - Policy definition: `bucket_id = 'certifications'`
   
   **Política 3 - Actualizar Archivos:**
   - Policy name: `Allow update files`
   - Allowed operation: `UPDATE`
   - Target roles: `public`
   - Policy definition: `bucket_id = 'certifications'`
   
   **Política 4 - Eliminar Archivos:**
   - Policy name: `Allow delete files`
   - Allowed operation: `DELETE`
   - Target roles: `public`
   - Policy definition: `bucket_id = 'certifications'`

   **O ejecuta este SQL en "SQL Editor":**
   ```sql
   -- Permitir lectura pública
   CREATE POLICY "Public can read files" ON storage.objects
   FOR SELECT TO public
   USING (bucket_id = 'certifications');

   -- Permitir subir archivos
   CREATE POLICY "Allow upload files" ON storage.objects
   FOR INSERT TO public
   WITH CHECK (bucket_id = 'certifications');

   -- Permitir actualizar archivos
   CREATE POLICY "Allow update files" ON storage.objects
   FOR UPDATE TO public
   USING (bucket_id = 'certifications')
   WITH CHECK (bucket_id = 'certifications');

   -- Permitir eliminar archivos
   CREATE POLICY "Allow delete files" ON storage.objects
   FOR DELETE TO public
   USING (bucket_id = 'certifications');
   ```

4. **Subir Archivos:**
   - Click en el bucket `certifications`
   - Click "Upload file"
   - Selecciona tu imagen o PDF
   - Después de subir, click en el archivo
   - Copia la "Public URL"
   - Pega esa URL en el formulario del panel admin

**Estructura recomendada de carpetas:**
```
certifications/
├── photos/
│   ├── SG-BOG-2026-000001.jpg
│   ├── SG-BOG-2026-000002.jpg
│   └── ...
└── vaccines/
    ├── SG-BOG-2026-000001.pdf
    ├── SG-BOG-2026-000002.pdf
    └── ...
```

---

### Opción 2: Servicios de Terceros

#### Para Imágenes:

**Imgur** (Recomendado para imágenes)
- URL: https://imgur.com/upload
- Proceso:
  1. Arrastra la imagen
  2. Espera que suba
  3. Click derecho en la imagen → "Copiar dirección de imagen"
  4. Pega en el campo "Foto del Animal"

**ImgBB**
- URL: https://imgbb.com/
- Similar a Imgur
- Click en "Start uploading"
- Copia la "Direct link"

#### Para PDFs:

**Google Drive**
- URL: https://drive.google.com
- Proceso:
  1. Sube el PDF
  2. Click derecho → "Obtener enlace"
  3. Cambiar a "Cualquier persona con el enlace"
  4. Copiar enlace
  5. IMPORTANTE: Modificar el enlace:
     - De: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
     - A: `https://drive.google.com/uc?export=download&id=FILE_ID`

**Dropbox**
- URL: https://www.dropbox.com/upload
- Proceso:
  1. Sube el PDF
  2. Click en "Compartir"
  3. Crear enlace
  4. Copiar enlace
  5. Cambiar `?dl=0` por `?dl=1` al final

---

## 🔧 Futuras Mejoras Planificadas

### Subida Directa desde el Panel Admin

En una próxima versión se implementará:

1. **Botón "Subir Archivo"** directamente en el formulario
2. **Drag & Drop** para arrastrar archivos
3. **Preview** de imágenes antes de guardar
4. **Progress bar** durante la subida
5. **Validación automática** de formatos y tamaños

**Tecnología a usar:**
```typescript
import { createClient } from '@supabase/supabase-js'

// Subir imagen
const uploadImage = async (file: File, certId: string) => {
  const supabase = createClient(...)
  const fileName = `photos/${certId}.${file.name.split('.').pop()}`
  
  const { data, error } = await supabase.storage
    .from('certifications')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  
  // Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('certifications')
    .getPublicUrl(fileName)
  
  return publicUrl
}
```

---

## 📊 Límites y Recomendaciones

### Tamaños Recomendados:

**Fotos de Animales:**
- Formato: JPG, PNG
- Resolución: 800x800px mínimo
- Tamaño máximo: 2MB
- Relación de aspecto: Cuadrado (1:1) preferido

**PDFs de Vacunas:**
- Formato: PDF
- Tamaño máximo: 5MB
- Páginas: Máximo 10 páginas
- Calidad: Texto legible, no imágenes escaneadas borrosas

### Optimización de Imágenes:

Antes de subir, optimiza tus imágenes con:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

---

## 🔐 Seguridad y Privacidad

### URLs Públicas:
- Las URLs son públicas pero difíciles de adivinar
- Solo quien tenga el ID de certificación puede verificar
- Los archivos no se indexan en buscadores

### Datos Privados:
- NO subir información médica sensible en los PDFs
- Solo incluir datos de vacunación necesarios
- Considerar ofuscar datos personales del veterinario

### Backup:
- Supabase hace backups automáticos diarios
- Considera guardar copias locales de archivos importantes
- Exporta URLs periódicamente desde el panel admin

---

## 🛠️ Solución de Problemas

### La imagen no se muestra en el modal:
**Causa:** URL incorrecta o requiere autenticación
**Solución:** 
- Verifica que la URL termine en `.jpg`, `.png`, etc.
- Asegúrate de que sea la URL directa, no de vista previa
- Prueba la URL en una pestaña de incógnito

### El PDF no descarga:
**Causa:** URL de vista previa en lugar de descarga
**Solución:**
- Google Drive: Usa formato `https://drive.google.com/uc?export=download&id=FILE_ID`
- Dropbox: Cambia `?dl=0` a `?dl=1`
- Supabase: Copia la "Public URL" directamente

### Error "CORS" al cargar imagen:
**Causa:** El servidor de terceros bloquea el dominio
**Solución:**
- Usa Supabase Storage en su lugar
- O usa servicios que permiten hotlinking (Imgur, ImgBB)

---

## 📞 Soporte

Para problemas con subida de archivos:
1. Verificar que la URL sea accesible públicamente
2. Probar la URL en navegador incógnito
3. Revisar la consola del navegador (F12) para errores
4. Considerar usar Supabase Storage como alternativa

---

## 📚 Recursos Adicionales

### Documentación Oficial:
- **Supabase Storage**: https://supabase.com/docs/guides/storage
- **Imgur API**: https://apidocs.imgur.com/
- **Google Drive API**: https://developers.google.com/drive

### Herramientas Útiles:
- **Convertir PDF a optimizado**: https://www.ilovepdf.com/compress_pdf
- **Redimensionar imágenes**: https://www.iloveimg.com/resize-image
- **Convertir formatos**: https://cloudconvert.com/

---

**Última actualización:** Enero 5, 2026  
**Versión:** 1.0.0  
**Próxima implementación:** Subida directa desde panel admin (v2.1.0)
