'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, QrCode, CheckCircle, XCircle, Calendar, FileText, Shield, AlertCircle, Smartphone, Download, Syringe, Barcode } from 'lucide-react'
import { formatDate, getStatusColor } from '@/lib/utils'
import QRScanner from '@/components/verify/QRScanner'
import BarcodeScanner from '@/components/verify/BarcodeScanner'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'

interface Certification {
  cert_id: string
  status: 'Vigente' | 'Condicional' | 'Vencido' | 'Revocado'
  animal_type: string
  animal_name: string
  animal_photo: string | null
  vaccination_record_url: string | null
  program_type: string
  issued_at: string
  valid_until: string | null
  scope: string | null
  trainer_name: string
  verification_code: string
  owner_name?: string | null
  owner_phone?: string | null
  owner_email?: string | null
}

export default function VerificationCard() {
  const searchParams = useSearchParams()
  const [certId, setCertId] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [searchMode, setSearchMode] = useState<'id' | 'code'>('code')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<Certification | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showScanner, setShowScanner] = useState(false)
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [consultationDate] = useState(new Date().toLocaleString('es-CO', {
    dateStyle: 'long',
    timeStyle: 'short'
  }))

  // Ocultar/mostrar WhatsApp button
  useEffect(() => {
    const whatsappBtn = document.querySelector('.whatsapp-float-button') as HTMLElement
    if (whatsappBtn) {
      whatsappBtn.style.display = result ? 'none' : 'block'
    }
  }, [result])

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

  const handleSearch = async (id?: string, codeArg?: string) => {
    let searchValue = ''
    let searchField = ''
    
    if (searchMode === 'id') {
      searchValue = (id || certId.trim()).toUpperCase()
      searchField = 'cert_id'
      if (!searchValue) {
        setError('Por favor ingresa un ID de certificación')
        return
      }
      // Validate format: SG-BOG-AM-X7K2N9P4
      const regex = /^SG-[A-Z]{3}-[A-Z]{2,3}-[A-Z0-9]{8}$/
      if (!regex.test(searchValue)) {
        setError('Formato de ID inválido. Ejemplo: SG-BOG-AM-X7K2N9P4')
        return
      }
    } else {
      searchValue = (codeArg || verificationCode.trim()).toUpperCase()
      searchField = 'verification_code'
      if (!searchValue) {
        setError('Por favor ingresa el código de verificación')
        return
      }
      // Validate format: VER-[timestamp][random] - approx 12-14 chars
      if (searchValue.length < 10) {
        setError('Código de verificación inválido')
        return
      }
    }

    setIsSearching(true)
    setError(null)
    setResult(null)

    try {
      const supabase = createClient()
      
      const query = supabase
        .from('certifications')
        .select('*')
        .eq(searchField, searchValue)
        .single()

      const { data, error: supabaseError } = await query

      if (supabaseError || !data) {
        throw new Error(`No se encontró ninguna certificación con ese ${searchMode === 'id' ? 'ID' : 'código'}`)
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se encontró ninguna certificación')
    } finally {
      setIsSearching(false)
    }
  }

  const handleQRScan = (scannedId: string) => {
    setCertId(scannedId)
    setShowScanner(false)
    handleSearch(scannedId)
  }

  const handleBarcodeScan = (scannedCode: string) => {
    const normalized = scannedCode.toUpperCase()
    setVerificationCode(normalized)
    setShowBarcodeScanner(false)
    setSearchMode('code')
    // Ejecuta búsqueda inmediata con el valor escaneado
    handleSearch(undefined, normalized)
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
          {/* Search Mode Tabs (Código primero, luego ID) */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => {
                setSearchMode('code')
                setError(null)
              }}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                searchMode === 'code'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4 inline-block mr-2" />
              Código de Verificación
            </button>
            <button
              onClick={() => {
                setSearchMode('id')
                setError(null)
              }}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                searchMode === 'id'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-4 h-4 inline-block mr-2" />
              ID de Certificación
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Manual ID Input */}
            {searchMode === 'id' && (
              <div className="card p-6 md:col-span-2 lg:col-span-1">
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
                    placeholder="SG-MED-LAZ-Q8R3W5M1"
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
            )}

            {/* Verification Code Input */}
            {searchMode === 'code' && (
              <div className="card p-6 md:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Buscar por Código</h3>
                    <p className="text-xs text-gray-600">Ingresa el código de verificación</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="VER-ABC1234DEF5678"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-mono text-center"
                    disabled={isSearching}
                  />
                  <button
                    onClick={() => handleSearch()}
                    disabled={isSearching}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            )}

            {/* Scanner según modo */}
            {searchMode === 'id' ? (
              <div className="card p-6 md:col-span-2 lg:col-span-1">
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
                    Abrir Escáner QR
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Funciona en móviles y computadoras con cámara
                  </p>
                </div>
              </div>
            ) : (
              <div className="card p-6 md:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Barcode className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Escanear Código de Barras</h3>
                    <p className="text-xs text-gray-600">Coloca el código dentro del marco</p>
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
                    onClick={() => setShowBarcodeScanner(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSearching}
                  >
                    <Barcode className="w-5 h-5 inline-block mr-2" />
                    Abrir Escáner de Barras
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Compatible con formatos comunes (Code128, EAN)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Example Format */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-4 text-sm">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <div>
                <p className="font-bold mb-1 text-blue-900">Código de Certificación Único</p>
                <p className="font-mono text-blue-700 font-semibold">SG-[CIUDAD]-[ESPECIALIDAD]-[CÓDIGO]</p>
                <p className="text-xs mt-2 text-blue-700 leading-relaxed">
                  <strong>Cada mascota tiene un código único e irrepetible</strong> generado con tecnología de seguridad avanzada.
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-blue-600">✓ Código alfanumérico de alta seguridad (8 caracteres)</p>
                  <p className="text-xs text-blue-600">✓ Identificador único para cada certificación</p>
                  <p className="text-xs text-blue-600 font-mono">Ejemplo: SG-BOG-AM-X7K2N9P4</p>
                </div>
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

        {/* Result Modal - Pop-up optimizado para móvil con animaciones Apple */}
        {result && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fadeIn">
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              @keyframes slideUp {
                from {
                  transform: translateY(100%);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              @keyframes logoEntrance {
                0% {
                  transform: scale(5) translateY(0);
                  opacity: 0;
                }
                30% {
                  opacity: 1;
                }
                100% {
                  transform: scale(1) translateY(0);
                  opacity: 1;
                }
              }
              @keyframes shimmer {
                0% {
                  background-position: -1000px 0;
                }
                100% {
                  background-position: 1000px 0;
                }
              }
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.8;
                }
              }
              @keyframes stamp {
                0% {
                  transform: scale(0) rotate(-45deg);
                  opacity: 0;
                }
                50% {
                  transform: scale(1.1) rotate(5deg);
                }
                100% {
                  transform: scale(1) rotate(0deg);
                  opacity: 1;
                }
              }
              @keyframes sealSweep {
                0% {
                  transform: translateX(-150%) rotate(-45deg);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  transform: translateX(150%) rotate(-45deg);
                  opacity: 0;
                }
              }
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
              }
              .animate-slideUp {
                animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .animate-logoEntrance {
                animation: logoEntrance 1s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .shimmer {
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0.3) 50%,
                  rgba(255, 255, 255, 0) 100%
                );
                background-size: 1000px 100%;
                animation: shimmer 2s infinite;
              }
              .gradient-apple {
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
              }
              .gradient-apple-green {
                background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
              }
              .text-shadow-soft {
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .seal-stamp {
                animation: stamp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              }
              .seal-sweep {
                animation: sealSweep 3s ease-in-out infinite;
              }
            `}</style>
            
            <div className="bg-white w-full md:max-w-4xl md:rounded-3xl overflow-hidden shadow-2xl max-h-screen overflow-y-auto animate-slideUp">
              {/* Close Button */}
              <button
                onClick={() => {
                  setResult(null)
                  setCertId('')
                  setError(null)
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>

              {/* Header del Certificado con gradiente Apple */}
              <div className="relative gradient-apple text-white p-6 md:p-8 overflow-hidden">
                {/* Efecto shimmer */}
                <div className="absolute inset-0 shimmer opacity-30"></div>
                
                <div className="relative flex flex-col items-center gap-4 text-center">
                  {/* Logo con animación de entrada */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl p-4 animate-logoEntrance">
                    <img src="/images/Logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-shadow-soft">Certificación Auténtica</h2>
                    <p className="text-white/90 mt-1 font-medium">Steady Guardians · Colombia</p>
                  </div>
                  
                  {/* Estado del Certificado - Mejorado con efectos Apple */}
                  <div className="w-full max-w-sm relative">
                    <div className={`relative overflow-hidden rounded-3xl p-6 shadow-2xl border-4 transform transition-all hover:scale-105 ${
                      result.status === 'Vigente' 
                        ? 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 border-emerald-200' :
                      result.status === 'Condicional' 
                        ? 'bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-700 border-amber-200' :
                      result.status === 'Vencido' 
                        ? 'bg-gradient-to-br from-slate-500 via-gray-600 to-zinc-700 border-slate-200' :
                      'bg-gradient-to-br from-rose-500 via-red-600 to-pink-700 border-rose-200'
                    }`}>
                      {/* Brillo animado */}
                      <div className="absolute inset-0 shimmer opacity-20"></div>
                      
                      {/* Icono según estado */}
                      <div className="relative flex items-center justify-center gap-3 mb-2">
                        {result.status === 'Vigente' ? (
                          <CheckCircle className="w-10 h-10 text-white drop-shadow-lg animate-pulse" strokeWidth={3} />
                        ) : result.status === 'Condicional' ? (
                          <AlertCircle className="w-10 h-10 text-white drop-shadow-lg" strokeWidth={3} />
                        ) : result.status === 'Vencido' ? (
                          <XCircle className="w-10 h-10 text-white drop-shadow-lg" strokeWidth={3} />
                        ) : (
                          <XCircle className="w-10 h-10 text-white drop-shadow-lg" strokeWidth={3} />
                        )}
                        <div className="text-4xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] tracking-wide">
                          {result.status.toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="relative text-sm font-bold text-white/95 uppercase tracking-widest drop-shadow-md">
                        Estado del Certificado
                      </div>
                      
                      {/* Patrón decorativo de fondo */}
                      <div className="absolute bottom-2 right-2 opacity-10">
                        <Shield className="w-20 h-20 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido Principal */}
              <div className="p-4 md:p-6 space-y-4">
                {/* Foto del Animal con animación */}
                <div className="max-w-xs mx-auto relative">
                  {result.animal_photo ? (
                    <div className="relative transform transition-all hover:scale-105">
                      <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-gray-100">
                        <Image
                          src={result.animal_photo}
                          alt={result.animal_name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Sello de Verificación Real - Estilo Oficial */}
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 z-10">
                        <div className="seal-stamp relative w-full h-full overflow-hidden rounded-full">
                          {/* Círculo exterior con efecto de sello dentado */}
                          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                            <defs>
                              <radialGradient id="sealGradient">
                                <stop offset="0%" stopColor="#fbbf24" />
                                <stop offset="50%" stopColor="#f59e0b" />
                                <stop offset="100%" stopColor="#d97706" />
                              </radialGradient>
                              <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                              </linearGradient>
                              <clipPath id="circleClip">
                                <circle cx="50" cy="50" r="48" />
                              </clipPath>
                            </defs>
                            {/* Círculo dentado exterior */}
                            <circle cx="50" cy="50" r="48" fill="url(#sealGradient)" />
                            {/* Dentado decorativo */}
                            {[...Array(16)].map((_, i) => {
                              const angle = (i * 360) / 16;
                              const x = 50 + 45 * Math.cos((angle * Math.PI) / 180);
                              const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
                              return (
                                <circle
                                  key={i}
                                  cx={x}
                                  cy={y}
                                  r="3"
                                  fill="#fbbf24"
                                  opacity="0.6"
                                />
                              );
                            })}
                            {/* Círculo interior blanco */}
                            <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                          </svg>
                          
                          {/* Estela de brillo animada */}
                          <div className="absolute inset-0 overflow-hidden rounded-full">
                            <div className="seal-sweep absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%]">
                              <div className="w-full h-full bg-gradient-to-br from-transparent via-white/60 to-transparent"></div>
                            </div>
                          </div>
                          
                          {/* Contenido del sello */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center transform -rotate-12">
                              {/* Shield icon */}
                              <Shield className="w-10 h-10 text-white mx-auto mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" strokeWidth={3} />
                              {/* Texto "VERIFICADO" */}
                              <div className="text-[11px] font-black text-white leading-none tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ fontFamily: 'Impact, sans-serif' }}>
                                VERIFICADO
                              </div>
                              {/* Año */}
                              <div className="text-[8px] font-bold text-white/90 mt-0.5 tracking-wide">
                                2026
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-2xl bg-gray-200 flex items-center justify-center">
                      <Shield className="w-24 h-24 text-gray-400" />
                    </div>
                  )}
                  {/* Información del Animal */}
                  <div className="mt-6 text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 text-shadow-soft">{result.animal_name}</h3>
                    <p className="text-lg md:text-xl text-gray-600 font-semibold">{result.animal_type}</p>
                  </div>
                </div>

                {/* Información del Certificado - Optimizado */}
                <div className="space-y-4">
                  {/* Propietario */}
                  {result.owner_name && (
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Propietario</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900">{result.owner_name}</p>
                        {(result.owner_phone || result.owner_email) && (
                          <div className="mt-3 space-y-2 pt-3 border-t border-gray-200">
                            {result.owner_phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="font-semibold">Tel:</span>
                                <span>{result.owner_phone}</span>
                              </div>
                            )}
                            {result.owner_email && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="font-semibold">Email:</span>
                                <span className="break-all">{result.owner_email}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ID y Consulta */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wide">ID Certificación</p>
                      <p className="text-sm font-mono font-bold text-gray-900 break-all">{result.cert_id}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wide">Consultado</p>
                      <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('es-CO')}</p>
                    </div>
                  </div>

                  {/* Clasificación y Tipo de Servicio con gradiente Apple */}
                  <div className="relative gradient-apple-green rounded-3xl p-6 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer opacity-20"></div>
                    
                    {/* Clasificación Principal */}
                    <div className="relative text-center mb-5 pb-4 border-b-2 border-white/30">
                      <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2 text-shadow-soft leading-tight">
                        {result.program_type === 'Apoyo Emocional' 
                          ? 'ANIMAL DE SOPORTE EMOCIONAL'
                          : result.program_type === 'Servicio' || result.program_type === 'Lazarillo (Guía)' || result.program_type === 'Alerta Médica' || result.program_type === 'Asistencia Psiquiátrica'
                          ? 'PERRO DE SERVICIO'
                          : 'EVALUACIÓN CONDUCTUAL'}
                      </p>
                      <p className="text-sm text-white/90 uppercase tracking-wider font-bold">
                        {result.program_type === 'Apoyo Emocional' 
                          ? 'Emotional Support Animal (ESA)'
                          : result.program_type === 'Servicio' || result.program_type === 'Lazarillo (Guía)' || result.program_type === 'Alerta Médica' || result.program_type === 'Asistencia Psiquiátrica'
                          ? 'Service Dog'
                          : 'Behavioral Evaluation'}
                      </p>
                    </div>
                    
                    {/* Tipo de Programa Específico */}
                    <div className="relative flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
                      <Shield className="w-7 h-7 text-white flex-shrink-0 drop-shadow-lg" strokeWidth={2.5} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white/80 uppercase tracking-wide mb-1">Programa de Entrenamiento</p>
                        <p className="text-lg md:text-xl font-black text-white truncate">{result.program_type}</p>
                      </div>
                    </div>
                    
                    {/* Nota Legal */}
                    <div className="relative pt-4 border-t border-white/30">
                      <p className="text-xs text-white/90 leading-relaxed font-medium">
                        {result.program_type === 'Apoyo Emocional' 
                          ? 'Los animales de soporte emocional no tienen derechos de acceso público garantizados bajo la ley colombiana. Su función principal es proporcionar compañía y apoyo emocional.'
                          : result.program_type === 'Servicio' || result.program_type === 'Lazarillo (Guía)' || result.program_type === 'Alerta Médica' || result.program_type === 'Asistencia Psiquiátrica'
                          ? 'Los perros de servicio tienen derechos de acceso público según la legislación vigente y están entrenados para realizar tareas específicas en beneficio de personas con discapacidad.'
                          : 'Certificación que valida la evaluación del comportamiento y temperamento del animal.'}
                      </p>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-1 mb-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <p className="text-xs font-bold text-gray-500 uppercase">Emisión</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{formatDate(result.issued_at)}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-1 mb-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <p className="text-xs font-bold text-gray-500 uppercase">Vigencia</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {result.valid_until ? formatDate(result.valid_until) : 'Indefinida'}
                      </p>
                    </div>
                  </div>

                  {/* Detalles y Funciones del Entrenamiento */}
                  {result.scope && (
                    <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                          <FileText className="w-6 h-6 md:w-7 md:h-7 text-gray-700" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm md:text-base font-bold text-gray-700 uppercase mb-2 tracking-wide">Funciones y Habilidades Certificadas</p>
                          <p className="text-sm md:text-base text-gray-900 leading-relaxed">{result.scope}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Registro de Vacunación - Optimizado para Móvil */}
                <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 ${
                  result.vaccination_record_url 
                    ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-green-400' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
                }`}>
                  <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                      result.vaccination_record_url 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      <Syringe className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-1 text-base md:text-lg flex flex-wrap items-center gap-2">
                        <span>Carnet de Vacunación</span>
                        {result.vaccination_record_url && (
                          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Disponible</span>
                        )}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {result.vaccination_record_url 
                          ? `Historial completo de vacunas y tratamientos de ${result.animal_name}`
                          : 'Registro de vacunación no disponible en este momento'
                        }
                      </p>
                    </div>
                  </div>
                  
                  {result.vaccination_record_url ? (
                    <a
                      href={result.vaccination_record_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`carnet-vacunas-${result.animal_name}-${result.cert_id}.pdf`}
                      className="w-full inline-flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 transform"
                    >
                      <Download className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                      <span className="text-sm md:text-lg">Descargar Carnet de Vacunas</span>
                    </a>
                  ) : (
                    <div className="w-full inline-flex items-center justify-center space-x-2 bg-gray-300 text-gray-600 font-semibold px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl cursor-not-allowed opacity-60">
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">No Disponible</span>
                    </div>
                  )}
                </div>

                {/* Sello de Autenticidad Profesional - Optimizado Móvil */}
                <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-2 border-green-400 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden shadow-lg">
                  {/* Patrón de fondo decorativo */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-green-600 rounded-full -translate-x-12 -translate-y-12 md:-translate-x-16 md:-translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-green-600 rounded-full translate-x-12 translate-y-12 md:translate-x-16 md:translate-y-16"></div>
                  </div>
                  
                  <div className="relative flex items-center gap-3 md:gap-4">
                    {/* Icono del sello */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border-3 md:border-4 border-white">
                        <Shield className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Información del sello */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 md:mb-1.5">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                        <h4 className="font-black text-green-900 text-sm md:text-lg leading-tight">CERTIFICACIÓN AUTENTICADA</h4>
                      </div>
                      <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3 leading-relaxed">
                        Este documento ha sido verificado y es válido conforme al sistema de registro nacional.
                      </p>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-300">
                        <p className="text-[10px] md:text-xs text-gray-600 mb-0.5">Código de Verificación</p>
                        <p className="font-mono font-bold text-green-900 text-xs md:text-sm tracking-wide break-all">{result.verification_code}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Línea decorativa inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400"></div>
                </div>

                {/* Botón Cerrar - Optimizado Móvil */}
                <button
                  onClick={() => {
                    setResult(null)
                    setCertId('')
                  }}
                  className="w-full btn-secondary py-3 md:py-4 text-base md:text-lg font-bold"
                >
                  Cerrar
                </button>
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

        {/* Barcode Scanner Modal */}
        {showBarcodeScanner && (
          <BarcodeScanner
            onScan={handleBarcodeScan}
            onClose={() => setShowBarcodeScanner(false)}
            onError={(msg) => setError(msg)}
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
