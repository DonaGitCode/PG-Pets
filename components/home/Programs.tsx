import Image from 'next/image'
import { Heart, Briefcase, Eye, Activity, ClipboardCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Programs() {
  const programs = [
    {
      id: 'apoyo-emocional',
      title: 'Entrenamiento de Perros de Apoyo Emocional',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800',
      description: 'Programa enfocado en el desarrollo de habilidades para brindar apoyo emocional y estabilidad al tutor.',
      features: [
        'Estabilidad emocional continua',
        'Rutinas de calma y relajación',
        'Manejo apropiado en espacios públicos',
        'Fortalecimiento del vínculo tutor-perro'
      ],
      target: 'Personas que requieren apoyo emocional constante, manejo de ansiedad o acompañamiento terapéutico.',
      duration: '8-12 semanas',
      deliverables: [
        'Informe profesional de entrenamiento',
        'Registro con ID único verificable',
        'Certificación de programa completado',
        'Recomendaciones de mantenimiento'
      ]
    },
    {
      id: 'servicio',
      title: 'Entrenamiento de Perros de Servicio',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
      description: 'Entrenamiento avanzado para perros que asisten a personas con discapacidades físicas o funcionales.',
      features: [
        'Obediencia avanzada y control total',
        'Acceso público responsable',
        'Control bajo estímulos intensos',
        'Asistencia funcional específica al tutor'
      ],
      target: 'Personas con discapacidades físicas que requieren asistencia funcional en actividades diarias.',
      duration: '12-20 semanas',
      deliverables: [
        'Informe técnico detallado',
        'Registro verificable con ID/QR',
        'Documentación de tareas específicas',
        'Plan de reentrenamiento'
      ]
    },
    {
      id: 'lazarillo',
      title: 'Entrenamiento de Perros Lazarillo (Guía)',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&q=80&w=800',
      description: 'Programa intensivo para formar perros guía capacitados en navegación segura y detección de riesgos.',
      features: [
        'Guiado seguro y preciso',
        'Detención automática ante riesgos',
        'Navegación urbana compleja',
        'Enfoque y disciplina continua'
      ],
      target: 'Personas con discapacidad visual o ceguera que requieren movilidad independiente.',
      duration: '16-24 semanas',
      deliverables: [
        'Certificación de movilidad',
        'Informe de rutas entrenadas',
        'Registro con verificación pública',
        'Manual de trabajo en equipo'
      ]
    },
    {
      id: 'alerta-medica',
      title: 'Entrenamiento de Perros de Alerta Médica',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&q=80&w=800',
      description: 'Entrenamiento especializado para detectar y alertar condiciones médicas específicas del tutor.',
      features: [
        'Alerta de crisis epilépticas',
        'Alerta de hipoglucemia/diabetes',
        'Alerta de ansiedad o pánico',
        'Respuesta entrenada ante síntomas específicos'
      ],
      target: 'Personas con epilepsia, diabetes, trastornos de ansiedad u otras condiciones médicas que requieren alerta temprana.',
      duration: '10-18 semanas',
      deliverables: [
        'Informe médico de capacidades',
        'Registro de alertas documentadas',
        'Verificación ID/QR',
        'Protocolo de emergencia'
      ]
    },
    {
      id: 'evaluacion',
      title: 'Evaluación Conductual Profesional',
      icon: ClipboardCheck,
      image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&q=80&w=800',
      description: 'Evaluación inicial completa para determinar aptitudes y recomendar el programa adecuado.',
      features: [
        'Diagnóstico de aptitud y temperamento',
        'Recomendación de programa específico',
        'Informe técnico profesional',
        'Orientación personalizada'
      ],
      target: 'Tutores que desean conocer las capacidades de su perro antes de iniciar un programa formal.',
      duration: '1-2 sesiones',
      deliverables: [
        'Informe técnico de evaluación',
        'Recomendación de programa',
        'Plan de entrenamiento sugerido',
        'Registro de evaluación'
      ]
    }
  ]

  return (
    <section id="programas" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Programas de Entrenamiento
          </h2>
          <p className="text-lg text-gray-600">
            Programas especializados diseñados para desarrollar las habilidades necesarias 
            en cada tipo de asistencia canina, con enfoque en bienestar animal y resultados reales.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="space-y-8">
          {programs.map((program, index) => {
            const Icon = program.icon
            const isEven = index % 2 === 0

            return (
              <div 
                key={program.id}
                className={`card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Image */}
                <div className="relative h-64 md:h-auto md:w-2/5 flex-shrink-0">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:w-3/5">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {program.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-1">Dirigido a:</h5>
                      <p className="text-gray-600">{program.target}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-1">Duración estimada:</h5>
                      <p className="text-gray-600">{program.duration}</p>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="bg-primary-50 rounded-lg p-4 mb-6">
                    <h5 className="font-semibold text-gray-900 mb-2">Entregables:</h5>
                    <ul className="space-y-1">
                      {program.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link 
                    href="/#contacto"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Solicitar información
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-primary-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No estás seguro de qué programa necesitas?
          </h3>
          <p className="text-lg mb-6 text-primary-100">
            Agenda una evaluación conductual profesional y te recomendaremos el mejor camino.
          </p>
          <Link href="/#contacto" className="btn-secondary bg-white text-primary-700 border-0 hover:bg-gray-100">
            Agendar Evaluación Gratuita
          </Link>
        </div>
      </div>
    </section>
  )
}
