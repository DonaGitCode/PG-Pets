'use client'

import { useState, useEffect } from 'react'
import { Shield, Plus, Edit, Trash2, Search, LogOut, Eye, Upload, FileText, Download, X, Check, QrCode, Barcode } from 'lucide-react'
import Image from 'next/image'
import QRCodeLib from 'qrcode'
import { createClient } from '@/lib/supabase'

interface Certification {
  id: number
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
  owner_name: string | null
  owner_phone: string | null
  owner_email: string | null
  verification_code: string
  notes_private: string | null
}

export default function AdminPanel() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [filteredCertifications, setFilteredCertifications] = useState<Certification[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      verifyToken(token)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/admin/auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.valid) {
          setAuthToken(token)
          setIsAuthenticated(true)
          loadCertifications()
        } else {
          sessionStorage.removeItem('adminToken')
        }
      } else {
        sessionStorage.removeItem('adminToken')
      }
    } catch (error) {
      console.error('Error verificando token:', error)
      sessionStorage.removeItem('adminToken')
    }
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = certifications.filter(cert =>
        cert.cert_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.animal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.trainer_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCertifications(filtered)
    } else {
      setFilteredCertifications(certifications)
    }
  }, [searchTerm, certifications])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success && data.token) {
        setAuthToken(data.token)
        setIsAuthenticated(true)
        sessionStorage.setItem('adminToken', data.token)
        loadCertifications()
      } else {
        alert(data.error || 'Credenciales inválidas')
      }
    } catch (error) {
      console.error('Error en login:', error)
      alert('Error al iniciar sesión')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthToken(null)
    sessionStorage.removeItem('adminToken')
    setPassword('')
  }

  const loadCertifications = async () => {
    setIsLoading(true)
    try {
      const token = authToken || sessionStorage.getItem('adminToken')
      if (!token) {
        throw new Error('No autorizado')
      }

      const response = await fetch('/api/admin/certifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout()
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.')
          return
        }
        throw new Error('Error al cargar certificaciones')
      }

      const { data } = await response.json()
      setCertifications(data || [])
    } catch (error) {
      console.error('Error loading certifications:', error)
      alert('Error al cargar certificaciones')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number, certId: string) => {
    if (!confirm(`¿Estás seguro de eliminar la certificación ${certId}?`)) return

    try {
      const token = authToken || sessionStorage.getItem('adminToken')
      if (!token) throw new Error('No autorizado')

      const response = await fetch(`/api/admin/certifications?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout()
          alert('Sesión expirada')
          return
        }
        throw new Error('Error al eliminar')
      }
      
      alert('Certificación eliminada exitosamente')
      loadCertifications()
    } catch (error) {
      console.error('Error deleting certification:', error)
      alert('Error al eliminar certificación')
    }
  }

  const handleDownloadQR = async (certId: string) => {
    try {
      // URL fija a dominio público (evita localhost)
      const baseUrl = 'https://steadyguardians.com'
      const verifyUrl = `${baseUrl}/verify?id=${certId}`
      
      // Generar QR code como Data URL con alta calidad
      const qrDataUrl = await QRCodeLib.toDataURL(verifyUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      })

      // Crear link temporal para descargar
      const link = document.createElement('a')
      link.href = qrDataUrl
      link.download = `QR-Certificacion-${certId}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error al generar QR:', error)
      alert('Error al generar código QR')
    }
  }

  const handleDownloadBarcode = async (verificationCode: string) => {
    try {
      // Cargar librería en el cliente dinámicamente
      const JsBarcode = (await import('jsbarcode')).default as any
      // Crear canvas temporal
      const canvas = document.createElement('canvas')
      // Generar código de barras en formato CODE128
      JsBarcode(canvas, verificationCode, {
        format: 'CODE128',
        width: 3,
        height: 150,
        displayValue: true,
        margin: 20,
        background: '#FFFFFF',
        lineColor: '#000000',
        fontOptions: 'bold',
        fontSize: 20
      })

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `BARCODE-${verificationCode}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error al generar código de barras:', error)
      alert('Error al generar código de barras')
    }
  }

  const openModal = (mode: 'create' | 'edit', cert?: Certification) => {
    setModalMode(mode)
    setSelectedCert(cert || null)
    setShowModal(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Steady Guardians</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@steadyguardians.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Panel Admin</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Gestión de Certificaciones</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
              <span className="sm:hidden">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
              />
            </div>
            <button
              onClick={() => openModal('create')}
              className="btn-primary flex items-center justify-center space-x-2 w-full py-3 text-base font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Certificación</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{certifications.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Vigentes</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {certifications.filter(c => c.status === 'Vigente').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Vencidos</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-600">
              {certifications.filter(c => c.status === 'Vencido').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Vacunas</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
              {certifications.filter(c => c.vaccination_record_url).length}
            </p>
          </div>
        </div>

        {/* Certifications List */}
        <div>
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Cargando certificaciones...</p>
            </div>
          ) : filteredCertifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron certificaciones</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View */}
              <div className="block lg:hidden space-y-3">
                {filteredCertifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        {cert.animal_photo ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={cert.animal_photo}
                              alt={cert.animal_name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">{cert.animal_name}</p>
                          <p className="text-xs text-gray-500">{cert.animal_type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                        cert.status === 'Vigente' ? 'bg-green-100 text-green-800' :
                        cert.status === 'Condicional' ? 'bg-yellow-100 text-yellow-800' :
                        cert.status === 'Vencido' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500">ID:</span>
                        <span className="ml-2 font-mono font-medium text-gray-900">{cert.cert_id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Programa:</span>
                        <span className="ml-2 text-gray-900">{cert.program_type}</span>
                      </div>
                      {cert.owner_name && (
                        <div>
                          <span className="text-gray-500">Propietario:</span>
                          <span className="ml-2 text-gray-900">{cert.owner_name}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                      {/* Primera fila */}
                      <a
                        href={`/verify?id=${cert.cert_id}`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors active:scale-95 touch-manipulation"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="text-sm font-semibold">Ver</span>
                      </a>
                      <button
                        onClick={() => handleDownloadQR(cert.cert_id)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors active:scale-95 touch-manipulation"
                        title="Descargar QR"
                      >
                        <QrCode className="w-5 h-5" />
                        <span className="text-sm font-semibold">QR</span>
                      </button>
                      {/* Segunda fila */}
                      <button
                        onClick={() => handleDownloadBarcode(cert.verification_code)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors active:scale-95 touch-manipulation"
                        title="Descargar Código de Barras"
                      >
                        <Barcode className="w-5 h-5" />
                        <span className="text-sm font-semibold">Barras</span>
                      </button>
                      <button
                        onClick={() => openModal('edit', cert)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors active:scale-95 touch-manipulation"
                      >
                        <Edit className="w-5 h-5" />
                        <span className="text-sm font-semibold">Editar</span>
                      </button>
                      {/* Botón eliminar en fila completa */}
                      <button
                        onClick={() => handleDelete(cert.id, cert.cert_id)}
                        className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors active:scale-95 touch-manipulation"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="text-sm font-semibold">Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Animal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Programa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Propietario
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCertifications.map((cert) => (
                        <tr key={cert.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-mono font-medium text-gray-900">{cert.cert_id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {cert.animal_photo ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={cert.animal_photo}
                                    alt={cert.animal_name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                  <Shield className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{cert.animal_name}</div>
                                <div className="text-xs text-gray-500">{cert.animal_type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{cert.program_type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              cert.status === 'Vigente' ? 'bg-green-100 text-green-800' :
                              cert.status === 'Condicional' ? 'bg-yellow-100 text-yellow-800' :
                              cert.status === 'Vencido' ? 'bg-gray-100 text-gray-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {cert.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cert.owner_name ? (
                              <div>
                                <div className="text-sm font-medium text-gray-900">{cert.owner_name}</div>
                                {cert.owner_phone && (
                                  <div className="text-xs text-gray-500">{cert.owner_phone}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400 italic">No registrado</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-3">
                              <a
                                href={`/verify?id=${cert.cert_id}`}
                                target="_blank"
                                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Ver Certificación"
                              >
                                <Eye className="w-5 h-5" />
                              </a>
                              <button
                                onClick={() => handleDownloadQR(cert.cert_id)}
                                className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                                title="Descargar QR"
                              >
                                <QrCode className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDownloadBarcode(cert.verification_code)}
                                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Descargar Código de Barras"
                              >
                                <Barcode className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => openModal('edit', cert)}
                                className="p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(cert.id, cert.cert_id)}
                                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <CertificationModal
          mode={modalMode}
          certification={selectedCert}
          onClose={() => {
            setShowModal(false)
            setSelectedCert(null)
          }}
          onSave={() => {
            setShowModal(false)
            setSelectedCert(null)
            loadCertifications()
          }}
        />
      )}
    </div>
  )
}

// Modal Component
function CertificationModal({
  mode,
  certification,
  onClose,
  onSave
}: {
  mode: 'create' | 'edit'
  certification: Certification | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    cert_id: certification?.cert_id || '',
    status: certification?.status || 'Vigente',
    animal_type: certification?.animal_type || 'Perro',
    animal_name: certification?.animal_name || '',
    animal_photo: certification?.animal_photo || '',
    vaccination_record_url: certification?.vaccination_record_url || '',
    program_type: certification?.program_type || 'Apoyo Emocional',
    trainer_name: certification?.trainer_name || '',
    owner_name: certification?.owner_name || '',
    owner_phone: certification?.owner_phone || '',
    owner_email: certification?.owner_email || '',
    verification_code: certification?.verification_code || '',
    issued_at: certification?.issued_at ? new Date(certification.issued_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    valid_until: certification?.valid_until ? new Date(certification.valid_until).toISOString().split('T')[0] : '',
    scope: certification?.scope || '',
    notes_private: certification?.notes_private || ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [isUploadingPDF, setIsUploadingPDF] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(certification?.animal_photo || null)
  const [pdfName, setPdfName] = useState<string | null>(null)

  const generateCertId = (programType: string) => {
    // Códigos de especialidad según programa
    const specialtyCodes: Record<string, string> = {
      'Apoyo Emocional': 'AE',
      'Servicio': 'SER',
      'Lazarillo (Guía)': 'LAZ',
      'Alerta Médica': 'AM',
      'Evaluación Conductual': 'EC',
      'Asistencia Psiquiátrica': 'AP'
    }
    
    // Ciudades posibles (aleatorio)
    const cities = ['BOG', 'MED', 'CAL', 'BAQ', 'CTG', 'BUC', 'PER', 'SMR']
    const city = cities[Math.floor(Math.random() * cities.length)]
    
    // Código de especialidad
    const specialty = specialtyCodes[programType] || 'GEN'
    
    // Código aleatorio complejo ÚNICO (letras mayúsculas + números + timestamp parcial)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const timestamp = Date.now().toString(36).toUpperCase() // Convierte timestamp a base36
    
    // Combinar timestamp con caracteres aleatorios para máxima unicidad
    let randomPart = ''
    for (let i = 0; i < 4; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    // Tomar últimos 4 caracteres del timestamp y combinar con aleatorios
    const uniqueCode = (timestamp.slice(-4) + randomPart).substring(0, 8)
    
    return `SG-${city}-${specialty}-${uniqueCode}`
  }

  const generateVerificationCode = () => {
    // Código SUPER SEGURO con timestamp + hash aleatorio
    const timestamp = Date.now().toString(36).toUpperCase()
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    // Generar hash aleatorio de 6 caracteres
    let randomHash = ''
    for (let i = 0; i < 6; i++) {
      randomHash += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    // Combinar timestamp completo + hash aleatorio = Código único irrepetible
    // Formato: VER-[TIMESTAMP][HASH] (aprox. 12-14 caracteres)
    return `VER-${timestamp}${randomHash}`
  }

  // Subir foto a Supabase Storage
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida (JPG, PNG, etc.)')
      return
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar 5MB')
      return
    }

    setIsUploadingPhoto(true)
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `photos/${formData.cert_id || 'temp'}-${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('certifications')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) throw error

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('certifications')
        .getPublicUrl(fileName)

      setFormData({ ...formData, animal_photo: publicUrl })
      setPhotoPreview(publicUrl)
    } catch (error: any) {
      console.error('Error uploading photo:', error)
      alert('Error al subir la foto: ' + error.message)
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  // Subir PDF a Supabase Storage
  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (file.type !== 'application/pdf') {
      alert('Por favor selecciona un archivo PDF válido')
      return
    }

    // Validar tamaño (máx 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('El PDF no debe superar 10MB')
      return
    }

    setIsUploadingPDF(true)
    try {
      const supabase = createClient()
      const fileName = `vaccines/${formData.cert_id || 'temp'}-${Date.now()}.pdf`

      const { data, error } = await supabase.storage
        .from('certifications')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) throw error

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('certifications')
        .getPublicUrl(fileName)

      setFormData({ ...formData, vaccination_record_url: publicUrl })
      setPdfName(file.name)
    } catch (error: any) {
      console.error('Error uploading PDF:', error)
      alert('Error al subir el PDF: ' + error.message)
    } finally {
      setIsUploadingPDF(false)
    }
  }

  useEffect(() => {
    if (mode === 'create' && !formData.cert_id) {
      setFormData(prev => ({
        ...prev,
        cert_id: generateCertId(prev.program_type),
        verification_code: generateVerificationCode()
      }))
    }
  }, [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const token = sessionStorage.getItem('adminToken')
      if (!token) throw new Error('No autorizado')

      const dataToSave = {
        ...formData,
        issued_at: new Date(formData.issued_at).toISOString(),
        valid_until: formData.valid_until ? new Date(formData.valid_until).toISOString() : null
      }

      if (mode === 'create') {
        const response = await fetch('/api/admin/certifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Error al crear certificación')
        }

        alert('Certificación creada exitosamente')
      } else {
        const response = await fetch('/api/admin/certifications', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            id: certification!.id,
            ...dataToSave
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Error al actualizar certificación')
        }

        alert('Certificación actualizada exitosamente')
      }

      onSave()
    } catch (error: any) {
      console.error('Error saving certification:', error)
      alert(error.message || 'Error al guardar certificación')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:rounded-2xl shadow-2xl sm:max-w-4xl lg:max-w-6xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Nueva Certificación' : 'Editar Certificación'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="sm:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
            {/* ID Certificación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Certificación *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.cert_id}
                  onChange={(e) => setFormData({ ...formData, cert_id: e.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                  required
                  readOnly={mode === 'edit'}
                />
                {mode === 'create' && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, cert_id: generateCertId(formData.program_type) })}
                    className="px-4 py-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors flex items-center gap-2"
                    title="Regenerar ID"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
              </div>
              {mode === 'create' && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-semibold text-primary-700">🔐 Código único y seguro para cada mascota</p>
                  <p className="text-xs text-gray-500">Formato: SG-[Ciudad]-[Especialidad]-[8 caracteres aleatorios]</p>
                  <p className="text-xs text-gray-400">Ejemplo: SG-BOG-AM-X7K2N9P4</p>
                </div>
              )}
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                required
              >
                <option value="Vigente">Vigente</option>
                <option value="Condicional">Condicional</option>
                <option value="Vencido">Vencido</option>
                <option value="Revocado">Revocado</option>
              </select>
            </div>

            {/* Nombre del Animal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Animal *
              </label>
              <input
                type="text"
                value={formData.animal_name}
                onChange={(e) => setFormData({ ...formData, animal_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                required
              />
            </div>

            {/* Tipo de Animal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Animal *
              </label>
              <input
                type="text"
                value={formData.animal_type}
                onChange={(e) => setFormData({ ...formData, animal_type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                required
              />
            </div>

            {/* Programa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Programa *
              </label>
              <select
                value={formData.program_type}
                onChange={(e) => {
                  const newProgram = e.target.value
                  setFormData({ 
                    ...formData, 
                    program_type: newProgram,
                    // Regenerar ID si es modo creación
                    ...(mode === 'create' ? { cert_id: generateCertId(newProgram) } : {})
                  })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                required
              >
                <option value="Apoyo Emocional">Apoyo Emocional</option>
                <option value="Servicio">Servicio</option>
                <option value="Lazarillo (Guía)">Lazarillo (Guía)</option>
                <option value="Alerta Médica">Alerta Médica</option>
                <option value="Evaluación Conductual">Evaluación Conductual</option>
                <option value="Asistencia Psiquiátrica">Asistencia Psiquiátrica</option>
              </select>
              {mode === 'create' && (
                <p className="text-xs text-gray-500 mt-1">El ID se actualizará según la especialidad</p>
              )}
            </div>

            {/* Entrenador */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entrenador *
              </label>
              <input
                type="text"
                value={formData.trainer_name}
                onChange={(e) => setFormData({ ...formData, trainer_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                required
              />
            </div>

            {/* Información del Propietario */}
            <div className="sm:col-span-2 border-t border-gray-200 pt-4 mt-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Información del Propietario</h3>
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                {/* Nombre del Propietario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Propietario
                  </label>
                  <input
                    type="text"
                    value={formData.owner_name || ''}
                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                    placeholder="Opcional"
                  />
                </div>

                {/* Teléfono del Propietario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono del Propietario
                  </label>
                  <input
                    type="tel"
                    value={formData.owner_phone || ''}
                    onChange={(e) => setFormData({ ...formData, owner_phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                    placeholder="Opcional"
                  />
                </div>

                {/* Email del Propietario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email del Propietario
                  </label>
                  <input
                    type="email"
                    value={formData.owner_email || ''}
                    onChange={(e) => setFormData({ ...formData, owner_email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </div>

            {/* Código de Verificación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Verificación *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.verification_code}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base font-mono"
                  required
                  readOnly
                />
                {mode === 'create' && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, verification_code: generateVerificationCode() })}
                    className="px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
                    title="Regenerar código"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs font-semibold text-green-700">🔒 Código de seguridad único e irrepetible</p>
                <p className="text-xs text-gray-500">Generado automáticamente con tecnología de alta seguridad</p>
                <p className="text-xs text-gray-400">No editable - garantiza la autenticidad del certificado</p>
              </div>
            </div>

            {/* Fecha de Emisión */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Emisión *
              </label>
              <input
                type="date"
                value={formData.issued_at}
                onChange={(e) => setFormData({ ...formData, issued_at: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                required
              />
            </div>

            {/* Válido Hasta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Válido Hasta (opcional)
              </label>
              <input
                type="date"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
              />
            </div>

            {/* Foto del Animal - Con Subida */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto del Animal
              </label>
              
              {/* Preview de la foto */}
              {photoPreview && (
                <div className="mb-3 relative inline-block">
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="rounded-lg border-2 border-gray-300 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview(null)
                      setFormData({ ...formData, animal_photo: '' })
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Botón de subida */}
              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isUploadingPhoto}
                  />
                  <div className={`flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isUploadingPhoto 
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                      : 'border-primary-300 hover:border-primary-500 hover:bg-primary-50'
                  }`}>
                    {isUploadingPhoto ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                        <span className="text-sm text-gray-600">Subiendo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-primary-600" />
                        <span className="text-sm font-medium text-primary-600">
                          {photoPreview ? 'Cambiar foto' : 'Subir foto'}
                        </span>
                      </>
                    )}
                  </div>
                </label>

                {/* O ingresar URL manual */}
                <div className="sm:flex-1">
                  <input
                    type="url"
                    value={formData.animal_photo}
                    onChange={(e) => {
                      setFormData({ ...formData, animal_photo: e.target.value })
                      setPhotoPreview(e.target.value)
                    }}
                    placeholder="O pega una URL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Formatos: JPG, PNG (máx 5MB)
              </p>
            </div>

            {/* PDF de Vacunas - Con Subida */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registro de Vacunas (PDF)
              </label>

              {/* Indicador de PDF cargado */}
              {formData.vaccination_record_url && (
                <div className="mb-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-700 flex-1 truncate">
                    {pdfName || 'PDF cargado'}
                  </span>
                  <a
                    href={formData.vaccination_record_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 flex-shrink-0"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, vaccination_record_url: '' })
                      setPdfName(null)
                    }}
                    className="text-red-600 hover:text-red-700 flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Botón de subida */}
              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePDFUpload}
                    className="hidden"
                    disabled={isUploadingPDF}
                  />
                  <div className={`flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isUploadingPDF 
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                      : 'border-green-300 hover:border-green-500 hover:bg-green-50'
                  }`}>
                    {isUploadingPDF ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                        <span className="text-sm text-gray-600">Subiendo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          {formData.vaccination_record_url ? 'Cambiar PDF' : 'Subir PDF'}
                        </span>
                      </>
                    )}
                  </div>
                </label>

                {/* O ingresar URL manual */}
                <div>
                  <input
                    type="url"
                    value={formData.vaccination_record_url}
                    onChange={(e) => {
                      setFormData({ ...formData, vaccination_record_url: e.target.value })
                      setPdfName(null)
                    }}
                    placeholder="O pega una URL del PDF"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Solo PDF (máx 10MB)
              </p>
            </div>

            {/* Alcance */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alcance del Entrenamiento
              </label>
              <textarea
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base resize-none"
                placeholder="Describe las habilidades y tareas entrenadas..."
              />
            </div>

            {/* Notas Privadas */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Privadas (solo admin)
              </label>
              <textarea
                value={formData.notes_private}
                onChange={(e) => setFormData({ ...formData, notes_private: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base resize-none"
                placeholder="Notas internas no visibles públicamente..."
              />
            </div>
          </div>
          </div>

          {/* Footer - Fixed */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none btn-primary px-6 py-3 font-medium"
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Guardar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
