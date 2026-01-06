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
      answer: 'El marco legal colombiano que regula los perros de servicio incluye: LEY 1618 DE 2013 (Ley Estatutaria de Discapacidad): Establece las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad, específicamente en su Artículo 14 garantiza el derecho de acceso con perros de servicio a todos los espacios públicos y privados de uso público. DECRETO 1538 DE 2005: Regula específicamente la utilización de perros guía por personas con discapacidad visual, estableciendo derechos de acceso y prohibiciones de discriminación. LEY 361 DE 1997: Ley de mecanismos de integración social de personas con limitación, que incluye disposiciones sobre ayudas técnicas incluidos perros de asistencia. MARCO INTERNACIONAL: Colombia ratificó la Convención sobre los Derechos de las Personas con Discapacidad de la ONU (2006) que reconoce el derecho a utilizar ayudas técnicas y animales de asistencia. ÁMBITO DE APLICACIÓN: Estas normativas aplican exclusivamente a PERROS DE SERVICIO que realizan tareas funcionales específicas y medibles relacionadas con la discapacidad del tutor, NO a perros de soporte emocional cuya función es únicamente proporcionar consuelo mediante su presencia. SANCIONES: Los establecimientos que nieguen acceso injustificado pueden enfrentar multas y sanciones administrativas según la Superintendencia de Industria y Comercio.'
    },
    {
      question: '¿Mi perro de servicio tiene acceso garantizado a espacios públicos?',
      answer: 'En Colombia, la Ley 1618 de 2013 garantiza el pleno ejercicio de los derechos de las personas con discapacidad, incluyendo el acceso de perros de servicio a espacios públicos, transporte, establecimientos comerciales, restaurantes, hoteles y áreas de uso común. El Decreto 1538 de 2005 regula específicamente el acceso de perros guía. REQUISITOS LEGALES PARA ACCESO GARANTIZADO: 1) El perro debe estar específicamente entrenado para realizar tareas medibles relacionadas con la discapacidad documentada del tutor (no solo proporcionar consuelo emocional), 2) Debe comportarse apropiadamente en espacios públicos sin representar peligro o molestia (controlado, sin ladridos excesivos, no agresivo), 3) El establecimiento puede solicitar documentación que demuestre el entrenamiento profesional y las tareas específicas que realiza el perro. DERECHOS DEL TUTOR: No se puede cobrar tarifas adicionales por el perro de servicio, no se puede segregar a personas con perros de servicio en áreas separadas, y el establecimiento solo puede negar acceso si el perro representa un peligro directo o su comportamiento es inapropiado. IMPORTANTE: Los perros de soporte emocional NO tienen los mismos derechos de acceso automático garantizado por ley y su admisión depende completamente de las políticas internas de cada establecimiento privado.'
    },
    {
      question: '¿Cuánto dura el entrenamiento para cada clasificación?',
      answer: 'La duración varía significativamente según el tipo y complejidad del entrenamiento: PERROS DE SERVICIO (12-24 semanas según especialización): Perros Guía para discapacidad visual requieren 18-24 semanas por la complejidad de navegación y obediencia inteligente; Perros de Alerta Médica (diabetes, epilepsia) necesitan 12-18 semanas para desarrollar capacidad de detección olfativa y respuesta consistente; Perros de Asistencia a Movilidad requieren 14-20 semanas para dominar múltiples tareas físicas; Perros de Asistencia Psiquiátrica necesitan 16-22 semanas para entrenar respuestas específicas a crisis y técnicas de intervención. PERROS DE SOPORTE EMOCIONAL (8-12 semanas): Programa enfocado en socialización avanzada, exposición a múltiples entornos, comportamiento equilibrado en público y vinculación apropiada con el tutor. FACTORES QUE AFECTAN LA DURACIÓN: Edad y temperamento base del perro, experiencia previa en entrenamiento, número de tareas específicas requeridas, y velocidad de aprendizaje individual. IMPORTANTE: La diferencia en duración refleja directamente la complejidad - los perros de servicio deben dominar y ejecutar consistentemente tareas funcionales medibles bajo cualquier circunstancia, mientras que los de soporte emocional se enfocan en temperamento estable y presencia calmante.'
    },
    {
      question: '¿Qué documentación recibo al completar el entrenamiento?',
      answer: 'Al completar el programa, recibes documentación profesional completa según la categoría: PARA AMBAS CATEGORÍAS: 1) Informe profesional detallado del programa completado con evaluaciones de comportamiento y habilidades desarrolladas, 2) Registro oficial con ID único verificable en nuestro sistema (formato SG-NAR-YYYY-XXXXXX), 3) Código QR para verificación pública instantánea desde cualquier dispositivo, 4) Historial de entrenamiento con fechas, métodos utilizados y progreso documentado. PARA PERROS DE SERVICIO ADICIONALMENTE: Documentación específica de cada tarea funcional entrenada con protocolos de actuación detallados, certificación de habilidades medibles y evaluables, carta de respaldo profesional para presentar ante establecimientos o autoridades, y actualización gratuita de documentación si se agregan nuevas tareas entrenadas. IMPORTANTE: Nuestra documentación certifica el entrenamiento profesional completado y las habilidades del perro, pero no constituye un "certificado legal de perro de servicio" emitido por autoridades gubernamentales, ya que la categorización legal final depende de las normativas específicas de cada jurisdicción y debe ser validada por las entidades competentes según la Ley 1618 de 2013 en Colombia.'
    },
    {
      question: '¿Puedo verificar el entrenamiento de cualquier perro registrado?',
      answer: 'Sí, nuestro sistema de verificación es completamente público, transparente y accesible las 24 horas. Cada perro que completa un programa recibe: 1) ID único alfanumérico (formato SG-NAR-YYYY-XXXXXX) que nunca se reutiliza, 2) Código QR escaneable desde cualquier smartphone que redirige directamente a la página de verificación. CÓMO VERIFICAR: Ingresa a steadyguardians.com/verify y escanea el código QR del certificado o ingresa manualmente el ID de registro. INFORMACIÓN VISIBLE PÚBLICAMENTE: Clasificación principal (Perro de Servicio o Perro de Soporte Emocional), programa específico completado con descripción de tareas entrenadas, fecha de emisión del certificado, fecha de vigencia y vencimiento, estado actual (Vigente/Vencido/Renovado), y nombre del perro. PROTECCIÓN DE PRIVACIDAD: La información NO incluye datos personales del tutor (nombre, dirección, condición médica o diagnóstico), solo valida que el entrenamiento fue completado profesionalmente. PROPÓSITO: Permite a establecimientos, autoridades y público general verificar instantáneamente la autenticidad del entrenamiento sin necesidad de contactarnos, reduciendo fraudes de certificados falsos.'
    },
    {
      question: '¿Mi perro puede calificar para ser Perro de Servicio?',
      answer: 'La elegibilidad para entrenamiento de Perro de Servicio depende de múltiples factores evaluados en nuestra consulta inicial gratuita: EVALUACIÓN DE TEMPERAMENTO (crítico): Estabilidad emocional ante estímulos estresantes, ausencia de agresividad reactiva hacia personas o animales, capacidad de enfoque y concentración sostenida, confianza en entornos nuevos sin miedo excesivo, y capacidad de recuperación rápida ante eventos inesperados. EVALUACIÓN FÍSICA: Salud general confirmada por veterinario (sin condiciones que limiten actividad), edad ideal entre 1-6 años (cachorros demasiado jóvenes requieren madurez, perros mayores pueden tener limitaciones físicas), y conformación física apropiada para tareas específicas. APTITUD PARA TAREAS: Motivación natural hacia el trabajo y aprendizaje, capacidad de retención de comandos complejos, y predisposición hacia comportamientos requeridos. IMPORTANTE: Aproximadamente 40-50% de perros evaluados NO califican para entrenamiento de Perro de Servicio debido a temperamento, salud o edad, y esto es completamente normal y esperado. Si tu perro no es apto para tareas funcionales específicas de servicio, podemos recomendar el programa de Soporte Emocional que es igualmente valioso pero sirve un propósito diferente y tiene requisitos menos estrictos. La evaluación es honesta y transparente porque priorizamos siempre el bienestar del animal sobre consideraciones comerciales - forzar a un perro inadecuado al programa de servicio es contraproducente y potencialmente dañino.'
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
      answer: 'Los costos varían significativamente según la clasificación y programa específico: PERROS DE SERVICIO dependen del tipo de especialización (Perros Guía, Asistencia a Movilidad, Alerta Médica, Asistencia Psiquiátrica) debido a la diferencia en duración (12-24 semanas) y complejidad de tareas entrenadas. PERROS DE SOPORTE EMOCIONAL tienen costos más accesibles al ser programas de menor duración (8-12 semanas) enfocados en temperamento y comportamiento. La evaluación inicial es COMPLETAMENTE GRATUITA y sin compromiso. Ofrecemos: 1) Planes de pago flexibles adaptados a tu situación, 2) Presupuesto detallado y personalizado según el programa específico que necesites, 3) Transparencia absoluta en todos los costos involucrados (entrenamiento, materiales, documentación). Contáctanos directamente para discutir opciones específicas para tu caso. El precio refleja el tiempo de entrenamiento especializado, la experiencia profesional de nuestros entrenadores certificados y la documentación legal proporcionada.'
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
