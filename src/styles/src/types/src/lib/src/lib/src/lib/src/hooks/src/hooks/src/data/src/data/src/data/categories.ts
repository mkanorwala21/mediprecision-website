import type { Category } from '@/types'
export const defaultCategories: Category[] = [
  { id:'cat1', name:'Infusion Therapy', slug:'infusion-therapy', description:'IV sets, infusion pumps, IV cannulas', icon:'Droplet', display_order:1 },
  { id:'cat2', name:'Surgical Instruments', slug:'surgical-instruments', description:'Scalpels, forceps, scissors, retractors', icon:'Scissors', display_order:2 },
  { id:'cat3', name:'Diagnostics & Imaging', slug:'diagnostics', description:'X-ray tubes, ECG, electro-diagnostic apparatus', icon:'Activity', display_order:3 },
  { id:'cat4', name:'Blood Collection', slug:'blood-collection', description:'Vacutainers, lancets, blood bags', icon:'HeartPulse', display_order:4 },
  { id:'cat5', name:'Wound Care', slug:'wound-care', description:'Bandages, dressings, sutures', icon:'Bandage', display_order:5 },
  { id:'cat6', name:'Urology & Catheters', slug:'urology', description:'Foley catheters, nephrostomy, urostomy', icon:'Circle', display_order:6 },
  { id:'cat7', name:'Respiratory Care', slug:'respiratory', description:'Oxygen masks, nebulizers, ventilator circuits', icon:'Wind', display_order:7 },
  { id:'cat8', name:'Hospital Furniture', slug:'hospital-furniture', description:'Medical beds, trolleys, stretchers', icon:'BedDouble', display_order:8 },
  { id:'cat9', name:'Mobility Aids', slug:'mobility-aids', description:'Wheelchairs, crutches, walkers', icon:'PersonStanding', display_order:9 },
  { id:'cat10', name:'Cardiology', slug:'cardiology', description:'ECG electrodes, stethoscopes, BP monitors', icon:'Heart', display_order:10 },
  { id:'cat11', name:'Oncology', slug:'oncology', description:'Chemotherapy sets, port-a-cath, safety devices', icon:'Shield', display_order:11 },
  { id:'cat12', name:'Sterilization', slug:'sterilization', description:'Autoclave pouches, sterilization indicators', icon:'FlaskConical', display_order:12 },
]