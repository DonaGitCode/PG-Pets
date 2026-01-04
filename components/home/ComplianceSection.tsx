import { Shield, AlertCircle, FileText, Scale } from 'lucide-react'

export default function ComplianceSection() {
  return (
    <section id="cumplimiento" className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white my-12 md:my-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-600/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Scale className="w-4 h-4" />
            <span>Marco Legal Nacional e Internacional</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Marco de Cumplimiento Legal y Responsabilidad Profesional
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            Steady Guardians opera bajo los más altos estándares de profesionalismo, cumplimiento legal 
            y bienestar animal, diferenciando claramente entre Perros de Servicio y Perros de Soporte Emocional.
          </p>
          <p className="text-sm text-gray-400">
            Referencias: Ley 1618/2013 (Colombia) · ADA (EE.UU.) · Convención ONU sobre Derechos de Personas con Discapacidad (2006) · Decreto 1538/2005 (Colombia)
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Clasificación Legal Clara</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong>PERROS DE SERVICIO:</strong> Según Ley 1618/2013 de Colombia, son animales entrenados 
              para realizar tareas específicas que asisten a personas con discapacidades. Tienen derechos de 
              acceso público garantizados a espacios, transporte y establecimientos (Art. 14). El Decreto 1538/2005 
              regula específicamente perros guía para personas con discapacidad visual.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>PERROS DE SOPORTE EMOCIONAL:</strong> NO están cubiertos por Ley 1618/2013. No tienen 
              derechos de acceso automático. El acceso depende de políticas individuales de cada establecimiento, 
              aerolínea o institución. Su valor es emocional, no funcional-asistencial.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Documentación y Verificación</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Proporcionamos documentación profesional verificable públicamente (ID/QR) que especifica:
              1) Clasificación exacta (Servicio o Soporte Emocional),
              2) Tareas específicas entrenadas (solo Servicio),
              3) Fechas de entrenamiento y vigencia,
              4) Programa completado con metodología ética.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>IMPORTANTE:</strong> No emitimos "certificaciones legales" de perro de servicio, ya que 
              la categorización legal debe ser validada por autoridades competentes según cada jurisdicción. 
              Documentamos el entrenamiento completado profesionalmente.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Derechos de Acceso y Normativas</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong>Colombia (Ley 1618/2013):</strong> Perros de Servicio tienen acceso garantizado a espacios 
              públicos, transporte, establecimientos comerciales, instituciones educativas y salud. Los 
              establecimientos NO pueden cobrar tarifas adicionales ni restringir acceso (salvo riesgo sanitario documentado).
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>Aerolíneas:</strong> Políticas cambiaron 2020-2021. Perros de Servicio: generalmente permitidos 
              en cabina (documentación requerida). Perros de Soporte Emocional: deben viajar como mascotas regulares 
              (cargo, restricciones). Cada aerolínea define políticas específicas.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Responsabilidad Compartida y Bienestar Animal</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong>Compromiso de Steady Guardians:</strong> Entrenar con métodos éticos (refuerzo positivo, 
              IAABC/AVSAB), documentar profesionalmente, diferenciar claramente clasificaciones, educar sobre 
              derechos legales aplicables según Ley 1618/2013 y normativas internacionales.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>Responsabilidad del Tutor:</strong> Conocer y cumplir leyes aplicables en cada contexto 
              (local, nacional, internacional), presentar documentación cuando solicitada, asegurar comportamiento 
              apropiado del perro en espacios públicos, respetar políticas de establecimientos privados.
            </p>
          </div>
        </div>

        {/* Legal References Box */}
        <div className="bg-primary-600/20 border border-primary-500/50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-3">Referencias Legales Aplicables</h4>
              <div className="space-y-2 text-sm text-gray-200">
                <p><strong>Colombia:</strong> Ley 1618 de 2013 (derechos de personas con discapacidad, Art. 14 acceso con perros de servicio), Decreto 1538 de 2005 (perros guía), Ley 1346 de 2009 (ratificación Convención ONU).</p>
                <p><strong>Internacional:</strong> Convención sobre los Derechos de las Personas con Discapacidad (ONU, 2006), ADA - Americans with Disabilities Act (EE.UU., referencia internacional), Declaración de Cambridge sobre Conciencia Animal (2012).</p>
                <p><strong>Bienestar Animal:</strong> IAABC (International Association of Animal Behavior Consultants), AVSAB (American Veterinary Society of Animal Behavior), directrices internacionales de entrenamiento ético.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-accent-600/20 border border-accent-500/50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">Aviso Legal Importante</h4>
              <p className="text-gray-200 leading-relaxed">
                La información proporcionada es educativa y basada en normativas vigentes a 2026. Las leyes pueden 
                cambiar. Steady Guardians NO ofrece asesoría legal. Para consultas legales específicas sobre derechos 
                de acceso, consulte a un abogado especializado en derechos de personas con discapacidad. Cada caso 
                puede tener particularidades que requieren evaluación legal profesional. Nuestro rol es entrenar 
                profesionalmente y documentar el entrenamiento completado, diferenciando claramente entre Perros de 
                Servicio (con derechos de acceso según Ley 1618/2013) y Perros de Soporte Emocional (sin garantías legales de acceso).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-3xl mx-auto">
            © 2026 Steady Guardians · Comprometidos con el bienestar animal, la transparencia legal y la responsabilidad profesional
          </p>
        </div>
      </div>
    </section>
  )
}
