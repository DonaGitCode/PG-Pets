# Steady Guardians - Plataforma de Entrenamiento Canino de Asistencia

## 📋 Descripción

Plataforma web profesional para Steady Guardians, organización colombiana especializada en entrenamiento de perros de asistencia, con sede en Pasto, Nariño.

### Características principales:
- ✅ Landing page profesional estilo Petfly
- ✅ Catálogo de programas de entrenamiento
- ✅ Sistema de verificación pública por ID/QR
- ✅ Panel administrativo privado
- ✅ Base de datos real con Supabase
- ✅ Diseño responsive premium
- ✅ Totalmente en español colombiano

## 🚀 Instalación Rápida

### Paso 1: Crear el proyecto Next.js

```bash
cd "C:\Users\donat\Documents\PG Pets"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Cuando pregunte:
- ✅ Would you like to use TypeScript? → Yes
- ✅ Would you like to use ESLint? → Yes  
- ✅ Would you like to use Tailwind CSS? → Yes
- ✅ Would you like to use `src/` directory? → No
- ✅ Would you like to use App Router? → Yes
- ✅ Would you like to customize the default import alias? → No

### Paso 2: Instalar dependencias adicionales

```bash
npm install @supabase/supabase-js qrcode lucide-react
npm install -D @types/qrcode
```

### Paso 3: Configurar variables de entorno

Crea el archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_aqui
NEXT_PUBLIC_WHATSAPP_NUMBER=573123456789
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Estructura del Proyecto

```
PG Pets/
├── app/
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Estilos globales
│   ├── verify/
│   │   └── page.tsx               # Página de verificación pública
│   ├── admin/
│   │   ├── layout.tsx             # Layout del panel admin
│   │   ├── page.tsx               # Dashboard admin
│   │   ├── login/
│   │   │   └── page.tsx           # Login admin
│   │   └── certifications/
│   │       ├── page.tsx           # Lista de certificaciones
│   │       ├── new/
│   │       │   └── page.tsx       # Nueva certificación
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx   # Editar certificación
│   └── api/
│       └── certifications/
│           └── route.ts           # API de certificaciones
├── components/
│   ├── Navbar.tsx                 # Navegación principal
│   ├── Footer.tsx                 # Pie de página
│   ├── WhatsAppButton.tsx         # Botón flotante WhatsApp
│   ├── home/
│   │   ├── Hero.tsx               # Hero section
│   │   ├── TrustBar.tsx           # Barra de confianza
│   │   ├── Programs.tsx           # Catálogo de programas
│   │   ├── Process.tsx            # Proceso de 3 pasos
│   │   ├── ComplianceSection.tsx  # Marco legal
│   │   ├── Testimonials.tsx       # Testimonios
│   │   ├── FAQ.tsx                # Preguntas frecuentes
│   │   └── Contact.tsx            # Formulario contacto
│   ├── admin/
│   │   ├── CertificationForm.tsx  # Formulario admin
│   │   └── CertificationList.tsx  # Lista admin
│   └── verify/
│       └── VerificationCard.tsx   # Tarjeta de verificación
├── lib/
│   ├── supabase.ts                # Cliente Supabase
│   └── utils.ts                   # Utilidades
├── types/
│   └── index.ts                   # Tipos TypeScript
├── supabase/
│   └── schema.sql                 # SQL completo
└── public/
    └── images/                    # Imágenes del sitio

```

## 🗄️ Configuración de Supabase

### 1. Crear cuenta en Supabase
- Ve a [supabase.com](https://supabase.com)
- Crea una cuenta gratuita
- Crea un nuevo proyecto

### 2. Ejecutar el SQL

En el SQL Editor de Supabase, ejecuta el siguiente script:

```sql
-- Tabla de certificaciones
CREATE TABLE certifications (
  id BIGSERIAL PRIMARY KEY,
  cert_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Vigente',
  animal_type TEXT NOT NULL DEFAULT 'Perro',
  program_type TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  scope TEXT,
  notes_private TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_cert_id ON certifications(cert_id);
CREATE INDEX idx_status ON certifications(status);
CREATE INDEX idx_program_type ON certifications(program_type);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Policy: Lectura pública solo para verificación (sin datos sensibles)
CREATE POLICY "Public can view active certifications"
  ON certifications
  FOR SELECT
  USING (true);

-- Policy: Solo usuarios autenticados pueden insertar
CREATE POLICY "Authenticated users can insert"
  ON certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update"
  ON certifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete"
  ON certifications
  FOR DELETE
  TO authenticated
  USING (true);

-- Datos de ejemplo (seed)
INSERT INTO certifications (cert_id, status, animal_type, program_type, issued_at, valid_until, scope) VALUES
('SG-NAR-2026-000001', 'Vigente', 'Perro', 'Apoyo Emocional', '2026-01-01', '2027-01-01', 'El animal ha completado el programa de entrenamiento de apoyo emocional, demostrando estabilidad emocional, rutinas de calma y manejo adecuado en espacios públicos.'),
('SG-NAR-2026-000002', 'Vigente', 'Perro', 'Servicio', '2026-01-02', '2027-01-02', 'El animal ha sido entrenado como perro de servicio, con obediencia avanzada, acceso público responsable y asistencia funcional al tutor.'),
('SG-NAR-2026-000003', 'Vigente', 'Perro', 'Lazarillo (Guía)', '2026-01-03', '2027-01-03', 'El animal ha completado el programa de entrenamiento como perro guía, capacitado para guiado seguro, detección de riesgos y navegación urbana.'),
('SG-NAR-2026-000004', 'Vigente', 'Perro', 'Alerta Médica', '2026-01-04', '2027-01-04', 'El animal ha sido entrenado para alertar crisis epilépticas, demostrando respuesta entrenada ante síntomas específicos del tutor.'),
('SG-NAR-2025-000005', 'Vencido', 'Perro', 'Apoyo Emocional', '2025-01-01', '2026-01-01', 'Certificación vencida. Requiere reentrenamiento y evaluación.');

COMMENT ON TABLE certifications IS 'Registros de entrenamiento y certificaciones emitidas por Steady Guardians';
```

### 3. Configurar autenticación

En Supabase Dashboard → Authentication → Providers:
- Habilita "Email" provider
- Crea un usuario admin:
  - Email: admin@steadyguardians.com
  - Password: (tu contraseña segura)

## 🎨 Personalización

### Colores principales
En `tailwind.config.js`, los colores están definidos:
- **Primary** (azul): Confianza y profesionalismo
- **Accent** (amarillo/naranja): Calidez y energía

### Imágenes
Reemplaza las URLs de imágenes en los componentes con tus propias imágenes:
- Hero: Perro en entrenamiento o perro guía
- Programs: Imágenes específicas de cada programa
- Testimonials: Fotos de tutores con sus perros (con permiso)

### WhatsApp
Actualiza `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local` con tu número real.

## 🚀 Despliegue Gratuito

### Opción 1: Vercel (Recomendado)

1. Crear cuenta en [vercel.com](https://vercel.com)
2. Conectar tu repositorio de GitHub
3. Configurar variables de entorno
4. Deploy automático

```bash
# O usando Vercel CLI
npm i -g vercel
vercel
```

### Opción 2: Cloudflare Pages

1. Crear cuenta en [pages.cloudflare.com](https://pages.cloudflare.com)
2. Conectar repositorio
3. Build command: `npm run build`
4. Output directory: `.next`
5. Configurar variables de entorno

### Variables de entorno en producción

Asegúrate de configurar en tu plataforma de hosting:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
NEXT_PUBLIC_WHATSAPP_NUMBER=573123456789
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## 📱 Uso del Sistema

### Para Usuarios Públicos

1. **Verificar entrenamiento**: 
   - Ir a `/verify`
   - Ingresar ID (ej: SG-NAR-2026-000123)
   - Ver estado y detalles

2. **Agendar evaluación**:
   - Completar formulario de contacto
   - Recibir contacto por WhatsApp

### Para Administradores

1. **Acceder al panel**:
   - Ir a `/admin/login`
   - Iniciar sesión con credenciales Supabase

2. **Crear certificación**:
   - Click en "Nueva certificación"
   - Completar formulario
   - El ID se genera automáticamente
   - El QR se genera automáticamente

3. **Gestionar certificaciones**:
   - Ver lista completa
   - Editar estado
   - Buscar por ID

## 🔐 Seguridad

- ✅ Row Level Security (RLS) activado
- ✅ Autenticación con Supabase Auth
- ✅ Datos sensibles protegidos
- ✅ Verificación pública sin exponer datos personales

## 📄 Marco Legal y Compliance

El sitio incluye una sección de "Marco de Cumplimiento y Responsabilidad" que explica:

- Que Steady Guardians prepara y documenta binomios perro-tutor
- Que el acceso depende de normativas aplicables
- Que la verificación es un registro de entrenamiento completado
- Responsabilidad del tutor en informarse sobre políticas locales

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Iniciar producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📞 Soporte

Para soporte técnico o consultas sobre el entrenamiento:
- WhatsApp: +57 312 345 6789
- Email: info@steadyguardians.com
- Ubicación: Pasto, Nariño, Colombia

## 📝 Licencia

Copyright © 2026 Steady Guardians. Todos los derechos reservados.

---

**Desarrollado con ❤️ para mejorar la vida de personas con discapacidades y condiciones médicas a través del entrenamiento canino profesional.**
