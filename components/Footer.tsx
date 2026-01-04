import Link from 'next/link'
import Image from 'next/image'
import { Shield, Mail, MapPin, Phone, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding py-12 md:py-16 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <img
                  src="/images/Logo.png"
                  alt="Steady Guardians Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Steady Guardians</h3>
                <p className="text-sm text-gray-400">Bogotá, Colombia</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Entrenamiento profesional de perros de asistencia y alerta médica. 
              Comprometidos con el bienestar animal y la calidad de vida de nuestros tutores.
            </p>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Programas</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#programas" className="text-sm hover:text-primary-400 transition-colors">
                  Apoyo Emocional
                </Link>
              </li>
              <li>
                <Link href="/#programas" className="text-sm hover:text-primary-400 transition-colors">
                  Perros de Servicio
                </Link>
              </li>
              <li>
                <Link href="/#programas" className="text-sm hover:text-primary-400 transition-colors">
                  Perros Lazarillo
                </Link>
              </li>
              <li>
                <Link href="/#programas" className="text-sm hover:text-primary-400 transition-colors">
                  Alerta Médica
                </Link>
              </li>
              <li>
                <Link href="/#programas" className="text-sm hover:text-primary-400 transition-colors">
                  Evaluación Conductual
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#proceso" className="text-sm hover:text-primary-400 transition-colors">
                  Nuestro Proceso
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-sm hover:text-primary-400 transition-colors">
                  Verificar Entrenamiento
                </Link>
              </li>
              <li>
                <Link href="/#cumplimiento" className="text-sm hover:text-primary-400 transition-colors">
                  Marco de Cumplimiento
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm hover:text-primary-400 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-sm hover:text-primary-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Sede Principal: Cl. 134 #1542, Usaquén, Bogotá<br/>Cobertura Nacional</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">+57 312 345 6789</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">info@steadyguardians.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Steady Guardians. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
