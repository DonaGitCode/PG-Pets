import { ClipboardList, Dumbbell, FileCheck, Users, BookOpen, Target, Award } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: ClipboardList,
      title: 'Evaluación Inicial y Consulta',
      description: 'Primera sesión gratuita donde conocemos al perro, evaluamos su temperamento, salud y aptitudes naturales. También entendemos las necesidades específicas del tutor para diseñar un plan personalizado.',
      details: [
        'Entrevista detallada con el tutor sobre necesidades y expectativas',
        'Evaluación del temperamento del perro (reactividad, socialización, estabilidad emocional)',
        'Pruebas de aptitud básica (capacidad de atención, motivación, respuesta a estímulos)',
        'Revisión de historial veterinario y estado de salud actual',
        'Determinación de clasificación apropiada (Servicio o Soporte Emocional)',
        'Entrega de plan de entrenamiento personalizado con cronograma realista'
      ]
    },
    {
      number: '02',
      icon: BookOpen,
      title: 'Fundamentos y Obediencia Básica',
      description: 'Fase inicial de 2-4 semanas donde establecemos las bases del entrenamiento. El perro aprende comandos esenciales y desarrolla la disciplina necesaria para trabajos más avanzados.',
      details: [
        'Comandos básicos: sentado, echado, quieto, junto, llamado',
        'Control de impulsos y autocontrol en diferentes entornos',
        'Caminar con correa sin jalar en diversas situaciones',
        'Socialización controlada con personas, otros perros y entornos urbanos',
        'Sesiones de 45-60 minutos, 3-4 veces por semana',
        'Tareas en casa para reforzar lo aprendido con el tutor'
      ]
    },
    {
      number: '03',
      icon: Target,
      title: 'Entrenamiento Especializado en Tareas',
      description: 'Fase intensiva de 8-16 semanas donde se entrenan las tareas específicas según la clasificación. Para Perros de Servicio: habilidades funcionales medibles. Para Soporte Emocional: comportamiento equilibrado y presencia calmante.',
      details: [
        'Perros de Servicio: Desarrollo progresivo de tareas específicas (alertas médicas, asistencia física, respuesta a crisis)',
        'Entrenamiento con simulaciones realistas de situaciones reales',
        'Introducción gradual de distracciones y niveles de dificultad',
        'Perros de Soporte: Refuerzo de calma, manejo de ansiedad del tutor, comportamiento público',
        'Evaluaciones semanales de progreso con ajustes al plan',
        'Sesiones prácticas donde el tutor participa activamente en el entrenamiento'
      ]
    },
    {
      number: '04',
      icon: Users,
      title: 'Integración Tutor-Perro',
      description: 'Fase crucial de 3-6 semanas donde el tutor aprende a trabajar directamente con su perro. El entrenador supervisa y guía, pero el tutor ejecuta los comandos y refuerza el vínculo.',
      details: [
        'Sesiones prácticas donde el tutor maneja directamente al perro',
        'Entrenamiento del tutor en técnicas de refuerzo positivo',
        'Práctica en entornos reales: centros comerciales, transporte público, restaurantes',
        'Resolución de problemas específicos del binomio',
        'Desarrollo de comunicación clara y consistente entre tutor y perro',
        'Simulaciones de escenarios cotidianos que enfrentarán juntos'
      ]
    },
    {
      number: '05',
      icon: Award,
      title: 'Pruebas de Certificación Final',
      description: 'Evaluación exhaustiva de 2-3 semanas donde el perro y tutor demuestran dominio de todas las habilidades entrenadas en condiciones reales sin asistencia del entrenador.',
      details: [
        'Prueba de obediencia avanzada en entornos públicos con distracciones',
        'Demostración de tareas específicas entrenadas (para Perros de Servicio)',
        'Evaluación de comportamiento público durante 8+ horas continuas',
        'Prueba de control en situaciones de estrés (multitudes, ruidos fuertes, otros animales)',
        'Evaluación del manejo del tutor sin supervisión del entrenador',
        'Tres evaluaciones independientes para garantizar consistencia'
      ]
    },
    {
      number: '06',
      icon: FileCheck,
      title: 'Documentación y Seguimiento',
      description: 'Emisión de certificación oficial con ID único verificable. Incluye plan de mantenimiento y acceso a soporte continuo para garantizar que las habilidades se mantengan a largo plazo.',
      details: [
        'Informe técnico detallado especificando todas las tareas dominadas',
        'Certificado con ID único (SG-NAR-YYYY-XXXXXX) y código QR verificable',
        'Registro público en steadyguardians.com/verify',
        'Manual de mantenimiento con ejercicios de refuerzo',
        'Sesiones de seguimiento trimestrales durante el primer año',
        'Soporte por consulta ante nuevos desafíos o cambios en necesidades'
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
            Un proceso estructurado de <strong>12 a 24 semanas</strong> que transforma a tu perro en un compañero 
            altamente entrenado. Cada fase está diseñada para construir sobre la anterior, garantizando 
            resultados sólidos y duraderos mediante refuerzo positivo.
          </p>
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            <Dumbbell className="w-4 h-4" />
            <span>Metodología basada en ciencia del comportamiento animal y refuerzo positivo</span>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="card p-8 relative h-full hover:shadow-xl transition-shadow">
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
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline Info */}
        <div className="mt-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Duración Total del Programa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-xl mb-2">Perros de Servicio</h4>
                <p className="text-primary-100 text-3xl font-bold mb-2">16-24 semanas</p>
                <p className="text-sm text-primary-100">
                  Incluye entrenamiento intensivo en tareas específicas, certificación de habilidades medibles 
                  y pruebas de acceso público.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-xl mb-2">Perros de Soporte Emocional</h4>
                <p className="text-primary-100 text-3xl font-bold mb-2">12-16 semanas</p>
                <p className="text-sm text-primary-100">
                  Enfocado en socialización avanzada, comportamiento público apropiado y desarrollo 
                  de presencia calmante.
                </p>
              </div>
            </div>
            <div className="text-center text-primary-100">
              <p className="text-sm">
                El tiempo puede variar según el progreso individual del perro, complejidad de tareas requeridas 
                y disponibilidad del tutor para sesiones de práctica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
