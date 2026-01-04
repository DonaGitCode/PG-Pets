export interface Certification {
  id: number
  cert_id: string
  status: 'Vigente' | 'Condicional' | 'Vencido' | 'Revocado'
  animal_type: string
  animal_name: string
  animal_photo: string | null
  program_type: 'Apoyo Emocional' | 'Servicio' | 'Lazarillo (Guía)' | 'Alerta Médica' | 'Evaluación Conductual'
  issued_at: string
  valid_until: string | null
  scope: string | null
  notes_private: string | null
  trainer_name: string
  verification_code: string
  created_at: string
  updated_at: string
}

export interface ProgramInfo {
  id: string
  title: string
  description: string
  features: string[]
  target: string
  duration: string
  deliverables: string[]
  icon: string
}

export interface Testimonial {
  id: number
  name: string
  city: string
  program: string
  text: string
  rating: number
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  program: string
  message: string
}
