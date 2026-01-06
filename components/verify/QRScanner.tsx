'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Camera, AlertCircle, Smartphone } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode'

interface QRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
  onError: (error: string) => void
}

export default function QRScanner({ onScan, onClose, onError }: QRScannerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasCamera, setHasCamera] = useState(true)
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)
  const hasScannedRef = useRef(false)
  const [isReaderReady, setIsReaderReady] = useState(false)

  useEffect(() => {
    // Wait for the DOM element to be available
    const timer = setTimeout(() => {
      setIsReaderReady(true)
    }, 100)
    
    return () => {
      clearTimeout(timer)
      stopScanner()
    }
  }, [])

  useEffect(() => {
    if (isReaderReady) {
      startScanner()
    }
  }, [isReaderReady])

  const startScanner = async () => {
    try {
      // Check if the element exists
      const element = document.getElementById('qr-reader')
      if (!element) {
        console.error('QR reader element not found')
        return
      }

      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Tu navegador no soporta acceso a la cámara')
        setHasCamera(false)
        onError('Navegador no compatible con cámara')
        setIsLoading(false)
        return
      }

      // Initialize Html5Qrcode
      const html5QrCode = new Html5Qrcode('qr-reader')
      html5QrCodeRef.current = html5QrCode

      // Start scanning
      await html5QrCode.start(
        { facingMode: 'environment' }, // Use back camera on mobile
        {
          fps: 10, // Frames per second to scan
          qrbox: { width: 250, height: 250 } // Scanning box size
        },
        (decodedText) => {
          // Success callback when QR code is detected
          if (!hasScannedRef.current) {
            hasScannedRef.current = true
            console.log('QR Code detected:', decodedText)
            
            // Extraer solo el cert_id de la URL
            // Si es URL: http://localhost:3001/verify?id=SG-BOG-AM-X7K2N9P4
            // Si es solo código: SG-BOG-AM-X7K2N9P4
            let certId = decodedText
            try {
              const url = new URL(decodedText)
              const idParam = url.searchParams.get('id')
              if (idParam) {
                certId = idParam
              }
            } catch (e) {
              // No es una URL válida, usar el texto como está
              certId = decodedText.toUpperCase()
            }
            
            onScan(certId)
            stopScanner()
          }
        },
        (errorMessage) => {
          // Error callback - can be ignored (fires frequently when no QR is in view)
          // console.log('QR scan error:', errorMessage)
        }
      )

      setIsLoading(false)

    } catch (err) {
      console.error('Scanner error:', err)
      setHasCamera(false)
      setIsLoading(false)
      
      if (err instanceof Error) {
        if (err.message.includes('NotAllowedError') || err.message.includes('Permission')) {
          setError('Permiso de cámara denegado. Por favor, permite el acceso a la cámara.')
          onError('Permiso de cámara denegado')
        } else if (err.message.includes('NotFoundError')) {
          setError('No se encontró ninguna cámara en tu dispositivo.')
          onError('Cámara no encontrada')
        } else {
          setError('Error al acceder a la cámara. Intenta de nuevo.')
          onError('Error de cámara')
        }
      }
    }
  }

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop()
        html5QrCodeRef.current.clear()
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
    }
  }

  const handleManualInput = async () => {
    await stopScanner()
    onClose()
  }

  const handleClose = async () => {
    await stopScanner()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Escanear Código QR</h2>
              <p className="text-sm text-gray-600">Coloca el código QR dentro del marco</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {/* QR Reader Container - Always visible for the library to work */}
          <div className="relative">
            <div id="qr-reader" className="w-full rounded-lg overflow-hidden"></div>
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <svg className="animate-spin h-10 w-10 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm">Iniciando cámara...</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center p-6 mt-4">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">Error de Cámara</p>
                <p className="text-sm text-gray-600 mb-6">{error}</p>
                <button
                  onClick={handleManualInput}
                  className="btn-primary"
                >
                  Ingresar ID Manualmente
                </button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="mt-4 text-center">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                Coloca el QR dentro del marco
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
          <div className="flex items-start space-x-3">
            <Smartphone className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">Consejos para escanear:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Asegúrate de tener buena iluminación</li>
                <li>• Mantén el QR dentro del marco</li>
                <li>• Mantén el dispositivo estable</li>
                <li>• Si no funciona, intenta ingresar el ID manualmente</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleManualInput}
            className="w-full btn-secondary text-sm"
          >
            Preferir Ingreso Manual
          </button>
        </div>
      </div>
    </div>
  )
}