import { Shield, AlertCircle, FileText, Scale } from 'lucide-react'

export default function ComplianceSection() {
  return (
    <section id="cumplimiento" className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white my-12 md:my-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-600/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Scale className="w-4 h-4" />
            <span>Marco Legal y Profesional</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Marco de Cumplimiento y Responsabilidad
          </h2>
          <p className="text-lg text-gray-300">
            Steady Guardians opera con los más altos estándares de profesionalismo, 
            bienestar animal y responsabilidad legal.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Entrenamiento Profesional</h3>
            <p className="text-gray-300 leading-relaxed">
              Nuestros programas se basan en métodos de entrenamiento positivo, éticos y alineados 
              con las mejores prácticas internacionales de bienestar animal. Cada binomio perro-tutor 
              es preparado con rigor profesional y documentado de manera exhaustiva.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Verificación y Registro</h3>
            <p className="text-gray-300 leading-relaxed">
              La verificación pública por ID/QR valida la existencia y el estado de un proceso de 
              entrenamiento completado y evaluado. Cada registro incluye información del programa, 
              fechas y alcance del entrenamiento, sin exponer datos personales del tutor.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Normativas Aplicables</h3>
            <p className="text-gray-300 leading-relaxed">
              El acceso, transporte y aceptación de perros de asistencia en espacios públicos, 
              transporte y establecimientos depende de normativas locales, nacionales e 
              internacionales aplicables. Steady Guardians prepara al binomio, pero la 
              responsabilidad de conocer y cumplir las regulaciones es del tutor.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Responsabilidad Compartida</h3>
            <p className="text-gray-300 leading-relaxed">
              Nuestro compromiso es entrenar y documentar adecuadamente. El tutor tiene la 
              responsabilidad de informarse sobre las políticas de acceso aplicables en cada 
              contexto (aerolíneas, instituciones, transporte público, etc.) y presentar la 
              documentación según sea requerido.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-primary-600/20 border border-primary-500/50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">Nota Importante</h4>
              <p className="text-gray-200 leading-relaxed">
                Para consultas sobre normativas específicas en Colombia, te recomendamos revisar la 
            Ley 1618 de 2013 (derechos de personas con discapacidad) y normativas locales aplicables. 
            Steady Guardians está comprometido con el bienestar animal, la transparencia y la 
            responsabilidad profesional.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-3xl mx-auto">
            © 2026 Steady Guardians
          </p>
        </div>
      </div>
    </section>
  )
}
