'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom section-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/images/Logo.png"
                alt="Steady Guardians Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Steady Guardians</h1>
              <p className="text-xs text-gray-600">Service Dogs Colombia</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#programas" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Programas
            </Link>
            <Link href="/#proceso" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Proceso
            </Link>
            <Link href="/verify" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Verificar
            </Link>
            <Link href="/#faq" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              FAQ
            </Link>
            <Link href="/#contacto" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Contacto
            </Link>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/#contacto" className="btn-primary">
              Agendar Evaluación
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/#programas"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programas
            </Link>
            <Link
              href="/#proceso"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Proceso
            </Link>
            <Link
              href="/verify"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Verificar
            </Link>
            <Link
              href="/#faq"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/#contacto"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
            <Link
              href="/admin"
              className="block text-sm text-gray-500 hover:text-primary-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Link
              href="/#contacto"
              className="block btn-primary text-center"
              onClick={() => setIsOpen(false)}
            >
              Agendar Evaluación
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
