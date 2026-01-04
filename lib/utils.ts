import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | null): string {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateShort(date: string | null): string {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function isExpired(validUntil: string | null): boolean {
  if (!validUntil) return false
  return new Date(validUntil) < new Date()
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Vigente':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Condicional':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Vencido':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'Revocado':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// City codes for Colombian cities
export const CITY_CODES = {
  'Bogotá': 'BOG',
  'Medellín': 'MED',
  'Cali': 'CAL',
  'Barranquilla': 'BAQ',
  'Cartagena': 'CTG',
  'Bucaramanga': 'BGA',
  'Pereira': 'PEI',
  'Manizales': 'MZL',
  'Pasto': 'PSO',
  'Ibagué': 'IBG',
  'Cúcuta': 'CUC',
  'Santa Marta': 'SMR',
  'Villavicencio': 'VVC',
  'Armenia': 'ARM',
  'Neiva': 'NVA',
} as const

export function generateCertId(cityCode: string = 'BOG'): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
  return `SG-${cityCode}-${year}-${random}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount)
}

export function getWhatsAppLink(number: string, message?: string): string {
  const baseUrl = 'https://wa.me/'
  const fullNumber = number.replace(/\D/g, '')
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
  return `${baseUrl}${fullNumber}${encodedMessage}`
}
