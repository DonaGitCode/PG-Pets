import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

// Verificar autenticación
async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const JWT_SECRET = process.env.JWT_SECRET || 'steady-guardians-super-secret-key-2026-cambiar-en-produccion'

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }

  try {
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { authenticated: boolean; email: string }
    return !!decoded && decoded.authenticated
  } catch {
    return false
  }
}

// GET - Listar todas las certificaciones
export async function GET(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json(
      { error: error.message || 'Error al obtener certificaciones' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva certificación
export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const supabase = createClient()

    // Validar datos requeridos
    if (!body.cert_id || !body.animal_name || !body.program_type || !body.trainer_name) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('certifications')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating certification:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear certificación' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar certificación
export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID de certificación requerido' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('certifications')
      .update(updateData)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (error) throw error
    
    if (!data) {
      return NextResponse.json(
        { error: 'No se pudo actualizar la certificación' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error updating certification:', error)
    return NextResponse.json(
      { error: error.message || 'Error al actualizar certificación' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar certificación
export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID de certificación requerido' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting certification:', error)
    return NextResponse.json(
      { error: error.message || 'Error al eliminar certificación' },
      { status: 500 }
    )
  }
}
