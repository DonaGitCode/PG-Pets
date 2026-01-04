import { ClipboardList, Dumbbell, FileCheck } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: ClipboardList,
      title: 'Entrevista y Evaluación Inicial',
      description: 'Realizamos una evaluación completa del perro y una entrevista detallada con el tutor para entender las necesidades específicas y determinar el programa más adecuado.',
      details: [
        'Evaluación de temperamento',
        'Análisis de necesidades del tutor',
        'Recomendación de programa',
        'Plan personalizado'
      ]
    },
    {
      number: '02',
      icon: Dumbbell,
      title: 'Entrenamiento y Seguimiento',
      description: 'Implementamos el programa de entrenamiento especializado con sesiones regulares, seguimiento continuo y ajustes según el progreso del binomio perro-tutor.',
      details: [
        'Sesiones de entrenamiento especializadas',
        'Evaluaciones de progreso',
        'Ajustes personalizados',
        'Acompañamiento constante'
      ]
    },
    {
      number: '03',
      icon: FileCheck,
      title: 'Informe Profesional + Verificación ID/QR',
      description: 'Al completar el programa, emitimos un informe profesional detallado y generamos un registro con ID único verificable mediante QR para validación pública.',
      details: [
        'Informe técnico completo',
        'Certificación de programa',
        'ID único SG-NAR-YYYY-XXXXXX',
        'QR de verificación pública'
      ]
    }
  ]

  return (
    <section id="proceso" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Proceso de Trabajo
          </h2>
          <p className="text-lg text-gray-600">
            Un proceso estructurado y profesional que garantiza resultados reales 
            y documentación verificable del entrenamiento completado.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connection Line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-600 to-primary-300"></div>
                )}

                <div className="card p-8 relative h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
