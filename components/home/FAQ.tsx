'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: '¿Cuál es la diferencia entre Perros de Servicio y Perros de Soporte Emocional?',
      answer: 'Esta es la distinción MÁS IMPORTANTE: Los PERROS DE SERVICIO están entrenados para realizar TAREAS ESPECÍFICAS Y MEDIBLES que asisten directamente a personas con discapacidades. Ejemplos de tareas: 1) Perros Guía: detener ante escaleras, navegar obstáculos. 2) Alerta Médica: detectar hipoglucemia 15-30 min antes y alertar. 3) Asistencia Psiquiátrica (NO soporte emocional): interrumpir ataques de pánico con presión profunda, anclar durante flashbacks, guiar fuera de multitudes. Los PERROS DE SOPORTE EMOCIONAL NO realizan tareas entrenadas específicas; su función es proporcionar consuelo y estabilidad mediante su presencia, sin habilidades funcionales medibles. Legalmente, según Ley 1618/2013 de Colombia y ADA en EE.UU., solo los perros de servicio con tareas documentadas tienen derechos de acceso público garantizados.'
    },
    {
      question: '¿Qué leyes regulan los perros de servicio en Colombia?',
      answer: 'En Colombia, la Ley 1618 de 2013 establece las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad, incluyendo el uso de perros de servicio. El Decreto 1538 de 2005 regula específicamente el acceso de perros guía. A nivel internacional, Colombia ratificó la Convención sobre los Derechos de las Personas con Discapacidad de la ONU (2006). Es importante aclarar que estas normativas aplican principalmente a PERROS DE SERVICIO que realizan tareas específicas documentadas, no a perros de soporte emocional.'
    },
    {
      question: '¿Mi perro de servicio tiene acceso garantizado a espacios públicos?',
      answer: 'En Colombia, la Ley 1618 de 2013 garantiza el acceso de personas con discapacidad acompañadas de sus perros de servicio a espacios públicos, transporte y establecimientos. SIN EMBARGO: 1) El perro debe estar específicamente entrenado para tareas relacionadas con la discapacidad del tutor, 2) Debe comportarse apropiadamente en público, 3) Cada establecimiento puede solicitar documentación que demuestre el entrenamiento. Los perros de soporte emocional NO tienen los mismos derechos de acceso automático y dependen de las políticas de cada establecimiento.'
    },
    {
      question: '¿Cuánto dura el entrenamiento para cada clasificación?',
      answer: 'PERROS DE SERVICIO: Entre 12-24 semanas dependiendo de la especialización (Perros Guía: 16-24 semanas, Alerta Médica: 10-18 semanas, Asistencia a Movilidad: 12-20 semanas). PERROS DE SOPORTE EMOCIONAL: 8-12 semanas enfocadas en socialización y comportamiento equilibrado. La diferencia en duración refleja la complejidad: los perros de servicio deben dominar tareas funcionales específicas, mientras que los de soporte emocional se enfocan en temperamento y presencia calmante.'
    },
    {
      question: '¿Qué documentación recibo al completar el entrenamiento?',
      answer: 'Para ambas categorías proporcionamos: 1) Informe profesional detallado del programa completado, 2) Registro con ID único verificable (formato SG-NAR-YYYY-XXXXXX), 3) Código QR para verificación pública. Para PERROS DE SERVICIO incluimos adicionalmente: documentación específica de tareas entrenadas, protocolos de actuación y certificación de habilidades medibles. IMPORTANTE: No emitimos "certificados legales de perro de servicio" ya que la categorización legal depende de normativas específicas de cada jurisdicción y debe ser validada por las autoridades competentes.'
    },
    {
      question: '¿Puedo verificar el entrenamiento de cualquier perro registrado?',
      answer: 'Sí, completamente público y transparente. Cada perro entrenado recibe un ID único y código QR. En nuestra página de verificación (steadyguardians.com/verify) cualquier persona puede consultar: 1) Clasificación (Servicio o Soporte Emocional), 2) Programa específico completado, 3) Fechas de emisión y vigencia, 4) Estado actual (Vigente/Vencido). La información NO incluye datos personales del tutor, solo valida el entrenamiento completado profesionalmente.'
    },
    {
      question: '¿Mi perro puede calificar para ser Perro de Servicio?',
      answer: 'Realizamos una evaluación conductual profesional inicial (gratuita) donde determinamos: 1) Temperamento y estabilidad emocional, 2) Aptitud para tareas específicas, 3) Salud física y edad adecuada (idealmente 1-6 años). IMPORTANTE: No todos los perros califican para Perro de Servicio. Si tu perro no es apto para tareas funcionales específicas, podemos recomendar el programa de Soporte Emocional, que es igualmente valioso pero sirve un propósito diferente. La evaluación es honesta y priorizamos siempre el bienestar del animal.'
    },
    {
      question: '¿Qué tareas específicas puede realizar un Perro de Asistencia Psiquiátrica?',
      answer: 'IMPORTANTE: NO confundir con Soporte Emocional. Los Perros de Asistencia Psiquiátrica (PSD) realizan TAREAS ENTRENADAS específicas para condiciones como TEPT, trastornos de ansiedad severa, trastorno bipolar, esquizofrenia. TAREAS MEDIBLES: 1) Interrumpir ataques de pánico mediante toque o presión en pecho/piernas, 2) Aplicar Deep Pressure Therapy (terapia de presión profunda) durante crisis, 3) Detectar episodios de disociación y anclar a la realidad, 4) Bloquear estímulos externos creando espacio físico, 5) Guiar hacia salida durante sobrecarga sensorial en multitudes, 6) Recordar medicación mediante alerta a hora programada, 7) Despertar de pesadillas recurrentes, 8) Encender luces al entrar en habitaciones (ansiedad/hipervigilancia), 9) Conducir a lugar seguro durante crisis. DIFERENCIA CLAVE: Estas son tareas funcionales entrenadas y medibles, NO simplemente "brindar consuelo".'
    },
    {
      question: '¿Puede darme ejemplos concretos de tareas de cada tipo de Perro de Servicio?',
      answer: 'Absolutamente. PERROS GUÍA: Detener ante bordillo antes de cruzar calle, navegar alrededor de obstáculo suspendido (rama), desobediencia inteligente (ignorar "avanza" si hay auto). ASISTENCIA MOVILIDAD: Recoger llaves caídas, abrir puerta de refrigerador, proveer soporte físico al levantarse. ALERTA MÉDICA DIABETES: Lamer mano o tocar pierna 20 min antes de hipoglucemia detectada. RESPUESTA EPILEPSIA: Posicionarse para amortiguar caída, activar botón de alerta médica, traer medicamento post-crisis. ASISTENCIA PSIQUIÁTRICA TEPT: Despertar de pesadilla mediante lamer cara, crear barrera física entre tutor y desconocido en fila, aplicar 30 lbs de presión en pecho durante ataque pánico. Todas estas son tareas ESPECÍFICAS, ENTRENABLES Y MEDIBLES, no "dar apoyo emocional".'
    },
    {
      question: '¿Qué métodos de entrenamiento utilizan y por qué?',
      answer: 'Utilizamos EXCLUSIVAMENTE métodos de refuerzo positivo basados en ciencia del comportamiento animal y bienestar. Seguimos las directrices de: IAABC (International Association of Animal Behavior Consultants), Asociación de Veterinarios de Comportamiento Animal, y principios de la Declaración de Cambridge sobre Conciencia Animal (2012). NUNCA usamos: castigos físicos, collares de púas, descargas eléctricas o métodos aversivos. El entrenamiento ético no solo es moralmente correcto, sino que produce resultados más confiables y duraderos, especialmente crítico en perros de servicio.'
    },
    {
      question: '¿Los perros de soporte emocional pueden viajar en avión conmigo?',
      answer: 'SITUACIÓN ACTUAL: La mayoría de aerolíneas internacionales (incluyendo las que operan en Colombia) modificaron sus políticas entre 2020-2021 siguiendo directrices del Departamento de Transporte de EE.UU. PERROS DE SERVICIO: Generalmente permitidos en cabina sin costo adicional con documentación adecuada. PERROS DE SOPORTE EMOCIONAL: Ya NO tienen acceso automático garantizado en la mayoría de aerolíneas; deben viajar como mascotas regulares (cargo, costo adicional, restricciones de tamaño). Cada aerolínea tiene políticas específicas. Recomendamos verificar directamente con la aerolínea antes de reservar.'
    },
    {
      question: '¿Qué sucede si mi perro no completa el programa de Servicio?',
      answer: 'No todos los perros califican para Perro de Servicio, y esto es completamente normal. Si durante el entrenamiento determinamos que el perro no alcanza los estándares requeridos para tareas funcionales específicas, tenemos varias opciones: 1) Ajustar al programa de Soporte Emocional (igualmente valioso), 2) Trabajo preparatorio adicional si el potencial existe, 3) Evaluación honesta si otro perro sería más apropiado. Priorizamos siempre el bienestar del animal sobre expectativas comerciales. El entrenamiento de Servicio es exigente y no todos los perros están diseñados para ese nivel de trabajo.'
    },
    {
      question: '¿Ofrecen seguimiento post-entrenamiento?',
      answer: 'Sí, para ambas categorías. PERROS DE SERVICIO: Incluye sesiones de refuerzo programadas (trimestral recomendado), soporte por consulta ante cambios en tareas o entorno, actualizaciones de registro si se agregan nuevas habilidades. PERROS DE SOPORTE EMOCIONAL: Recomendaciones de mantenimiento del vínculo, soporte ante cambios de comportamiento. El entrenamiento no termina con el programa; es un proceso continuo que requiere práctica y mantenimiento regular para preservar las habilidades desarrolladas.'
    },
    {
      question: '¿Cuál es el costo y ofrecen planes de pago?',
      answer: 'Los costos varían según la clasificación y duración: PERROS DE SERVICIO (más extenso por complejidad de tareas): $X-XX millones COP. PERROS DE SOPORTE EMOCIONAL: $X-XX millones COP. La evaluación inicial es GRATUITA. Ofrecemos: 1) Planes de pago flexibles, 2) Presupuesto personalizado según necesidades, 3) Transparencia total en costos. Contáctanos para discutir opciones específicas para tu caso. El precio refleja el tiempo, experiencia profesional y documentación proporcionada.'
    }
  ]

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
            <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            ¿Tienes preguntas? Aquí están las respuestas
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Encuentra respuestas a las preguntas más comunes sobre nuestros programas 
            de entrenamiento y servicios.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 px-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden transition-all duration-200 shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 md:p-6 flex justify-between items-start gap-3 md:gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 pr-2 leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 md:w-6 md:h-6 text-primary-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 animate-in slide-in-from-top-2 duration-200">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center px-4">
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a
            href="/#contacto"
            className="btn-primary inline-block text-sm md:text-base"
          >
            Contáctanos directamente
          </a>
        </div>
      </div>
    </section>
  )
}
