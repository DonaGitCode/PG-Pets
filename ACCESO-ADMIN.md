# 🔑 ACCESO RÁPIDO - PANEL DE ADMINISTRACIÓN

## 📍 URL de Acceso
```
http://localhost:3003/adminsg
```

## 🔐 Credenciales
```
Contraseña: SteadyGuardians2026!
```

## ✨ ¿Cómo Funciona?

### 1. Sistema de Autenticación Profesional
- **Backend API Seguro**: La contraseña se valida en el servidor, NO en el cliente
- **Tokens JWT**: Sesión válida por 24 horas
- **Protección de Rutas**: Todas las operaciones requieren autenticación

### 2. Conexión con Base de Datos Supabase
- **Configuración Automática**: Usa las credenciales de `.env.local`
- **Operaciones CRUD**: Create, Read, Update, Delete completamente funcionales
- **Tabla**: `certifications` en Supabase

### 3. Variables de Entorno (.env.local)
```env
# Supabase (Base de Datos)
NEXT_PUBLIC_SUPABASE_URL=https://uftrftsdmrejevcqhrck.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Panel (Solo Servidor - Seguro)
ADMIN_PASSWORD=SteadyGuardians2026!
ADMIN_USERNAME=admin@steadyguardians.com
JWT_SECRET=steady-guardians-super-secret-key-2026-cambiar-en-produccion
```

## 🛠️ APIs Creadas

### `/api/admin/auth` - Autenticación
- **POST**: Login con contraseña → Devuelve token
- **GET**: Verificar si el token es válido

### `/api/admin/certifications` - CRUD de Certificaciones
- **GET**: Listar todas las certificaciones
- **POST**: Crear nueva certificación
- **PUT**: Actualizar certificación existente
- **DELETE**: Eliminar certificación

## 📊 Funcionalidades del Panel

✅ **Dashboard con Estadísticas**
- Total de certificaciones
- Certificaciones vigentes
- Certificaciones vencidas
- Certificaciones con vacunas

✅ **Búsqueda Inteligente**
- Por ID de certificación
- Por nombre del animal
- Por nombre del entrenador

✅ **Gestión Completa (CRUD)**
- Crear nuevas certificaciones
- Editar certificaciones existentes
- Eliminar certificaciones
- Ver certificaciones públicas

✅ **Gestión de Archivos**
- URL de foto del animal
- URL de PDF de vacunas
- Vista previa de archivos subidos

✅ **Generación Automática**
- ID único: `SG-BOG-2026-XXXXXX`
- Código de verificación aleatorio
- Fecha de emisión actual

## 🚀 Cómo Usar

### 1. Iniciar Sesión
1. Ir a `http://localhost:3003/adminsg`
2. Ingresar contraseña: `SteadyGuardians2026!`
3. Click en "Acceder"

### 2. Crear Certificación
1. Click en "Nueva Certificación"
2. Completar formulario:
   - Nombre del animal (requerido)
   - Tipo de animal (requerido)
   - Programa (seleccionar del dropdown)
   - Entrenador (requerido)
   - Estado (Vigente, Condicional, Vencido, Revocado)
   - Fechas (emisión y vencimiento)
   - URLs de foto y vacunas (opcional)
   - Alcance y notas
3. Click en "Crear Certificación"

### 3. Editar Certificación
1. Click en ícono de lápiz ✏️ en la fila deseada
2. Modificar campos necesarios
3. Click en "Guardar Cambios"

### 4. Eliminar Certificación
1. Click en ícono de basura 🗑️ en la fila deseada
2. Confirmar eliminación
3. La certificación se elimina permanentemente

### 5. Ver Certificación Pública
1. Click en ícono de ojo 👁️ en la fila deseada
2. Se abre en nueva pestaña la vista pública
3. Permite verificar cómo ven los usuarios la certificación

## 🔒 Seguridad

### Implementado:
✅ Autenticación backend (contraseña no expuesta al cliente)
✅ Tokens JWT con expiración (24 horas)
✅ Validación de token en cada petición
✅ Variables de entorno para secretos
✅ Panel oculto (solo accesible por URL directa)
✅ Sesión automática cerrada al expirar token

### Para Producción (Recomendado):
⚠️ Cambiar `ADMIN_PASSWORD` a algo más seguro
⚠️ Cambiar `JWT_SECRET` a un secreto aleatorio largo
⚠️ NO commitear `.env.local` a git
⚠️ Configurar variables de entorno en Vercel/Netlify
⚠️ Implementar rate limiting para prevenir ataques de fuerza bruta

## 📞 Soporte

Si tienes problemas:
1. Verificar que el servidor esté corriendo (`npm run dev`)
2. Abrir consola del navegador (F12) para ver errores
3. Verificar que `.env.local` tenga todas las variables
4. Revisar que Supabase esté configurado correctamente

## 📚 Documentación Completa

Para información detallada, ver: [CREDENCIALES-ADMIN.md](./CREDENCIALES-ADMIN.md)

---

**Fecha:** Enero 5, 2026
**Versión:** 1.0.0
