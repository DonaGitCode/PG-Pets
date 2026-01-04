import FAQ from '@/components/home/FAQ'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom section-padding py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Inicio</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <FAQ />
      
      {/* Spacer before footer */}
      <div className="h-16 md:h-24"></div>
    </main>
  )
}
