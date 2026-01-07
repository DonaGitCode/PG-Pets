import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Login: email + password, issue signed JWT (24h)
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin@steadyguardians.com'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SteadyGuardians2026!'
    const JWT_SECRET = process.env.JWT_SECRET || 'steady-guardians-super-secret-key-2026-cambiar-en-produccion'

    // Basic input validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Correo y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Verify credentials against env
    if (email !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Sign JWT with 24h expiration
    const token = jwt.sign(
      {
        authenticated: true,
        email,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error('Error en autenticación:', error)
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}

// Verify JWT token
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const JWT_SECRET = process.env.JWT_SECRET || 'steady-guardians-super-secret-key-2026-cambiar-en-produccion'

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { valid: false, error: 'Token no proporcionado' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { authenticated: boolean; email: string }

    if (decoded && decoded.authenticated) {
      return NextResponse.json({ valid: true, email: decoded.email })
    }

    return NextResponse.json(
      { valid: false, error: 'Token inválido' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Error verificando token:', error)
    return NextResponse.json(
      { valid: false, error: 'Error de autenticación' },
      { status: 401 }
    )
  }
}
