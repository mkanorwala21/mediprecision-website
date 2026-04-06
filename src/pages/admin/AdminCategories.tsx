import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Category } from '@/types'
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react'

export default function AdminCategories() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editCat, setEditCat] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '', is_active: true })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) navigate('/admin')
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false })
    setCategories(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editCat) {
      await supabase.from('categories').update(form).eq('id', editCat.id)
    } else {
      await supabase.from('categories').insert([form])
    }
    setShowForm(false)
    setEditCat(null)
    setForm({ name: '', slug: '', description: '', image: '', is_active: true })
    fetchCategories()
  }

  const handleEdit = (cat: Category) => {
    setEditCat(cat)
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, is_active: cat.is_active })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category?')) {
      await supabase.from('categories').delete().eq('id', id)
      fetchCategories()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-xl font-bold text-gray-900">Categories</h1>
          </div>
          <button onClick={() => { setShowForm(true); setEditCat(null) }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{editCat ? 'Edit' : 'Add'} Category</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700">Name</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div><label className="text-sm font-medium text-gray-700">Slug</label><input required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Description</label><textarea rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div><label className="text-sm font-medium text-gray-700">Image URL</label><input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full mt-1 border rounded-lg px-3 py-2" /></div>
              <div className="flex items-center"><label className="flex items-center gap-2 mt-6"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} /> Active</label></div>
              <div className="col-span-2 flex gap-2 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
              </div>
            </form>
          </div>
        )}
        {loading ? <div className="text-center py-12">Loading...</div> : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left px-4 py-3 font-medium text-gray-700">Name</th><th className="text-left px-4 py-3 font-medium text-gray-700">Slug</th><th className="text-left px-4 py-3 font-medium text-gray-700">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${cat.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{cat.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td className="px-4 py-3 flex items-center gap-2 justify-center">
                      <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
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