import { FileText, AlertCircle, Shield, Scale, CheckCircle, XCircle, Ban, DollarSign, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Términos y Condiciones | Steady Guardians',
  description: 'Términos y condiciones de uso de los servicios de Steady Guardians Colombia',
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Scale className="w-4 h-4" />
              <span>Documento Legal Vinculante</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Términos y Condiciones de Servicio
            </h1>
            <p className="text-xl text-primary-100">
              Última actualización: 3 de enero de 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Aceptación de los Términos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bienvenido a Steady Guardians Colombia (en adelante "Steady Guardians", "nosotros", "nuestro" o "la empresa"). 
                  Estos Términos y Condiciones de Servicio (en adelante "Términos") constituyen un acuerdo legal vinculante entre 
                  usted (en adelante "el Cliente", "usted" o "el Tutor") y Steady Guardians Colombia.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Al contratar nuestros servicios de entrenamiento canino, acceder a nuestro sitio web, o utilizar cualquiera 
                  de nuestros servicios, usted acepta estar legalmente obligado por estos Términos y por nuestra 
                  <Link href="/privacy" className="text-primary-600 hover:underline"> Política de Privacidad</Link>.
                </p>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-800 font-semibold mb-2">IMPORTANTE: Lea Cuidadosamente</p>
                      <p className="text-sm text-red-800">
                        Si no está de acuerdo con estos Términos, no debe utilizar nuestros servicios. El uso continuado 
                        de nuestros servicios después de cualquier modificación a estos Términos constituye su aceptación 
                        de dichos cambios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Services */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Descripción de Servicios</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Steady Guardians ofrece servicios profesionales de entrenamiento canino especializados en las 
                  siguientes áreas:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">1.1. Entrenamiento de Perros de Apoyo Emocional</h3>
                    <p className="text-sm text-gray-700">
                      Programa enfocado en desarrollar habilidades para brindar apoyo emocional, estabilidad y 
                      compañía terapéutica al tutor. Duración: 8-12 semanas.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">1.2. Entrenamiento de Perros de Servicio</h3>
                    <p className="text-sm text-gray-700">
                      Entrenamiento avanzado para perros que asisten a personas con discapacidades físicas o 
                      funcionales en actividades diarias. Duración: 12-20 semanas.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">1.3. Entrenamiento de Perros Lazarillo (Guía)</h3>
                    <p className="text-sm text-gray-700">
                      Programa intensivo para formar perros guía especializados en navegación segura, detección de 
                      riesgos y movilidad independiente para personas con discapacidad visual. Duración: 16-24 semanas.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">1.4. Entrenamiento de Perros de Alerta Médica</h3>
                    <p className="text-sm text-gray-700">
                      Entrenamiento especializado para detectar y alertar condiciones médicas específicas (epilepsia, 
                      diabetes, ansiedad). Duración: 14-20 semanas.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">1.5. Certificación Profesional Básica</h3>
                    <p className="text-sm text-gray-700">
                      Evaluación y certificación para perros con entrenamiento previo que requieren validación oficial. 
                      Duración: 4-6 semanas.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">1.6. Entregables del Servicio</h3>
                <p className="text-gray-700 mb-3">Todos los programas incluyen:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Informe profesional de entrenamiento detallado</li>
                  <li>Certificación oficial con ID único verificable (formato: SG-[CIUDAD]-[AÑO]-[NÚMERO])</li>
                  <li>Código QR para verificación pública</li>
                  <li>Registro en base de datos nacional de certificaciones</li>
                  <li>Manual de mantenimiento y recomendaciones</li>
                  <li>Soporte post-entrenamiento por 90 días</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Eligibility */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Requisitos de Elegibilidad</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1. Del Tutor (Cliente)</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>Ser mayor de 18 años o contar con representación legal de un adulto</li>
              <li>Residir en Colombia o tener domicilio legal verificable</li>
              <li>Proporcionar información completa y veraz en el registro</li>
              <li>Comprometerse a participar activamente en el proceso de entrenamiento</li>
              <li>Cumplir con todas las evaluaciones y requisitos del programa seleccionado</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2. Del Animal</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Edad mínima: 6 meses (programas básicos) o 12 meses (programas avanzados)</li>
              <li>Certificado de salud veterinaria vigente (no mayor a 30 días)</li>
              <li>Carné de vacunación completo y actualizado (incluye rabia, polivalente, parvovirus)</li>
              <li>Desparasitación interna y externa actualizada</li>
              <li>Evaluación de temperamento realizada por nuestro equipo (obligatorio antes de inicio)</li>
              <li>No presentar historial de agresividad grave no tratada</li>
              <li>Estar en condiciones físicas y de salud aptas para el programa seleccionado</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> Steady Guardians se reserva el derecho de rechazar o descontinuar el entrenamiento 
                de cualquier animal que no cumpla con los requisitos mínimos de salud, temperamento o seguridad, con 
                reembolso parcial según la política de cancelación.
              </p>
            </div>
          </div>

          {/* Section 3: Registration and Payment */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Registro, Pago y Facturación</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1. Proceso de Registro</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
                  <li>Completar formulario de solicitud en línea o presencial</li>
                  <li>Proporcionar documentación requerida (ID tutor, documentos del animal)</li>
                  <li>Agendar y aprobar evaluación inicial de temperamento</li>
                  <li>Firma de contrato de servicios y autorización de tratamiento de datos</li>
                  <li>Pago de matrícula o primera cuota según plan seleccionado</li>
                </ol>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2. Estructura de Precios y Pagos</h3>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Los precios varían según el programa seleccionado y la complejidad del entrenamiento. 
                    Todos los precios incluyen IVA (19%) según normativa colombiana.
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Opciones de Pago:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Pago único:</strong> Descuento del 10% sobre el precio total</li>
                    <li><strong>Pago en cuotas:</strong> 30% matrícula + saldo dividido en cuotas mensuales</li>
                    <li><strong>Métodos aceptados:</strong> Transferencia bancaria, tarjeta de crédito/débito, PSE, Nequi, Daviplata</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3. Política de Pagos Atrasados</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Gracia de 5 días calendario sin recargo</li>
                  <li>A partir del día 6: Recargo del 2% sobre el valor adeudado</li>
                  <li>Suspensión de servicios después de 15 días de mora</li>
                  <li>Cancelación automática del contrato después de 30 días de mora sin posibilidad de reembolso</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Cancellation and Refund */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancelaciones y Reembolsos</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1. Cancelación por el Cliente</h3>
                <div className="space-y-3 mb-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-gray-900">Antes de iniciar el programa:</p>
                    <p className="text-sm text-gray-700">Reembolso del 100% menos gastos administrativos (10% del total)</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-semibold text-gray-900">Durante las primeras 2 semanas:</p>
                    <p className="text-sm text-gray-700">Reembolso del 70% del saldo pendiente</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="font-semibold text-gray-900">Después de 2 semanas:</p>
                    <p className="text-sm text-gray-700">Reembolso del 50% del saldo pendiente</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-semibold text-gray-900">Después del 50% del programa:</p>
                    <p className="text-sm text-gray-700">No hay reembolso</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2. Cancelación por Steady Guardians</h3>
                <p className="text-gray-700 mb-3">
                  Nos reservamos el derecho de cancelar o suspender el servicio en los siguientes casos:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Falta de pago según términos acordados</li>
                  <li>Conducta agresiva o peligrosa del animal no modificable</li>
                  <li>Incumplimiento grave del tutor con instrucciones o protocolos</li>
                  <li>Información falsa o fraudulenta proporcionada en el registro</li>
                  <li>Condiciones de salud del animal que impidan continuar de forma segura</li>
                </ul>
                <p className="text-gray-700">
                  En caso de cancelación por nuestra parte (excepto por incumplimiento del cliente), 
                  se reembolsará el 100% del saldo no utilizado.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">4.3. Proceso de Reembolso</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Solicitud por escrito (correo electrónico o carta)</li>
                  <li>Procesamiento en 15 días hábiles</li>
                  <li>Reembolso al mismo método de pago original</li>
                  <li>Confirmación por correo electrónico</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Responsibilities */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Responsabilidades de las Partes</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1. Responsabilidades del Cliente</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Proporcionar información completa, precisa y actualizada del animal</li>
                  <li>Mantener al día las vacunas y controles veterinarios</li>
                  <li>Asistir a todas las sesiones programadas puntualmente</li>
                  <li>Participar activamente en el proceso de entrenamiento cuando sea requerido</li>
                  <li>Practicar ejercicios asignados en casa entre sesiones</li>
                  <li>Notificar inmediatamente cualquier cambio en salud o comportamiento del animal</li>
                  <li>Cumplir con todas las indicaciones y protocolos de seguridad</li>
                  <li>Asumir total responsabilidad civil por daños causados por el animal</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2. Responsabilidades de Steady Guardians</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Proporcionar entrenamiento profesional por personal calificado y certificado</li>
                  <li>Usar métodos de entrenamiento positivos y humanitarios</li>
                  <li>Mantener instalaciones seguras, limpias y apropiadas</li>
                  <li>Evaluar continuamente el progreso y bienestar del animal</li>
                  <li>Comunicar regularmente el avance del entrenamiento al tutor</li>
                  <li>Emitir certificación oficial al completar exitosamente el programa</li>
                  <li>Mantener seguros médicos y de responsabilidad civil vigentes</li>
                  <li>Proteger los datos personales según Ley 1581 de 2012</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6: Liability Limitations */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitaciones de Responsabilidad</h2>
                
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded mb-6">
                  <p className="text-sm text-orange-800 font-semibold mb-2">DESCARGO IMPORTANTE:</p>
                  <p className="text-sm text-orange-800 mb-3">
                    El entrenamiento canino profesional mejora significativamente el comportamiento y las habilidades 
                    del animal, pero no garantiza resultados específicos ni elimina completamente todos los riesgos 
                    inherentes al trabajo con animales.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">6.1. Limitaciones Específicas</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li><strong>Resultados variables:</strong> El progreso depende del animal, tutor, práctica y factores externos</li>
                  <li><strong>No garantía absoluta:</strong> No garantizamos comportamiento 100% predecible en todas las circunstancias</li>
                  <li><strong>Salud del animal:</strong> No somos responsables por condiciones médicas pre-existentes no divulgadas</li>
                  <li><strong>Comportamiento post-entrenamiento:</strong> El mantenimiento requiere práctica continua del tutor</li>
                  <li><strong>Acceso público:</strong> La certificación no garantiza acceso automático a todos los espacios</li>
                  <li><strong>Responsabilidad civil:</strong> El tutor asume responsabilidad civil total por actos del animal</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">6.2. Exclusión de Responsabilidad</h3>
                <p className="text-gray-700 mb-3">Steady Guardians NO es responsable por:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Lesiones o daños causados por el animal fuera de nuestras instalaciones</li>
                  <li>Decisiones de terceros (aerolíneas, establecimientos, etc.) sobre acceso del animal</li>
                  <li>Incumplimiento de normativas locales o regulaciones cambiantes</li>
                  <li>Daños derivados del incumplimiento del tutor con las instrucciones</li>
                  <li>Costos veterinarios de condiciones no relacionadas con el entrenamiento</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">6.3. Seguros</h3>
                <p className="text-gray-700">
                  Recomendamos enfáticamente que el tutor contrate un seguro de responsabilidad civil para 
                  mascotas que cubra posibles daños a terceros. Steady Guardians mantiene seguros de 
                  responsabilidad civil que cubren únicamente actividades dentro de nuestras instalaciones 
                  durante sesiones de entrenamiento.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Certifications */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Certificaciones y Verificación</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">7.1. Emisión de Certificados</h3>
                <p className="text-gray-700 mb-4">
                  Al completar exitosamente un programa, emitimos una certificación oficial que incluye:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>ID único verificable (formato: SG-[CIUDAD]-[AÑO]-[NÚMERO])</li>
                  <li>Código QR para verificación pública instantánea</li>
                  <li>Nombre del animal y fotografía oficial</li>
                  <li>Tipo de programa completado y alcance del entrenamiento</li>
                  <li>Nombre del entrenador certificado responsable</li>
                  <li>Fechas de emisión y vigencia</li>
                  <li>Registro en base de datos nacional pública</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">7.2. Verificación Pública</h3>
                <p className="text-gray-700 mb-4">
                  Todas las certificaciones son verificables públicamente a través de:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Búsqueda por ID en <Link href="/verify" className="text-primary-600 hover:underline">www.steadyguardians.co/verify</Link></li>
                  <li>Escaneo de código QR desde cualquier dispositivo con cámara</li>
                  <li>Consulta telefónica al +57 (601) 123-4567</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">7.3. Vigencia y Renovación</h3>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Vigencia estándar:</strong> 2 años desde la fecha de emisión
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Renovación:</strong> Requiere evaluación de mantenimiento de habilidades (costo reducido)
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Renovación anticipada:</strong> Puede realizarse hasta 90 días antes del vencimiento
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">7.4. Revocación de Certificaciones</h3>
                <p className="text-gray-700 mb-3">
                  Nos reservamos el derecho de revocar una certificación si:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Se descubre información fraudulenta en el proceso de registro</li>
                  <li>El animal manifiesta comportamiento agresivo grave post-certificación</li>
                  <li>El tutor utiliza la certificación de manera fraudulenta o ilegal</li>
                  <li>No se cumple con las evaluaciones de renovación requeridas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 8: Legal Compliance */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Marco Legal y Normativo</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nuestros servicios se prestan en cumplimiento con la normativa colombiana aplicable, incluyendo:
                </p>

                <div className="space-y-3">
                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Ley 84 de 1989</p>
                    <p className="text-sm text-gray-700">Estatuto Nacional de Protección de los Animales</p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Ley 1774 de 2016</p>
                    <p className="text-sm text-gray-700">
                      Por medio de la cual se modifican el Código Civil, la Ley 84 de 1989, el Código Penal, 
                      el Código de Procedimiento Penal y se dictan otras disposiciones (bienestar animal)
                    </p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Ley 1581 de 2012</p>
                    <p className="text-sm text-gray-700">
                      Protección de Datos Personales (Habeas Data)
                    </p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Decreto 2092 de 1986</p>
                    <p className="text-sm text-gray-700">
                      Reglamenta parcialmente la Ley 09 de 1979 en cuanto a la tenencia responsable de mascotas
                    </p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Normativas Locales</p>
                    <p className="text-sm text-gray-700">
                      Ordenanzas y acuerdos municipales de cada ciudad donde operamos
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota Importante:</strong> La certificación de Steady Guardians documenta el entrenamiento 
                    completado, pero no constituye una licencia gubernamental. El acceso a espacios públicos, transporte 
                    aéreo, viviendas, etc., depende de la normativa específica aplicable en cada caso y la decisión 
                    de los administradores de dichos espacios.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 9: Intellectual Property */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Propiedad Intelectual</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Todo el contenido de nuestro sitio web, incluyendo textos, gráficos, logos, iconos, imágenes, 
              videos, diseños, software y materiales de entrenamiento, es propiedad de Steady Guardians o 
              de nuestros licenciantes y está protegido por las leyes de propiedad intelectual colombianas 
              e internacionales.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">9.1. Uso Permitido</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>Visualizar y descargar contenido exclusivamente para uso personal y no comercial</li>
              <li>Compartir certificaciones oficiales emitidas a su nombre</li>
              <li>Utilizar materiales de entrenamiento proporcionados para el animal certificado</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">9.2. Uso Prohibido</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Reproducir, duplicar o copiar contenido con fines comerciales</li>
              <li>Modificar, distribuir o republicar contenido sin autorización escrita</li>
              <li>Falsificar, alterar o reproducir certificados oficiales</li>
              <li>Usar nuestras marcas comerciales, logos o denominaciones sin permiso expreso</li>
            </ul>
          </div>

          {/* Section 10: Modifications */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modificaciones a los Términos</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nos reservamos el derecho de modificar estos Términos en cualquier momento para reflejar 
                  cambios en nuestros servicios, prácticas comerciales, requisitos legales o por otras razones.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">10.1. Notificación de Cambios</h3>
                <p className="text-gray-700 mb-3">Los cambios materiales serán comunicados mediante:</p>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Publicación en nuestro sitio web con fecha de actualización</li>
                  <li>Correo electrónico a todos los clientes registrados (cambios sustanciales)</li>
                  <li>Notificación destacada en la página principal durante 30 días</li>
                </ul>

                <p className="text-gray-700">
                  El uso continuado de nuestros servicios después de la modificación de los Términos 
                  constituye su aceptación de los cambios. Si no está de acuerdo con los nuevos términos, 
                  debe descontinuar el uso de nuestros servicios.
                </p>
              </div>
            </div>
          </div>

          {/* Section 11: Dispute Resolution */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Resolución de Disputas</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">11.1. Negociación Directa</h3>
            <p className="text-gray-700 mb-4">
              En caso de cualquier disputa, reclamo o controversia, las partes acuerdan intentar primero 
              resolver el asunto mediante negociación directa de buena fe.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">11.2. Mediación</h3>
            <p className="text-gray-700 mb-4">
              Si la negociación directa no resuelve la disputa en 30 días, las partes acuerdan someterse 
              a mediación ante un mediador certificado en Bogotá, Colombia, antes de iniciar cualquier 
              acción judicial.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">11.3. Jurisdicción</h3>
            <p className="text-gray-700 mb-4">
              Si la mediación no tiene éxito, las partes se someten a la jurisdicción exclusiva de los 
              tribunales de Bogotá D.C., Colombia, renunciando a cualquier otro fuero que pudiera 
              corresponderles.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">11.4. Ley Aplicable</h3>
            <p className="text-gray-700">
              Estos Términos se rigen e interpretan de acuerdo con las leyes de la República de Colombia, 
              sin referencia a sus principios de conflicto de leyes.
            </p>
          </div>

          {/* Section 12: General Provisions */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Disposiciones Generales</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12.1. Acuerdo Completo</h4>
                <p className="text-sm">
                  Estos Términos, junto con nuestra Política de Privacidad y cualquier contrato de servicio 
                  específico firmado, constituyen el acuerdo completo entre usted y Steady Guardians.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12.2. Separabilidad</h4>
                <p className="text-sm">
                  Si cualquier disposición de estos Términos se considera inválida o inaplicable, 
                  las disposiciones restantes permanecerán en pleno vigor y efecto.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12.3. Renuncia</h4>
                <p className="text-sm">
                  La falta de ejercicio de cualquier derecho bajo estos Términos no constituirá una renuncia 
                  a dicho derecho.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12.4. Asignación</h4>
                <p className="text-sm">
                  No puede transferir o asignar sus derechos u obligaciones bajo estos Términos sin nuestro 
                  consentimiento previo por escrito.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12.5. Notificaciones</h4>
                <p className="text-sm">
                  Todas las notificaciones legales deben enviarse a: legal@steadyguardians.co
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12.6. Idioma</h4>
                <p className="text-sm">
                  Estos Términos se redactan en español. En caso de traducción a otros idiomas, la versión 
                  en español prevalecerá.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Información de Contacto</h2>
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Steady Guardians Colombia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold mb-1">Sede Principal:</p>
                  <p>Cl. 134 #1542, Usaquén, Bogotá, Colombia</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Cobertura:</p>
                  <p>Nacional (todas las ciudades de Colombia)</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Correo electrónico:</p>
                  <p><a href="mailto:contacto@steadyguardians.co" className="text-primary-600 hover:underline">contacto@steadyguardians.co</a></p>
                  <p><a href="mailto:legal@steadyguardians.co" className="text-primary-600 hover:underline">legal@steadyguardians.co</a></p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Teléfono:</p>
                  <p>+57 (601) 123-4567</p>
                  <p>WhatsApp: +57 310 123 4567</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Sitio web:</p>
                  <p><a href="https://www.steadyguardians.co" className="text-primary-600 hover:underline">www.steadyguardians.co</a></p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Horario:</p>
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="card mb-8 border-2 border-primary-600">
            <div className="bg-primary-50 p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reconocimiento y Aceptación</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Al utilizar los servicios de Steady Guardians, usted reconoce que ha leído, entendido y 
                acepta estar legalmente obligado por estos Términos y Condiciones de Servicio, así como 
                por nuestra Política de Privacidad.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usted confirma que cumple con todos los requisitos de elegibilidad y que toda la información 
                proporcionada es completa, precisa y veraz.
              </p>
              <div className="bg-primary-100 border-l-4 border-primary-600 p-4 rounded">
                <p className="text-sm text-primary-900 font-semibold">
                  Fecha de entrada en vigor: 3 de enero de 2026
                </p>
                <p className="text-sm text-primary-800 mt-2">
                  Versión: 1.0 | Documento legal vinculante
                </p>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t">
            <Link 
              href="/" 
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              ← Volver al inicio
            </Link>
            <Link 
              href="/privacy" 
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              Ver Políticas de Privacidad →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
