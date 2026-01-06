# 🔐 CREDENCIALES DE ADMINISTRADOR - STEADY GUARDIANS

## 📋 Información de Acceso

### URL del Panel de Administración
```
Desarrollo: http://localhost:3003/adminsg
Producción: https://steadyguardians.com/adminsg
```

### Credenciales
```
Usuario: admin@steadyguardians.com
Contraseña: SteadyGuardians2026!
```

## 🔒 Sistema de Autenticación

### Arquitectura de Seguridad

**1. Autenticación Backend**
- Las credenciales se validan en el servidor (no en el cliente)
- Contraseña almacenada en variable de entorno `ADMIN_PASSWORD`
- No se expone la contraseña al navegador

**2. Tokens de Sesión**
- Al iniciar sesión, el servidor genera un token JWT en base64
- Token válido por 24 horas
- Se almacena en sessionStorage del navegador
- Se envía en header Authorization en cada petición

**3. Validación de Permisos**
- Todas las operaciones CRUD requieren token válido
- El servidor verifica el token antes de ejecutar cualquier operación
- Si el token expira o es inválido, se cierra la sesión automáticamente

### Flujo de Autenticación

```
1. Usuario ingresa contraseña
   ↓
2. POST /api/admin/auth
   - Servidor valida contraseña
   - Genera token firmado
   ↓
3. Cliente guarda token en sessionStorage
   ↓
4. Todas las peticiones incluyen:
   Authorization: Bearer {token}
   ↓
5. Servidor verifica token antes de cada operación
```

## 🛠️ APIs Disponibles

### 1. Autenticación

**Login**
```typescript
POST /api/admin/auth
Body: { password: string }
Response: { success: true, token: string }
```

**Verificar Token**
```typescript
GET /api/admin/auth
Headers: { Authorization: "Bearer {token}" }
Response: { valid: true }
```

### 2. Certificaciones

**Listar Todas**
```typescript
GET /api/admin/certifications
Headers: { Authorization: "Bearer {token}" }
Response: { data: Certification[] }
```

**Crear Nueva**
```typescript
POST /api/admin/certifications
Headers: { Authorization: "Bearer {token}" }
Body: Certification
Response: { data: Certification }
```

**Actualizar**
```typescript
PUT /api/admin/certifications
Headers: { Authorization: "Bearer {token}" }
Body: { id: number, ...fields }
Response: { data: Certification }
```

**Eliminar**
```typescript
DELETE /api/admin/certifications?id={id}
Headers: { Authorization: "Bearer {token}" }
Response: { success: true }
```

## 📊 Conexión con Supabase

### Configuración
```env
NEXT_PUBLIC_SUPABASE_URL=https://uftrftsdmrejevcqhrck.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tabla: certifications

**Campos:**
- `id` (SERIAL PRIMARY KEY)
- `cert_id` (TEXT UNIQUE) - ID público de la certificación
- `status` (TEXT) - Vigente, Condicional, Vencido, Revocado
- `animal_type` (TEXT) - Tipo de animal
- `animal_name` (TEXT) - Nombre del animal
- `animal_photo` (TEXT) - URL de la foto
- `vaccination_record_url` (TEXT) - URL del PDF de vacunas
- `program_type` (TEXT) - Tipo de programa
- `trainer_name` (TEXT) - Nombre del entrenador
- `owner_name` (TEXT) - Nombre del propietario
- `owner_phone` (TEXT) - Teléfono del propietario
- `owner_email` (TEXT) - Email del propietario
- `verification_code` (TEXT) - Código de verificación
- `issued_at` (TIMESTAMPTZ) - Fecha de emisión
- `valid_until` (TIMESTAMPTZ) - Fecha de vencimiento
- `scope` (TEXT) - Alcance del entrenamiento
- `notes_private` (TEXT) - Notas privadas del admin
- `created_at` (TIMESTAMPTZ) - Timestamp de creación

### Operaciones
- **SELECT**: Listar certificaciones (ordenadas por created_at DESC)
- **INSERT**: Crear nueva certificación con validación de campos
- **UPDATE**: Actualizar certificación existente por ID
- **DELETE**: Eliminar certificación por ID

## 🔐 Seguridad en Producción

### ⚠️ IMPORTANTE: Antes de Producción

1. **Cambiar Contraseña**
   ```bash
   # Editar .env.local (nunca commitearlo a git)
   ADMIN_PASSWORD=TuContraseñaSuperSegura2026!
   ```

2. **Cambiar JWT Secret**
   ```bash
   JWT_SECRET=tu-secreto-aleatorio-muy-largo-y-seguro
   ```

3. **Agregar .env.local a .gitignore**
   ```bash
   echo ".env.local" >> .gitignore
   ```

4. **Configurar Variables en Producción**
   - Vercel/Netlify: Panel de configuración → Environment Variables
   - No incluir en el código fuente

5. **Habilitar HTTPS**
   - Asegurar que el sitio use HTTPS en producción
   - Los tokens solo deben viajar por conexiones seguras

6. **Implementar Rate Limiting**
   - Limitar intentos de login (máximo 5 intentos por IP por hora)
   - Protección contra ataques de fuerza bruta

7. **Agregar Logs de Auditoría**
   - Registrar intentos de login
   - Registrar operaciones CRUD (quién, cuándo, qué)

## 📝 Uso del Panel

### Funcionalidades Disponibles

1. **Listado de Certificaciones**
   - Ver todas las certificaciones en tabla
   - Búsqueda por ID, nombre del animal o entrenador
   - Estadísticas: Total, Vigentes, Vencidos, Con Vacunas

2. **Crear Certificación**
   - Click en "Nueva Certificación"
   - ID y código de verificación se generan automáticamente
   - Completar todos los campos requeridos
   - Subir URLs de foto y PDF de vacunas

3. **Editar Certificación**
   - Click en ícono de editar (lápiz)
   - Modificar campos necesarios
   - Guardar cambios

4. **Eliminar Certificación**
   - Click en ícono de eliminar (basura)
   - Confirmar eliminación
   - La certificación se elimina permanentemente

5. **Ver Certificación**
   - Click en ícono de ojo
   - Abre la vista pública de la certificación
   - Permite verificar cómo se ve para los usuarios

## 🎯 Mejoras Recomendadas (Futuro)

1. **Autenticación Multi-Usuario**
   - Crear tabla `admin_users`
   - Múltiples administradores con diferentes permisos
   - Roles: Super Admin, Editor, Viewer

2. **Subida Directa de Archivos**
   - Integrar Supabase Storage
   - Upload de fotos y PDFs desde el panel
   - Generación automática de URLs

3. **Historial de Cambios**
   - Registro de auditoría
   - Quién modificó qué y cuándo
   - Reversión de cambios

4. **Notificaciones**
   - Email cuando se crea una certificación
   - Alertas de certificaciones próximas a vencer
   - Notificaciones de verificaciones exitosas

5. **Estadísticas Avanzadas**
   - Gráficos de certificaciones por mes
   - Programas más solicitados
   - Entrenadores más activos

## 📞 Soporte

Para problemas de autenticación o acceso:
- Revisar consola del navegador (F12)
- Verificar variables de entorno (.env.local)
- Asegurar que el servidor está corriendo
- Verificar conexión a Supabase

## 🚀 Deployment

### Desarrollo
```bash
npm run dev
# Acceder a: http://localhost:3003/adminsg
```

### Producción
```bash
npm run build
npm run start
# Acceder a: https://steadyguardians.com/adminsg
```

---

**Última actualización:** Enero 5, 2026
**Versión:** 1.0.0
