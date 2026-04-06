export interface Product {
  id: string
  name: string
  slug: string
  category_id: string
  subcategory?: string
  description: string
  features: string[]
  specifications: Record<string, string>
  images: string[]
  certifications: string[]
  price_range?: string
  sku?: string
  status: 'active' | 'draft'
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  display_order: number
}

export interface Enquiry {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  product_interest?: string
  quantity_needed?: string
  message: string
  source_website?: string
  status: 'new' | 'read' | 'responded'
}

export interface Testimonial {
  id: string
  name: string
  company: string
  country: string
  message: string
  rating: number
}

export interface NavItem {
  label: string
  path: string
  end?: boolean
  children?: NavItem[]
}

export interface SiteConfig {
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  whatsapp_number: string
  social: { linkedin?: string; youtube?: string }
}