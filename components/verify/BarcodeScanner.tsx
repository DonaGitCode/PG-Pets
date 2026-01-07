'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Camera, AlertCircle, Smartphone } from 'lucide-react'
import { BrowserMultiFormatReader, NotFoundException, Result } from '@zxing/library'

interface BarcodeScannerProps {
  onScan: (data: string) => void
  onClose: () => void
  onError: (error: string) => void
}

export default function BarcodeScanner({ onScan, onClose, onError }: BarcodeScannerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasCamera, setHasCamera] = useState(true)
  const [isReaderReady, setIsReaderReady] = useState(false)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const hasScannedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReaderReady(true), 100)
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
      const element = document.getElementById('barcode-video') as HTMLVideoElement | null
      if (!element) {
        console.error('Barcode video element not found')
        return
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Tu navegador no soporta acceso a la cámara')
        setHasCamera(false)
        onError('Navegador no compatible con cámara')
        setIsLoading(false)
        return
      }

      const codeReader = new BrowserMultiFormatReader()
      codeReaderRef.current = codeReader
      const devices: MediaDeviceInfo[] = await codeReader.listVideoInputDevices()
      const preferredDeviceId = devices.find((d: MediaDeviceInfo) => d.label?.toLowerCase().includes('back'))?.deviceId || devices[0]?.deviceId

      await codeReader.decodeFromVideoDevice(preferredDeviceId, 'barcode-video', (result: Result | undefined, err: unknown) => {
        if (result && !hasScannedRef.current) {
          hasScannedRef.current = true
          const text = result.getText().toUpperCase()
          onScan(text)
          stopScanner()
        }
        if (err && !(err instanceof NotFoundException)) {
          console.warn('Barcode scan error:', err)
        }
      })

      setIsLoading(false)
    } catch (err: any) {
      console.error('Barcode scanner error:', err)
      setHasCamera(false)
      setIsLoading(false)
      if (err?.message?.includes('NotAllowedError') || err?.message?.includes('Permission')) {
        setError('Permiso de cámara denegado. Por favor, permite el acceso a la cámara.')
        onError('Permiso de cámara denegado')
      } else if (err?.message?.includes('NotFoundError')) {
        setError('No se encontró ninguna cámara en tu dispositivo.')
        onError('Cámara no encontrada')
      } else {
        setError('Error al acceder a la cámara. Intenta de nuevo.')
        onError('Error de cámara')
      }
    }
  }

  const stopScanner = async () => {
    try {
      await codeReaderRef.current?.reset()
    } catch (err) {
      console.error('Error stopping barcode scanner:', err)
    }
  }

  const handleClose = async () => {
    await stopScanner()
    onClose()
  }

  const handleManualInput = async () => {
    await stopScanner()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Escanear Código de Barras</h2>
              <p className="text-sm text-gray-600">Coloca el código dentro del marco</p>
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
          <div className="relative">
            <video id="barcode-video" className="w-full rounded-lg" playsInline muted />
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
                <button onClick={handleManualInput} className="btn-primary">
                  Ingresar Código Manualmente
                </button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="mt-4 text-center">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                Coloca el código dentro del marco
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
          <div className="flex items-start space-x-3">
            <Smartphone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">Consejos para escanear:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Asegúrate de tener buena iluminación</li>
                <li>• Mantén el código dentro del marco</li>
                <li>• Mantén el dispositivo estable</li>
                <li>• Si no funciona, intenta ingresar el código manualmente</li>
              </ul>
            </div>
          </div>

          <button onClick={handleManualInput} className="w-full btn-secondary text-sm">
            Preferir Ingreso Manual
          </button>
        </div>
      </div>
    </div>
  )
}
