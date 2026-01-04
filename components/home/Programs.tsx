'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Briefcase, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export default function Programs() {
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({})
  const [expandedSubcategories, setExpandedSubcategories] = useState<{[key: string]: boolean}>({})

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSubcategory = (key: string) => {
    setExpandedSubcategories(prev => ({ ...prev, [key]: !prev[key] }))
  }
  const mainCategories = [
    {
      id: 'perros-servicio',
      title: 'Perros de Servicio',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
      description: 'Perros entrenados profesionalmente para realizar tareas específicas en beneficio de personas con discapacidades físicas, sensoriales o médicas.',
      explanation: 'Los perros de servicio son animales de trabajo altamente capacitados que ejecutan funciones concretas y medibles para asistir a personas con necesidades específicas.',
      subcategories: [
        {
          name: 'Perros Guía (Lazarillos)',
          description: 'Entrenados para guiar a personas con discapacidad visual o ceguera en navegación segura',
          tasks: [
            'Detención ante obstáculos (escaleras, bordillos, objetos suspendidos)',
            'Navegación precisa en rutas urbanas y espacios interiores',
            'Identificación y evitación de peligros (tráfico, huecos, construcciones)',
            'Desobediencia inteligente (ignorar comando si representa peligro)',
            'Guiado en línea recta y giros precisos'
          ]
        },
        {
          name: 'Perros de Asistencia a la Movilidad',
          description: 'Ayudan a personas con discapacidades físicas en tareas funcionales específicas',
          tasks: [
            'Recuperar objetos caídos o fuera de alcance',
            'Abrir/cerrar puertas, cajones y encender luces',
            'Asistir en transferencias (silla de ruedas, cama, baño)',
            'Proveer soporte físico para equilibrio y estabilidad',
            'Cargar objetos en mochila o arnés especial',
            'Operar interruptores y botones de accesibilidad'
          ]
        },
        {
          name: 'Perros de Alerta Médica',
          description: 'Detectan cambios fisiológicos antes de crisis médicas y alertan al tutor',
          tasks: [
            'Alerta de hipoglucemia/hiperglucemia (diabetes) 15-30 min antes',
            'Detección de crisis epilépticas inminentes',
            'Alerta de arritmias cardíacas o cambios en presión arterial',
            'Detección de alergenos específicos en ambiente',
            'Señal de alerta mediante toque, ladrido o comportamiento específico'
          ]
        },
        {
          name: 'Perros de Respuesta Médica',
          description: 'Actúan durante o después de crisis médicas con protocolos específicos',
          tasks: [
            'Activar sistemas de alerta médica (botones, alarmas)',
            'Traer medicamentos, teléfono o kit de emergencia',
            'Posicionarse para proteger durante convulsiones',
            'Buscar ayuda (persona específica o activar alarma)',
            'Permanecer con el tutor hasta que llegue asistencia',
            'Abrir puertas para permitir entrada de paramédicos'
          ]
        },
        {
          name: 'Perros de Asistencia Psiquiátrica (PSD)',
          description: 'IMPORTANTE: NO confundir con Soporte Emocional - Realizan TAREAS ENTRENADAS específicas para condiciones psiquiátricas',
          tasks: [
            'Interrumpir ataques de pánico mediante toque o presión',
            'Aplicar terapia de presión profunda (Deep Pressure Therapy)',
            'Detectar y responder ante episodios de disociación',
            'Bloquear estímulos sensoriales (crear espacio físico)',
            'Guiar hacia salida durante sobrecarga sensorial en multitudes',
            'Recordar toma de medicación mediante alerta programada',
            'Anclar a la realidad durante flashbacks (TEPT)',
            'Encender luces al entrar en espacios (ansiedad)',
            'Despertar de pesadillas recurrentes',
            'Conducir a lugar seguro durante crisis'
          ],
          warning: 'DIFERENCIA CLAVE: Los PSD ejecutan tareas medibles y entrenadas. Los perros de Soporte Emocional solo brindan consuelo por su presencia, sin tareas funcionales.'
        }
      ],
      features: [
        'Obediencia avanzada y control total',
        'Entrenamiento en tareas específicas medibles',
        'Acceso público responsable',
        'Control bajo estímulos intensos',
        'Certificación profesional de habilidades'
      ],
      target: 'Personas con discapacidades físicas, sensoriales o condiciones médicas que requieren asistencia funcional documentada en actividades diarias.',
      duration: '12-24 semanas (según especialización)',
      deliverables: [
        'Informe técnico detallado de capacidades',
        'Registro verificable con ID/QR único',
        'Documentación de tareas específicas entrenadas',
        'Certificación profesional del programa',
        'Plan de mantenimiento y reentrenamiento'
      ],
      clarification: 'Todos los tipos listados arriba pertenecen a la categoría de PERROS DE SERVICIO porque realizan tareas entrenadas, específicas y medibles para asistir a su tutor.'
    },
    {
      id: 'soporte-emocional',
      title: 'Perros de Soporte Emocional',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800',
      description: 'Perros cuya función principal es proporcionar compañía, consuelo y apoyo emocional a través de su presencia.',
      explanation: 'Los perros de soporte emocional NO realizan tareas específicas entrenadas. Su valor reside en el vínculo afectivo y la estabilidad emocional que brindan a su tutor mediante el acompañamiento.',
      difference: 'A diferencia de los perros de servicio, los perros de soporte emocional no ejecutan tareas funcionales medibles, sino que ofrecen bienestar a través de su compañía constante.',
      features: [
        'Presencia calmante y estabilizadora',
        'Vínculo afectivo desarrollado',
        'Comportamiento equilibrado en espacios públicos',
        'Rutinas de calma y relajación',
        'Manejo apropiado en diferentes entornos'
      ],
      target: 'Personas que requieren apoyo emocional constante, manejo de ansiedad, estrés o acompañamiento terapéutico mediante la presencia de un animal de compañía.',
      duration: '8-12 semanas',
      deliverables: [
        'Informe profesional de temperamento',
        'Registro con ID único verificable',
        'Certificación de programa de socialización',
        'Recomendaciones de mantenimiento del vínculo',
        'Guía de manejo en espacios públicos'
      ],
      clarification: 'Los perros de soporte emocional constituyen una categoría DIFERENTE a los perros de servicio. No realizan tareas entrenadas específicas, sino que proporcionan bienestar emocional a través del acompañamiento.'
    }
  ]

  return (
    <section id="programas" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestras Clasificaciones de Perros de Apoyo
          </h2>
          <p className="text-lg text-gray-600">
            En Steady Guardians trabajamos con <strong>dos categorías principales</strong> de perros de asistencia. 
            Es fundamental comprender la diferencia entre ambas para elegir el programa adecuado.
          </p>
        </div>

        {/* Main Categories */}
        <div className="space-y-12">
          {mainCategories.map((category, index) => {
            const Icon = category.icon
            const isFirst = index === 0

            return (
              <div key={category.id} className="space-y-6">
                {/* Category Card */}
                <div className={`card flex flex-col ${isFirst ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Image */}
                  <div className="relative h-72 md:h-auto md:w-2/5 flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-6 left-6 bg-white rounded-full p-4 shadow-xl">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:w-3/5">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-lg p-4 mb-6">
                      <p className="text-gray-800 leading-relaxed">
                        {category.explanation}
                      </p>
                    </div>

                    {category.difference && (
                      <div className="bg-accent-50 border-l-4 border-accent-600 rounded-r-lg p-4 mb-6">
                        <p className="text-gray-800 leading-relaxed">
                          <strong>Diferencia clave:</strong> {category.difference}
                        </p>
                      </div>
                    )}

                    {/* Subcategories for Service Dogs */}
                    {category.subcategories && (
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">
                          Tipos de Perros de Servicio:
                        </h4>
                        <div className="space-y-4">
                          {category.subcategories.map((sub, idx) => {
                            const subKey = `${category.id}-${idx}`
                            const isExpanded = expandedSubcategories[subKey]
                            
                            return (
                              <div key={idx} className="bg-white rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-colors">
                                <div className="p-5">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-bold text-primary-700 mb-2 text-base">
                                        {sub.name}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {sub.description}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => toggleSubcategory(subKey)}
                                      className="ml-4 flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                      aria-label={isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                                    >
                                      {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                      ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                      )}
                                    </button>
                                  </div>
                                  
                                  {isExpanded && (
                                    <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                                      {sub.tasks && (
                                        <div className="bg-gray-50 rounded-lg p-4">
                                          <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                                            Tareas específicas entrenadas:
                                          </p>
                                          <ul className="space-y-2">
                                            {sub.tasks.map((task, taskIdx) => (
                                              <li key={taskIdx} className="text-sm text-gray-700 flex items-start">
                                                <CheckCircle className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{task}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {sub.warning && (
                                        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r p-4">
                                          <p className="text-sm text-amber-900 font-medium">
                                            {sub.warning}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        El programa incluye:
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {category.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Dirigido a:</h5>
                        <p className="text-sm text-gray-600">{category.target}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Duración estimada:</h5>
                        <p className="text-sm text-gray-600">{category.duration}</p>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="bg-primary-50 rounded-lg p-5 mb-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Entregables:</h5>
                      <ul className="space-y-2">
                        {category.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Clarification */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-6 mb-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed">
                          <strong>Aclaración importante:</strong> {category.clarification}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link 
                      href="/#contacto"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg"
                    >
                      Solicitar información sobre esta categoría
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Evaluation Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿No estás seguro de qué categoría necesitas?
            </h3>
            <p className="text-lg mb-6 text-gray-300">
              Ofrecemos una <strong>evaluación conductual profesional gratuita</strong> para determinar 
              si tu perro es apto para ser un perro de servicio o si un programa de soporte emocional 
              es más adecuado para tus necesidades.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
              <h4 className="font-semibold mb-3">La evaluación incluye:</h4>
              <ul className="text-left space-y-2 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-sm">Diagnóstico de aptitud y temperamento del perro</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-sm">Análisis de necesidades específicas del tutor</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-sm">Recomendación profesional de categoría y programa</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-sm">Informe técnico detallado con plan sugerido</span>
                </li>
              </ul>
            </div>
            <Link 
              href="/#contacto" 
              className="btn-primary bg-primary-600 hover:bg-primary-700 border-0 inline-flex items-center"
            >
              Agendar Evaluación Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
