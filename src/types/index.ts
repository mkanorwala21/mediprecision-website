export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  category_id: string
  category?: Category
  images: string[]
  features: string[]
  specifications: Record<string, string>
  certifications: string[]
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  created_at: string
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  company: string
  country: string
  message: string
  product_id?: string
  product?: Product
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export interface AdminAuth {
  isAuthenticated: boolean
  username: string
}