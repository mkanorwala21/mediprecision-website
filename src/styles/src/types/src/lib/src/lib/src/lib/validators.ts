import { z } from 'zod'
export const enquirySchema = z.object({
  name: z.string().min(2,'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  product_interest: z.string().optional(),
  quantity_needed: z.string().optional(),
  message: z.string().min(10,'Message too short'),
  honeypot: z.string().max(0).optional(),
})
export type EnquiryFormData = z.infer<typeof enquirySchema>