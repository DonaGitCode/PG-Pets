import { ClipboardList, Dumbbell, FileCheck } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: ClipboardList,
      title: 'Evaluación Inicial y Clasificación',
      description: 'Evaluación conductual profesional GRATUITA para determinar si tu perro es candidato para Perro de Servicio (tareas específicas) o Perro de Soporte Emocional (acompañamiento), según aptitudes y necesidades del tutor.',
      details: [
        'Evaluación de temperamento y aptitudes funcionales',
        'Análisis de necesidades específicas del tutor (médicas, físicas, emocionales)',
        'Clasificación recomendada: Servicio vs. Soporte Emocional',
        'Plan personalizado con duración y objetivos claros',
        'Revisión de leyes aplicables (Ley 1618/2013 Colombia si aplica)'
      ]
    },
    {
      number: '02',
      icon: Dumbbell,
      title: 'Entrenamiento Especializado por Clasificación',
      description: 'Implementación del programa correspondiente con metodología de refuerzo positivo. PERROS DE SERVICIO: entrenamiento en tareas funcionales medibles. PERROS DE SOPORTE EMOCIONAL: desarrollo de temperamento equilibrado y presencia calmante.',
      details: [
        'Servicio: Tareas específicas documentadas (ej. alertar crisis, asistir movilidad)',
        'Soporte: Socialización avanzada y comportamiento público apropiado',
        'Evaluaciones de progreso periódicas con métricas objetivas',
        'Ajustes según progreso individual del binomio',
        'Métodos éticos certificados (IAABC, AVSAB)'
      ]
    },
    {
      number: '03',
      icon: FileCheck,
      title: 'Certificación, Registro y Verificación Pública',
      description: 'Emisión de informe profesional detallado y registro con ID único verificable públicamente. Incluye orientación sobre derechos de acceso según leyes colombianas (Ley 1618/2013 para Servicio) y políticas de establecimientos.',
      details: [
        'Informe técnico especificando clasificación y tareas/capacidades',
        'ID único SG-NAR-YYYY-XXXXXX con código QR',
        'Verificación pública en steadyguardians.com/verify',
        'Guía de derechos legales según clasificación (Servicio vs. Soporte)',
        'Protocolo de mantenimiento y refuerzo continuo'
      ]
    }
  ]

  return (
    <section id="proceso" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Proceso Profesional de Entrenamiento
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Un proceso estructurado que distingue claramente entre <strong>Perros de Servicio</strong> (tareas funcionales específicas) 
            y <strong>Perros de Soporte Emocional</strong> (acompañamiento y estabilidad), garantizando 
            documentación verificable y cumplimiento de normativas colombianas aplicables.
          </p>
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            <FileCheck className="w-4 h-4" />
            <span>Basado en Ley 1618/2013 (Colombia) y mejores prácticas internacionales</span>
          </div>
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
