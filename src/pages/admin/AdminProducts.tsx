import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Product, Category } from '@/types'
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react'

export default function AdminProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', short_description: '', description: '', category_id: '', images: '', features: '', is_featured: false, is_active: true })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) navigate('/admin')
    fetchData()
  }, [])

  async function fetchData() {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from('products').select('*, category:categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').eq('is_active', true)
    ])
    setProducts(prods || [])
    setCategories(cats || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      ...form,
      images: form.images.split('\n').filter(Boolean),
      features: form.features.split('\n').filter(Boolean),
    }
    if (editProduct) {
      await supabase.from('products').update(data).eq('id', editProduct.id)
    } else {
      await supabase.from('products').insert([data])
    }
    setShowForm(false)
    setEditProduct(null)
    setForm({ name: '', slug: '', short_description: '', description: '', category_id: '', images: '', features: '', is_featured: false, is_active: true })
    fetchData()
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      slug: product.slug,
      short_description: product.short_description,
      description: product.description,
      category_id: product.category_id,
      images: (product.images || []).join('\n'),
      features: (product.features || []).join('\n'),
      is_featured: product.is_featured,
      is_active: product.is_active,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id)
      fetchData()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-xl font-bold text-gray-900">Products</h1>
          </div>
          <button onClick={() => { setShowForm(true); setEditProduct(null) }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{editProduct ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700">Name</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div><label className="text-sm font-medium text-gray-700">Slug</label><input required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Short Description</label><input value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Description</label><textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div><label className="text-sm font-medium text-gray-700">Category</label><select required value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2"><option value="">Select category</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <div><label className="text-sm font-medium text-gray-700">Image URLs (one per line)</label><textarea rows={2} value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Features (one per line)</label><textarea rows={3} value={form.features} onChange={e => setForm({...form, features: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} /> Featured</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} /> Active</label>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
              </div>
            </form>
          </div>
        )}
        {loading ? <div className="text-center py-12">Loading...</div> : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left px-4 py-3 font-medium text-gray-700">Product</th><th className="text-left px-4 py-3 font-medium text-gray-700">Category</th><th className="text-left px-4 py-3 font-medium text-gray-700">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.category?.name}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td className="px-4 py-3 flex items-center gap-2 justify-center">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}