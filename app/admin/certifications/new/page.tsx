'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ArrowLeft, Save, Shield } from 'lucide-react'
import Link from 'next/link'
import { generateCertId } from '@/lib/utils'

const CITIES = [
  { code: 'BOG', name: 'Bogotá' },
  { code: 'MED', name: 'Medellín' },
  { code: 'CAL', name: 'Cali' },
  { code: 'BAQ', name: 'Barranquilla' },
  { code: 'CTG', name: 'Cartagena' },
  { code: 'BGA', name: 'Bucaramanga' },
  { code: 'PEI', name: 'Pereira' },
  { code: 'MZL', name: 'Manizales' },
  { code: 'PSO', name: 'Pasto' },
  { code: 'IBG', name: 'Ibagué' },
  { code: 'CUC', name: 'Cúcuta' },
  { code: 'SMR', name: 'Santa Marta' },
  { code: 'VVC', name: 'Villavicencio' },
  { code: 'ARM', name: 'Armenia' },
  { code: 'NVA', name: 'Neiva' }
]

const PROGRAMS = [
  'Apoyo Emocional',
  'Servicio',
  'Lazarillo (Guía)',
  'Alerta Médica',
  'Evaluación Conductual'
]

const STATUS_OPTIONS = [
  'Vigente',
  'Condicional',
  'Vencido',
  'Revocado'
]

export default function NewCertification() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    city: 'BOG',
    animalName: '',
    animalType: 'Perro - Labrador Retriever',
    animalPhoto: '',
    programType: 'Apoyo Emocional',
    trainerName: 'Dra. Ana María González',
    status: 'Vigente',
    scope: '',
    validityMonths: '24',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      // Generate certification ID
      const certId = generateCertId(formData.city)
      const verificationCode = certId.split('-').join('')

      // Calculate valid_until date
      const issuedAt = new Date()
      const validUntil = new Date(issuedAt)
      validUntil.setMonth(validUntil.getMonth() + parseInt(formData.validityMonths))

      // Insert certification
      const { data, error } = await supabase
        .from('certifications')
        .insert([
          {
            cert_id: certId,
            status: formData.status,
            animal_type: formData.animalType,
            animal_name: formData.animalName,
            animal_photo: formData.animalPhoto || null,
            program_type: formData.programType,
            trainer_name: formData.trainerName,
            verification_code: verificationCode,
            issued_at: issuedAt.toISOString(),
            valid_until: validUntil.toISOString(),
            scope: formData.scope || null,
          },
        ])
        .select()

      if (error) throw error

      // Redirect to certifications list
      router.push('/admin/certifications')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la certificación')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/certifications"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nueva Certificación</h1>
                <p className="text-sm text-gray-600">Registrar nuevo entrenamiento completado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Identificación */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                Identificación
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad de Emisión *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    {CITIES.map(city => (
                      <option key={city.code} value={city.code}>
                        {city.name} ({city.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Información del Animal */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                Información del Animal
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Animal *
                    </label>
                    <input
                      type="text"
                      value={formData.animalName}
                      onChange={(e) => handleChange('animalName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Ej: Max"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Animal *
                    </label>
                    <input
                      type="text"
                      value={formData.animalType}
                      onChange={(e) => handleChange('animalType', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Ej: Perro - Labrador Retriever"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de Foto del Animal
                  </label>
                  <input
                    type="url"
                    value={formData.animalPhoto}
                    onChange={(e) => handleChange('animalPhoto', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com/photo.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Opcional. URL de Unsplash, Cloudinary u otro servicio de imágenes
                  </p>
                </div>
              </div>
            </div>

            {/* Programa de Entrenamiento */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                Programa de Entrenamiento
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Programa *
                    </label>
                    <select
                      value={formData.programType}
                      onChange={(e) => handleChange('programType', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      {PROGRAMS.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vigencia (meses) *
                    </label>
                    <select
                      value={formData.validityMonths}
                      onChange={(e) => handleChange('validityMonths', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="12">12 meses (1 año)</option>
                      <option value="24">24 meses (2 años)</option>
                      <option value="36">36 meses (3 años)</option>
                      <option value="0">Sin vencimiento</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alcance del Entrenamiento
                  </label>
                  <textarea
                    value={formData.scope}
                    onChange={(e) => handleChange('scope', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Descripción detallada del entrenamiento completado, habilidades desarrolladas y áreas de competencia..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrenador Responsable *
                  </label>
                  <input
                    type="text"
                    value={formData.trainerName}
                    onChange={(e) => handleChange('trainerName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nombre completo del entrenador certificado"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Link
                href="/admin/certifications"
                className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Crear Certificación</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
