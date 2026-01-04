import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const certId = searchParams.get('id')

  if (!certId) {
    return NextResponse.json(
      { error: 'Se requiere un ID de certificación' },
      { status: 400 }
    )
  }

  // Validate format
  const regex = /^SG-[A-Z]{3}-\d{4}-\d{6}$/
  if (!regex.test(certId)) {
    return NextResponse.json(
      { error: 'Formato de ID inválido' },
      { status: 400 }
    )
  }

  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('cert_id', certId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'No se encontró ninguna certificación con ese ID' },
          { status: 404 }
        )
      }
      throw error
    }

    // Transform the data to match the frontend interface
    const certification = {
      cert_id: data.cert_id,
      status: data.status,
      animal_type: data.animal_type,
      animal_name: data.animal_name,
      animal_photo: data.animal_photo,
      program_type: data.program_type,
      issued_at: data.issued_at,
      valid_until: data.valid_until,
      scope: data.scope,
      trainer_name: data.trainer_name,
      verification_code: data.verification_code
    }

    return NextResponse.json(certification)
  } catch (error) {
    console.error('Error fetching certification:', error)
    return NextResponse.json(
      { error: 'Error al consultar la base de datos' },
      { status: 500 }
    )
  }
}
