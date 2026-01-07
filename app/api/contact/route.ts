import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, program, message } = await request.json()

    // Validación básica
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Mapeo de programas
    const programNames: Record<string, string> = {
      'apoyo-emocional': 'Apoyo Emocional',
      'servicio': 'Perro de Servicio',
      'lazarillo': 'Perro Lazarillo (Guía)',
      'alerta-medica': 'Alerta Médica',
      'evaluacion': 'Evaluación Conductual',
      'otro': 'Otro / No estoy seguro'
    }

    const programName = programNames[program] || 'No especificado'

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Steady Guardians <contacto@steadyguardians.com>',
      to: ['info@steadyguardians.com'],
      replyTo: email,
      subject: `Nuevo contacto: ${name} - ${programName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1e40af; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #3b82f6; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">📩 Nuevo Mensaje de Contacto</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Formulario de evaluación gratuita</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre:</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="field">
                  <div class="label">📱 WhatsApp / Teléfono:</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                
                <div class="field">
                  <div class="label">🎯 Programa de Interés:</div>
                  <div class="value">${programName}</div>
                </div>
                
                ${message ? `
                <div class="field">
                  <div class="label">💬 Mensaje:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
                
                <div class="footer">
                  <p>Este mensaje fue enviado desde el formulario de contacto de Steady Guardians</p>
                  <p>Fecha: ${new Date().toLocaleString('es-CO', { 
                    dateStyle: 'full', 
                    timeStyle: 'short',
                    timeZone: 'America/Bogota' 
                  })}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando email:', error)
      return NextResponse.json(
        { success: false, error: 'Error al enviar el mensaje' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    })

  } catch (error: any) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Error del servidor' },
      { status: 500 }
    )
  }
}
