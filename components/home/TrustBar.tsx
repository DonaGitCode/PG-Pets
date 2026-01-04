import { Shield, Award, Heart, MapPin, FileCheck } from 'lucide-react'

export default function TrustBar() {
  const features = [
    {
      icon: Shield,
      text: 'Entrenamiento especializado'
    },
    {
      icon: FileCheck,
      text: 'Verificación pública'
    },
    {
      icon: Heart,
      text: 'Bienestar animal'
    },
    {
      icon: MapPin,
      text: 'Cobertura Nacional'
    },
    {
      icon: Award,
      text: 'Programas certificados'
    }
  ]

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="container-custom section-padding py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-center justify-center space-x-3 text-gray-700">
                <Icon className="w-6 h-6 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-center">{feature.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
