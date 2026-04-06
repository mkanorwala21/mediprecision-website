import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultProducts } from '@/data/products';
import { defaultCategories } from '@/data/categories';
import type { Product, Category } from '@/types';

export default function AdminProducts() {
  const [products, setProducts] = useLocalStorage<Product[]>('cms_products', defaultProducts);
  const [categories] = useLocalStorage<Category[]>('cms_categories', defaultCategories);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', categoryId: '', shortDescription: '', description: '', moq: '', isActive: true });

  const resetForm = () => { setForm({ name: '', slug: '', categoryId: '', shortDescription: '', description: '', moq: '', isActive: true }); setEditProduct(null); setShowForm(false); };

  const handleEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, slug: p.slug, categoryId: p.categoryId, shortDescription: p.shortDescription || '', description: p.description, moq: p.moq || '', isActive: p.isActive });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...form } : p));
    } else {
      const newProduct: Product = { ...form, id: Date.now().toString(), features: [], specifications: {}, images: [], tags: [], inStock: true, createdAt: new Date().toISOString() };
      setProducts([...products, newProduct]);
    }
    resetForm();
  };

  const toggleActive = (id: string) => setProducts(products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  const deleteProduct = (id: string) => { if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} required className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MOQ</label>
              <input value={form.moq} onChange={e => setForm({...form, moq: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">{editProduct ? 'Update' : 'Save'}</button>
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
              <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">MOQ</th>
              <th className="text-left px-4 py-3 text-gray-700 font-medium">Status</th>
              <th className="text-right px-4 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(p => {
              const cat = categories.find(c => c.id === p.categoryId);
              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{cat?.name || '-'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.moq || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{p.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleActive(p.id)} className="text-gray-400 hover:text-blue-600">{p.isActive ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                      <button onClick={() => handleEdit(p)} className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
