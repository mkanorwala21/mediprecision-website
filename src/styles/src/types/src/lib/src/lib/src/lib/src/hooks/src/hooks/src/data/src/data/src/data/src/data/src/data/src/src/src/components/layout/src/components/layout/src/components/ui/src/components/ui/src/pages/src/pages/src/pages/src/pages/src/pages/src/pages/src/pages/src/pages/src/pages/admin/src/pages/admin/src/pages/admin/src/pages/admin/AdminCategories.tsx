import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultCategories } from '@/data/categories';
import type { Category } from '@/types';

export default function AdminCategories() {
  const [categories, setCategories] = useLocalStorage<Category[]>('cms_categories', defaultCategories);
  const [showForm, setShowForm] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });

  const resetForm = () => { setForm({ name: '', slug: '', description: '' }); setEditCat(null); setShowForm(false); };

  const handleEdit = (c: Category) => {
    setEditCat(c);
    setForm({ name: c.name, slug: c.slug, description: c.description || '' });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCat) {
      setCategories(categories.map(c => c.id === editCat.id ? { ...c, ...form } : c));
    } else {
      setCategories([...categories, { ...form, id: Date.now().toString(), image: '', isActive: true }]);
    }
    resetForm();
  };

  const deleteCategory = (id: string) => { if (confirm('Delete this category?')) setCategories(categories.filter(c => c.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{editCat ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} required className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">{editCat ? 'Update' : 'Save'}</button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-gray-700 font-medium">Name</th>
              <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">Slug</th>
              <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">Description</th>
              <th className="text-right px-4 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.slug}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.description || '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(c)} className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                    <button onClick={() => deleteCategory(c.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
