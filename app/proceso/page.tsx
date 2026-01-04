import Process from '@/components/home/Process'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProcesoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom section-padding py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* Content */}
      <Process />
    </main>
  )
}
