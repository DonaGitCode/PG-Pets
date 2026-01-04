import { Suspense } from 'react'
import VerificationCard from '@/components/verify/VerificationCard'

export const metadata = {
  title: 'Verificar Entrenamiento | Steady Guardians',
  description: 'Verifica la autenticidad de una certificación de entrenamiento mediante ID o código QR. Sistema de verificación pública para perros de asistencia.',
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <VerificationCard />
    </Suspense>
  )
}
