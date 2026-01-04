'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: '¿Qué diferencia hay entre un perro de apoyo emocional y un perro de servicio?',
      answer: 'Un perro de apoyo emocional brinda estabilidad y confort al tutor mediante su presencia y comportamiento tranquilo. Un perro de servicio está entrenado para realizar tareas específicas relacionadas con la discapacidad del tutor (abrir puertas, alertar emergencias, etc.). Ambos requieren entrenamiento profesional, pero los perros de servicio tienen un nivel más avanzado de obediencia y tareas especializadas.'
    },
    {
      question: '¿Cuánto tiempo dura el proceso de entrenamiento?',
      answer: 'Depende del programa: Apoyo Emocional (8-12 semanas), Servicio (12-20 semanas), Lazarillo (16-24 semanas), Alerta Médica (10-18 semanas). La evaluación inicial es de 1-2 sesiones. Cada programa se adapta al progreso individual del binomio perro-tutor.'
    },
    {
      question: '¿Mi perro puede calificar para el entrenamiento?',
      answer: 'Realizamos una evaluación conductual inicial donde determinamos el temperamento, aptitudes y posibilidades de cada perro. Generalmente, perros con buena salud, temperamento equilibrado y entre 1-6 años tienen mayor probabilidad de éxito. La evaluación nos permite recomendar el programa más adecuado o indicar si se requiere trabajo previo.'
    },
    {
      question: '¿El entrenamiento incluye certificación legal?',
      answer: 'Proporcionamos un informe profesional detallado del entrenamiento completado y un registro con ID único verificable por QR. Sin embargo, NO emitimos certificación legal de "perro de servicio" según normativas jurídicas, ya que estas categorías dependen de leyes específicas de cada jurisdicción. Nuestro enfoque es entrenar y documentar profesionalmente.'
    },
    {
      question: '¿Puedo verificar el entrenamiento de un perro registrado?',
      answer: 'Sí, completamente. Cada perro entrenado recibe un ID único (formato SG-NAR-YYYY-XXXXXX) y un código QR. Cualquier persona puede verificar el estado del entrenamiento en nuestra página de verificación ingresando el ID o escaneando el QR. La información pública incluye programa, fechas y estado, sin exponer datos personales del tutor.'
    },
    {
      question: '¿Qué métodos de entrenamiento utilizan?',
      answer: 'Utilizamos exclusivamente métodos de refuerzo positivo basados en las mejores prácticas internacionales de bienestar animal. Nuestro enfoque es ético, científico y centrado en el bienestar del perro. Nunca empleamos métodos aversivos, castigo físico ni técnicas que comprometan el bienestar emocional del animal.'
    },
    {
      question: '¿Qué sucede si mi perro no completa el programa?',
      answer: 'No todos los perros son aptos para todos los programas, y está bien. Si durante el proceso determinamos que el programa actual no es el adecuado, te recomendaremos alternativas: ajustar a un programa diferente, realizar trabajo preparatorio adicional, o en algunos casos, considerar otro perro con mejor aptitud. Siempre priorizamos el bienestar del animal.'
    },
    {
      question: '¿Ofrecen seguimiento después de completar el programa?',
      answer: 'Sí, incluimos recomendaciones de mantenimiento y ofrecemos sesiones de refuerzo opcionales. El entrenamiento es un proceso continuo y estamos disponibles para consultas post-programa. También recomendamos prácticas regulares para mantener las habilidades desarrolladas.'
    },
    {
      question: '¿Trabajan con perros ya entrenados o solo entrenan desde cero?',
      answer: 'Trabajamos en ambos casos. Podemos evaluar perros con entrenamiento previo y ofrecer programas de especialización o certificación. También entrenamos desde cero. La evaluación inicial determinará el punto de partida más apropiado para cada caso.'
    },
    {
      question: '¿Tienen cobertura en toda Colombia?',
      answer: 'Sí, tenemos cobertura nacional en toda Colombia. Nuestra sede principal está en Bogotá, pero atendemos clientes en todo el país. Ofrecemos opciones de entrenamiento presencial, intensivo o con desplazamiento según la ubicación y necesidades del caso. Contáctanos para discutir la mejor opción para tu ciudad.'
    },
    {
      question: '¿Cuál es el costo de los programas?',
      answer: 'Los costos varían según el programa, duración y necesidades específicas. Ofrecemos una evaluación inicial gratuita donde discutimos detalles del programa y proporcionamos un presupuesto personalizado. Contáctanos para agendar tu evaluación.'
    },
    {
      question: '¿Qué debo llevar a la evaluación inicial?',
      answer: 'Para la evaluación inicial: carnet de vacunación actualizado del perro, información sobre su historial médico y conductual, y cualquier documentación de entrenamiento previo si aplica. También es útil traer información sobre tus necesidades específicas y expectativas del programa.'
    }
  ]

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Tienes preguntas? Aquí están las respuestas
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra respuestas a las preguntas más comunes sobre nuestros programas 
            de entrenamiento y servicios.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a
            href="/#contacto"
            className="btn-primary inline-block"
          >
            Contáctanos directamente
          </a>
        </div>
      </div>
    </section>
  )
}
