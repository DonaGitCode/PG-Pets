import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// Verificar credenciales del administrador
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Validar contraseña del servidor
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SteadyGuardians2026!'

    if (password === ADMIN_PASSWORD) {
      // Generar token de sesión
      const sessionToken = Buffer.from(
        JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
          expires: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
        })
      ).toString('base64')

      return NextResponse.json({
        success: true,
        token: sessionToken
      })
    }

    return NextResponse.json(
      { success: false, error: 'Contraseña incorrecta' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Error en autenticación:', error)
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}

// Verificar token de sesión
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { valid: false, error: 'Token no proporcionado' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())

    // Verificar si el token ha expirado
    if (decoded.expires < Date.now()) {
      return NextResponse.json(
        { valid: false, error: 'Sesión expirada' },
        { status: 401 }
      )
    }

    if (decoded.authenticated) {
      return NextResponse.json({ valid: true })
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
