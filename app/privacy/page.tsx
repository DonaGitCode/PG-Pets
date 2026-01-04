import { Shield, Lock, Eye, FileText, Database, Users, Mail, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Políticas de Privacidad | Steady Guardians',
  description: 'Políticas de privacidad y protección de datos personales de Steady Guardians Colombia',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4" />
              <span>Documento Legal</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Políticas de Privacidad
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introducción</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Steady Guardians Colombia (en adelante "Steady Guardians", "nosotros" o "la empresa") se compromete 
                  a proteger la privacidad y seguridad de los datos personales de nuestros clientes, usuarios y visitantes. 
                  Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información 
                  personal de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Ley de Protección de Datos 
                  Personales de Colombia).
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Al utilizar nuestros servicios, registrar un perro en nuestros programas de entrenamiento, o acceder 
                  a nuestro sitio web, usted acepta las prácticas descritas en esta política.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Responsible Party */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable del Tratamiento de Datos</h2>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                  <p className="font-semibold text-gray-900 mb-2">Steady Guardians Colombia</p>
                  <p className="text-sm text-gray-700">Sede Principal: Cl. 134 #1542, Usaquén, Bogotá, Colombia</p>
                  <p className="text-sm text-gray-700">Cobertura: Nacional (todas las ciudades de Colombia)</p>
                  <p className="text-sm text-gray-700">Correo electrónico: privacidad@steadyguardians.co</p>
                  <p className="text-sm text-gray-700">Teléfono: +57 (601) 123-4567</p>
                  <p className="text-sm text-gray-700">Sitio web: www.steadyguardians.co</p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Como responsable del tratamiento, Steady Guardians garantiza el cumplimiento de todas las obligaciones 
                  establecidas en la normativa colombiana de protección de datos personales, incluyendo la implementación 
                  de medidas técnicas, humanas y administrativas necesarias para otorgar seguridad a los registros y 
                  evitar su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Information We Collect */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Información que Recopilamos</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1. Datos Personales del Tutor</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Nombre completo y documento de identidad</li>
                  <li>Información de contacto (teléfono, correo electrónico, dirección)</li>
                  <li>Información médica relevante (si aplica para programas específicos)</li>
                  <li>Historial de servicios y entrenamientos contratados</li>
                  <li>Información de pago y facturación</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2. Datos del Animal</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Raza, edad, sexo y características físicas</li>
                  <li>Nombre del animal y fotografías</li>
                  <li>Historial médico y de vacunación</li>
                  <li>Historial de comportamiento y entrenamiento</li>
                  <li>Información sobre programas de entrenamiento completados</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3. Datos de Navegación y Uso del Sitio Web</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Dirección IP y ubicación geográfica aproximada</li>
                  <li>Tipo de navegador y dispositivo utilizado</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Cookies y tecnologías de rastreo similares</li>
                  <li>Búsquedas y verificaciones de certificaciones realizadas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Use of Information */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso de la Información</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos la información recopilada para los siguientes fines legítimos:
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1. Prestación de Servicios</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Gestionar y ejecutar programas de entrenamiento para perros</li>
                  <li>Emitir certificaciones oficiales con ID único y código QR</li>
                  <li>Mantener registros de entrenamientos completados</li>
                  <li>Proporcionar soporte técnico y atención al cliente</li>
                  <li>Procesar pagos y emitir facturas</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2. Verificación Pública</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Permitir la verificación pública del estado de certificaciones</li>
                  <li>Publicar información del animal certificado (nombre, foto, tipo de programa)</li>
                  <li>Validar la autenticidad de documentos emitidos</li>
                  <li>Prevenir fraude y falsificación de certificados</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3. Comunicaciones</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Enviar actualizaciones sobre servicios contratados</li>
                  <li>Notificar cambios en políticas o términos de servicio</li>
                  <li>Enviar recordatorios de renovación de certificaciones</li>
                  <li>Compartir información educativa y consejos de entrenamiento</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.4. Mejora y Análisis</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Analizar el uso del sitio web y mejorar la experiencia del usuario</li>
                  <li>Realizar investigaciones y análisis estadísticos</li>
                  <li>Desarrollar nuevos servicios y programas de entrenamiento</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Data Sharing */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compartir Información</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información 
                  únicamente en las siguientes circunstancias:
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1. Verificación Pública</h3>
                <p className="text-gray-700 mb-4">
                  La información de certificaciones (ID, nombre del animal, foto, tipo de programa, estado, fechas) 
                  se hace pública para permitir que cualquier persona pueda verificar la autenticidad del entrenamiento.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2. Proveedores de Servicios</h3>
                <p className="text-gray-700 mb-4">
                  Compartimos información con proveedores que nos ayudan a operar nuestro negocio, incluyendo 
                  servicios de hosting, procesamiento de pagos, y análisis de datos. Estos proveedores están 
                  obligados contractualmente a proteger su información.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.3. Obligaciones Legales</h3>
                <p className="text-gray-700 mb-4">
                  Podemos divulgar información cuando sea requerido por ley, orden judicial, o cuando sea necesario 
                  para proteger nuestros derechos, propiedad o seguridad, o la de nuestros usuarios.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.4. Entidades Gubernamentales</h3>
                <p className="text-gray-700">
                  Podemos compartir información con autoridades competentes cuando sea requerido para verificar 
                  el cumplimiento de normativas relacionadas con animales de asistencia o servicio.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Data Security */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seguridad de los Datos</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger 
                  su información personal contra acceso no autorizado, divulgación, alteración o destrucción:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li><strong>Encriptación:</strong> Usamos SSL/TLS para proteger datos en tránsito</li>
                  <li><strong>Control de Acceso:</strong> Acceso restringido solo a personal autorizado</li>
                  <li><strong>Autenticación:</strong> Sistemas de autenticación seguros para administradores</li>
                  <li><strong>Monitoreo:</strong> Supervisión continua de sistemas para detectar anomalías</li>
                  <li><strong>Respaldo:</strong> Copias de seguridad regulares de bases de datos</li>
                  <li><strong>Auditorías:</strong> Revisiones periódicas de seguridad y cumplimiento</li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-800">
                        <strong>Importante:</strong> A pesar de nuestros esfuerzos, ningún sistema de seguridad es 
                        100% infalible. No podemos garantizar la seguridad absoluta de la información transmitida 
                        a través de internet. Usted es responsable de mantener la confidencialidad de sus credenciales 
                        de acceso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: User Rights */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Derechos del Titular de Datos</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  De acuerdo con la Ley 1581 de 2012, usted tiene los siguientes derechos:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Derecho de Acceso</h4>
                    <p className="text-sm text-gray-700">
                      Conocer, actualizar y rectificar sus datos personales en cualquier momento.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Derecho de Rectificación</h4>
                    <p className="text-sm text-gray-700">
                      Solicitar la corrección de datos inexactos, incompletos o desactualizados.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Derecho de Supresión</h4>
                    <p className="text-sm text-gray-700">
                      Solicitar la eliminación de sus datos cuando considere que no están siendo tratados 
                      conforme a la normativa vigente (sujeto a obligaciones legales de retención).
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Derecho de Oposición</h4>
                    <p className="text-sm text-gray-700">
                      Oponerse al tratamiento de sus datos personales por motivos legítimos.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Derecho de Revocación</h4>
                    <p className="text-sm text-gray-700">
                      Revocar la autorización otorgada para el tratamiento de datos personales.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Derecho de Portabilidad</h4>
                    <p className="text-sm text-gray-700">
                      Solicitar una copia de sus datos en formato digital para transferirlos a otro proveedor.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">¿Cómo ejercer sus derechos?</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Para ejercer cualquiera de estos derechos, puede contactarnos a través de:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><strong>Correo electrónico:</strong> privacidad@steadyguardians.co</li>
                    <li><strong>Formulario web:</strong> <Link href="/contact" className="text-primary-600 hover:underline">Formulario de contacto</Link></li>
                    <li><strong>Correo postal:</strong> Cl. 134 #1542, Usaquén, Bogotá D.C.</li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-3">
                    Responderemos a su solicitud dentro de los 15 días hábiles siguientes a la recepción.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Data Retention */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retención de Datos</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos 
              en esta política, salvo que la ley requiera o permita un período de retención más largo:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Datos de clientes activos:</strong> Durante la relación comercial y hasta 5 años después</li>
              <li><strong>Registros de certificaciones:</strong> Permanentemente (requerido para verificación pública)</li>
              <li><strong>Datos de facturación:</strong> 10 años (requisito legal tributario)</li>
              <li><strong>Cookies y datos de navegación:</strong> 12 meses máximo</li>
              <li><strong>Correspondencia legal:</strong> Según plazos de prescripción aplicables</li>
            </ul>
          </div>

          {/* Section 8: International Transfers */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Transferencias Internacionales</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Colombia (por ejemplo, 
              servicios de hosting en la nube). En tales casos, garantizamos que:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Las transferencias se realizan a países con niveles adecuados de protección de datos</li>
              <li>Se establecen cláusulas contractuales que garantizan protección equivalente</li>
              <li>Se obtiene su consentimiento expreso cuando sea requerido por ley</li>
              <li>Se cumplen todas las obligaciones de la normativa colombiana de protección de datos</li>
            </ul>
          </div>

          {/* Section 9: Cookies */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies y Tecnologías Similares</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web. 
              Las cookies nos ayudan a:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              <li>Recordar sus preferencias y configuraciones</li>
              <li>Analizar cómo los usuarios interactúan con nuestro sitio</li>
              <li>Personalizar contenido y anuncios</li>
              <li>Mejorar la seguridad y prevenir fraudes</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad 
              del sitio web.
            </p>
          </div>

          {/* Section 10: Children's Privacy */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacidad de Menores</h2>
            
            <p className="text-gray-700 leading-relaxed">
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente 
              información personal de menores sin el consentimiento de sus padres o tutores legales. Si 
              descubrimos que hemos recopilado datos de un menor sin autorización, eliminaremos esa información 
              de nuestros sistemas de inmediato.
            </p>
          </div>

          {/* Section 11: Changes to Policy */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cambios a esta Política</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras 
              prácticas, tecnología, requisitos legales u otros factores. Notificaremos cualquier cambio 
              significativo mediante:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              <li>Publicación de la política actualizada en nuestro sitio web</li>
              <li>Envío de un correo electrónico a los usuarios registrados</li>
              <li>Notificación destacada en la página principal durante 30 días</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              La fecha de "Última actualización" en la parte superior de esta política indica cuándo fue 
              modificada por última vez.
            </p>
          </div>

          {/* Section 12: Contact */}
          <div className="card mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contacto</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad 
                  o el tratamiento de sus datos personales, puede contactarnos:
                </p>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Steady Guardians Colombia</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Oficial de Privacidad:</strong> Departamento de Protección de Datos</p>
                    <p><strong>Correo electrónico:</strong> <a href="mailto:privacidad@steadyguardians.co" className="text-primary-600 hover:underline">privacidad@steadyguardians.co</a></p>
                    <p><strong>Teléfono:</strong> +57 (601) 123-4567</p>
                    <p><strong>WhatsApp:</strong> +57 310 123 4567</p>
                    <p><strong>Horario de atención:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM (hora de Colombia)</p>
                    <p><strong>Dirección postal:</strong> Cl. 134 #1542, Usaquén, Bogotá D.C., Colombia</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Superintendencia de Industria y Comercio (SIC):</strong> Si considera que sus derechos 
                    han sido vulnerados, puede presentar una queja ante la SIC, autoridad de control en materia 
                    de protección de datos en Colombia.
                  </p>
                </div>
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
              href="/terms" 
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              Ver Términos y Condiciones →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
