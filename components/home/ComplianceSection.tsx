import { Shield, AlertCircle, FileText, Scale, CheckCircle } from 'lucide-react'

export default function ComplianceSection() {
  return (
    <section id="cumplimiento" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Certificación Profesional Verificable</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Entrenamiento Verificado, Certificado y Legal
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Steady Guardians proporciona entrenamiento profesional completamente documentado y verificable públicamente. 
            Cada perro recibe certificación oficial que respalda las habilidades adquiridas, cumpliendo con 
            estándares internacionales de bienestar animal y metodología ética.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-primary-300 transition-colors">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Certificación Oficial y Verificable</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cada perro que completa nuestro programa recibe un <strong>certificado oficial</strong> con ID único 
              (formato SG-NAR-YYYY-XXXXXX) que documenta de manera profesional y verificable el entrenamiento completado.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Informe técnico detallado de todas las habilidades y tareas entrenadas</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Código QR para verificación pública instantánea en línea</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Clasificación clara: Perro de Servicio o Perro de Soporte Emocional</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Registro permanente en base de datos verificable públicamente</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-primary-300 transition-colors">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Respaldo Legal y Cumplimiento</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nuestro entrenamiento cumple con las normativas colombianas vigentes y estándares internacionales. 
              La certificación que emitimos es un <strong>documento legal válido</strong> que respalda el trabajo 
              profesional realizado.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Conforme a Ley 1618/2013 de Colombia (derechos de personas con discapacidad)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Alineado con Decreto 1538/2005 para perros guía</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Siguiendo principios de Convención ONU sobre Derechos de Personas con Discapacidad (2006)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Documentación aceptada por instituciones, establecimientos y autoridades</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-accent-300 transition-colors">
            <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Derechos de Acceso Público</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Los <strong>Perros de Servicio</strong> certificados por Steady Guardians tienen respaldo legal 
              para acceso a espacios públicos según la Ley 1618/2013 de Colombia, que garantiza a personas con 
              discapacidad el derecho de ingresar con sus perros de asistencia a:
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Establecimientos comerciales, restaurantes, hoteles y espacios públicos</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Sistemas de transporte público (buses, metro, taxis, TransMilenio)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Instituciones educativas y centros de salud</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Lugares de trabajo y oficinas públicas</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Nota: Los Perros de Soporte Emocional no tienen garantía automática de acceso público y dependen 
              de políticas individuales de cada establecimiento.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-accent-300 transition-colors">
            <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Metodología Ética Certificada</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nuestro entrenamiento sigue exclusivamente métodos de <strong>refuerzo positivo</strong> basados 
              en ciencia del comportamiento animal, cumpliendo con los más altos estándares internacionales:
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Directrices IAABC (International Association of Animal Behavior Consultants)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Principios AVSAB (American Veterinary Society of Animal Behavior)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Declaración de Cambridge sobre Conciencia Animal (2012)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Sin métodos aversivos: collares de púas, descargas eléctricas o castigos físicos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Box */}
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Sistema de Verificación Pública</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Cualquier persona puede verificar la autenticidad de un certificado Steady Guardians en línea. 
                Simplemente visite <strong>steadyguardians.com/verify</strong> e ingrese el ID del perro o 
                escanee el código QR del certificado.
              </p>
              <p className="text-sm text-gray-600">
                El sistema mostrará: clasificación (Servicio/Soporte Emocional), programa completado, 
                fecha de certificación, estado de vigencia y validación oficial. La información es pública 
                y transparente, sin incluir datos personales del tutor.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <p className="text-gray-600 text-sm leading-relaxed text-center">
            <strong className="text-gray-900">Compromiso de transparencia:</strong> Steady Guardians emite certificados profesionales que 
            documentan el entrenamiento completado de manera legal y verificable. Nuestra certificación es un 
            documento válido que respalda las habilidades entrenadas y cumple con normativas vigentes. 
            Diferenciamos claramente entre Perros de Servicio (con derechos de acceso legal según Ley 1618/2013) 
            y Perros de Soporte Emocional (sin garantías automáticas de acceso público).
          </p>
        </div>
      </div>
    </section>
  )
}
