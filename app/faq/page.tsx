import FAQ from '@/components/home/FAQ'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
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
      <FAQ />
    </main>
  )
}
