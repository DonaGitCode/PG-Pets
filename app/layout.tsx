import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Steady Guardians - Entrenamiento de Perros de Asistencia | Usaquén, Bogotá',
  description: 'Entrenamiento profesional de perros de asistencia, servicio, lazarillo y alerta médica en toda Colombia. Sede en Cl. 134 #1542, Usaquén, Bogotá. Programas certificados con verificación ID/QR.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
