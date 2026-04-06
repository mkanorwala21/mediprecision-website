export const slugify = (t: string) => t.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'')
export const generateId = () => Math.random().toString(36).substring(2,11)
export const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'})
export const cn = (...c: (string|undefined|false|null)[]) => c.filter(Boolean).join(' ')