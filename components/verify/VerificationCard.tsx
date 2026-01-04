'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, QrCode, CheckCircle, XCircle, Calendar, FileText, Shield, AlertCircle, Smartphone, Download, Syringe } from 'lucide-react'
import { formatDate, getStatusColor } from '@/lib/utils'
import QRScanner from '@/components/verify/QRScanner'
import Image from 'next/image'

interface Certification {
  cert_id: string
  status: 'Vigente' | 'Condicional' | 'Vencido' | 'Revocado'
  animal_type: string
  animal_name: string
  animal_photo: string | null
  program_type: string
  issued_at: string
  valid_until: string | null
  scope: string | null
  trainer_name: string
  verification_code: string
}

export default function VerificationCard() {
  const searchParams = useSearchParams()
  const [certId, setCertId] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<Certification | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showScanner, setShowScanner] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Check for ID in URL params
    const idFromUrl = searchParams?.get('id')
    if (idFromUrl) {
      setCertId(idFromUrl)
      handleSearch(idFromUrl)
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [searchParams])

  const handleSearch = async (id?: string) => {
    const searchId = id || certId.trim().toUpperCase()
    
    if (!searchId) {
      setError('Por favor ingresa un ID de certificación')
      return
    }

    // Validate format
    const regex = /^SG-[A-Z]{3}-\d{4}-\d{6}$/
    if (!regex.test(searchId)) {
      setError('Formato de ID inválido. Ejemplo: SG-BOG-2026-000123')
      return
    }

    setIsSearching(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/certifications?id=${encodeURIComponent(searchId)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al buscar la certificación')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se encontró ninguna certificación con ese ID')
    } finally {
      setIsSearching(false)
    }
  }

  const handleQRScan = (scannedId: string) => {
    setCertId(scannedId)
    setShowScanner(false)
    handleSearch(scannedId)
  }

  const handleScannerError = (errorMessage: string) => {
    setError(errorMessage)
    setShowScanner(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom section-padding py-12 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Verificación Pública</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Verificar Entrenamiento
          </h1>
          <p className="text-lg text-gray-600">
            Ingresa el ID de certificación o escanea el código QR para verificar 
            el estado y detalles del entrenamiento completado.
          </p>
        </div>

        {/* Search Methods */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Manual ID Input */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Buscar por ID</h3>
                  <p className="text-xs text-gray-600">Ingresa el código manualmente</p>
                </div>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="SG-BOG-2026-000123"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors font-mono text-center"
                  disabled={isSearching}
                />
                <button
                  onClick={() => handleSearch()}
                  disabled={isSearching}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 inline-block mr-2" />
                      Verificar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Scanner */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Escanear QR</h3>
                  <p className="text-xs text-gray-600">Usa la cámara de tu dispositivo</p>
                </div>
              </div>
              <div className="space-y-3">
                {isMobile && (
                  <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 rounded-lg p-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Dispositivo móvil detectado</span>
                  </div>
                )}
                <button
                  onClick={() => setShowScanner(true)}
                  className="w-full btn-secondary"
                  disabled={isSearching}
                >
                  <QrCode className="w-5 h-5 inline-block mr-2" />
                  Abrir Escáner
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Funciona en móviles y computadoras con cámara
                </p>
              </div>
            </div>
          </div>

          {/* Example Format */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Formato del ID de Certificación:</p>
                <p className="font-mono">SG-[CIUDAD]-[AÑO]-[NÚMERO]</p>
                <p className="text-xs mt-1 text-blue-600">
                  Ejemplo: SG-BOG-2026-000123 (Bogotá) o SG-MED-2026-000456 (Medellín)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="max-w-4xl mx-auto">
            <div className="card overflow-hidden">
              {/* Certificate Header with Gradient */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                  {/* Left: Logo and Title */}
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-0 p-3">
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/Logo.png"
                          alt="Steady Guardians Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">Certificación Auténtica</h2>
                      <p className="text-primary-100 mt-1 text-sm md:text-base">Steady Guardians · Colombia</p>
                      <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                        <span className="text-xs md:text-sm font-semibold text-green-300">Verificación Exitosa</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Badge */}
                  <div className="text-center bg-white rounded-xl p-3 md:p-4 shadow-lg min-w-[140px] md:min-w-[160px]">
                    <div className={`text-xl md:text-2xl font-bold mb-1 ${
                      result.status === 'Vigente' ? 'text-green-600' :
                      result.status === 'Condicional' ? 'text-yellow-600' :
                      result.status === 'Vencido' ? 'text-gray-600' :
                      'text-red-600'
                    }`}>
                      {result.status}
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Estado</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-4 md:p-8">
                {/* Pet Photo and Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  {/* Pet Photo */}
                  <div className="md:col-span-1">
                    <div className="relative">
                      {result.animal_photo ? (
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-primary-200">
                          <Image
                            src={result.animal_photo}
                            alt={`Foto de ${result.animal_name}`}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                          <Shield className="w-24 h-24 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Authenticity Seal */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white transform rotate-12">
                        <div className="text-center">
                          <CheckCircle className="w-8 h-8 text-white mx-auto mb-1" />
                          <div className="text-xs font-bold text-white uppercase">Auténtico</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pet Name */}
                    <div className="mt-6 text-center">
                      <h3 className="text-2xl font-bold text-gray-900">{result.animal_name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{result.animal_type}</p>
                    </div>
                  </div>

                  {/* Certification Details */}
                  <div className="md:col-span-2 space-y-4 md:space-y-6">
                    {/* Security Badges */}
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                      <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                        <span className="text-xs md:text-sm font-medium text-green-800">Verificado</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2">
                        <Shield className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                        <span className="text-xs md:text-sm font-medium text-blue-800">Certificado Oficial</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-purple-50 border border-purple-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2">
                        <QrCode className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                        <span className="text-xs md:text-sm font-medium text-purple-800">ID Único</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <FileText className="w-5 h-5" />
                          <span className="text-xs font-medium uppercase tracking-wide">ID Certificación</span>
                        </div>
                        <p className="text-base md:text-lg font-mono font-bold text-gray-900 break-all">{result.cert_id}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Shield className="w-5 h-5" />
                          <span className="text-xs font-medium uppercase tracking-wide">Programa</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{result.program_type}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Calendar className="w-5 h-5" />
                          <span className="text-xs font-medium uppercase tracking-wide">Emisión</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formatDate(result.issued_at)}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Calendar className="w-5 h-5" />
                          <span className="text-xs font-medium uppercase tracking-wide">Válido Hasta</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {result.valid_until ? formatDate(result.valid_until) : 'Sin vencimiento'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <span className="text-xs font-medium uppercase tracking-wide">Entrenador Certificado</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{result.trainer_name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scope */}
                {result.scope && (
                  <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Alcance del Entrenamiento</h4>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">{result.scope}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vaccination Record Download */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Syringe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Registro de Vacunación</h4>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                          Descarga el historial completo de vacunas y tratamientos veterinarios de {result.animal_name}.
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://placehold.co/600x800/22c55e/white/pdf?text=Registro+de+Vacunación\n${result.animal_name}\nCertificación:+${result.cert_id}\nHistorial+Completo`}
                      download={`vacunas-${result.animal_name}-${result.cert_id}.pdf`}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">Descargar PDF</span>
                    </a>
                  </div>
                </div>

                {/* Verification Security Features */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary-600" />
                    Características de Seguridad
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Código de Verificación</p>
                        <p className="text-gray-600 font-mono">{result.verification_code}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Base de Datos Oficial</p>
                        <p className="text-gray-600">Registro verificado en sistema</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">QR Único</p>
                        <p className="text-gray-600">Código anti-falsificación</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Fecha de Consulta</p>
                        <p className="text-gray-600">{new Date().toLocaleDateString('es-CO', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Official Seal */}
                <div className="bg-white border-2 border-primary-600 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center p-3">
                        <div className="relative w-full h-full">
                          <Image
                            src="/images/Logo.png"
                            alt="Steady Guardians Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 text-base md:text-lg">Certificado Oficial</h5>
                        <p className="text-xs md:text-sm text-gray-600">Steady Guardians Colombia</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-green-600">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-bold text-sm md:text-base">AUTENTICADO</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Documento verificable públicamente</p>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Nota Importante</p>
                      <p>
                        Esta verificación confirma que el perro completó un programa de entrenamiento 
                        profesional con Steady Guardians. La aceptación y acceso en espacios públicos 
                        depende de normativas locales aplicables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Scanner Modal */}
        {showScanner && (
          <QRScanner
            onScan={handleQRScan}
            onClose={() => setShowScanner(false)}
            onError={handleScannerError}
          />
        )}

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Público</h3>
              <p className="text-sm text-gray-600">
                Cualquier persona puede verificar la autenticidad de una certificación
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Código QR</h3>
              <p className="text-sm text-gray-600">
                Escanea el QR desde cualquier dispositivo con cámara
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Información Verificada</h3>
              <p className="text-sm text-gray-600">
                Datos oficiales del programa y estado del entrenamiento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
