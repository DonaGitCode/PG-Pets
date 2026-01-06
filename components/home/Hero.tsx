import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom section-padding py-20 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Entrenamiento Profesional Certificado</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Entrenamiento profesional de{' '}
              <span className="text-primary-600">perros de asistencia</span> y alerta médica
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              <strong className="text-gray-900">Steady Guardians</strong> ·  Bogotá, Colombia. <br></br>
              Cobertura nacional con programas de entrenamiento, evaluación conductual y verificación por ID/QR 
              para perros de apoyo emocional, servicio, lazarillo y alerta médica.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Entrenamiento especializado</h3>
                  <p className="text-sm text-gray-600">Programas adaptados a cada necesidad</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verificación pública</h3>
                  <p className="text-sm text-gray-600">Sistema de ID/QR validado</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Bienestar animal</h3>
                  <p className="text-sm text-gray-600">Métodos éticos y positivos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Cobertura nacional</h3>
                  <p className="text-sm text-gray-600">Sede en Bogotá</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#contacto" className="btn-primary inline-flex items-center justify-center text-center px-6 py-3 whitespace-nowrap">
                <span>Agendar Evaluación</span>
                <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
              </Link>
              <Link href="/verify" className="btn-secondary inline-flex items-center justify-center text-center px-6 py-3 whitespace-nowrap">
                Verificar Entrenamiento
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200"
              alt="Perro de asistencia entrenado profesionalmente"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
