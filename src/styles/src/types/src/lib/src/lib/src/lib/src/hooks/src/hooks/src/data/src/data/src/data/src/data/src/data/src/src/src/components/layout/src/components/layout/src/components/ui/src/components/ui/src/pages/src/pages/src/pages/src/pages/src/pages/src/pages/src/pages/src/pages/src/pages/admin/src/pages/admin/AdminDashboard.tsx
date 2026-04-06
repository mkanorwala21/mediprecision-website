import { Link } from 'react-router-dom';
import { Package, Tag, MessageSquare, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultProducts } from '@/data/products';
import { defaultCategories } from '@/data/categories';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import type { Product, Category } from '@/types';

export default function AdminDashboard() {
  const [products] = useLocalStorage<Product[]>('cms_products', defaultProducts);
  const [categories] = useLocalStorage<Category[]>('cms_categories', defaultCategories);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [newEnquiries, setNewEnquiries] = useState(0);

  useEffect(() => {
    supabase.from('enquiries').select('id, status', { count: 'exact' }).then(({ count }) => {
      if (count) setEnquiryCount(count);
    });
    supabase.from('enquiries').select('id', { count: 'exact' }).eq('status', 'new').then(({ count }) => {
      if (count) setNewEnquiries(count);
    });
  }, []);

  const stats = [
    { icon: Package, label: 'Total Products', value: products.length, color: 'bg-blue-50 text-blue-700', link: '/admin/products' },
    { icon: Tag, label: 'Categories', value: categories.length, color: 'bg-teal-50 text-teal-700', link: '/admin/categories' },
    { icon: MessageSquare, label: 'Total Enquiries', value: enquiryCount, color: 'bg-purple-50 text-purple-700', link: '/admin/enquiries' },
    { icon: TrendingUp, label: 'New Enquiries', value: newEnquiries, color: 'bg-orange-50 text-orange-700', link: '/admin/enquiries' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.link} className="bg-white rounded-lg border p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">Add Product</Link>
          <Link to="/admin/categories" className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700">Manage Categories</Link>
          <Link to="/admin/enquiries" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">View Enquiries</Link>
          <Link to="/" target="_blank" className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">View Website</Link>
        </div>
      </div>
    </div>
  );
}
