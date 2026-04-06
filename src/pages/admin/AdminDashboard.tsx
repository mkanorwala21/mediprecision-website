import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Package, Tags, MessageSquare, LogOut, Home } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ products: 0, categories: 0, enquiries: 0, newEnquiries: 0 })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) navigate('/admin')
    fetchStats()
  }, [])

  async function fetchStats() {
    const [{ count: products }, { count: categories }, { count: enquiries }, { count: newEnquiries }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ])
    setStats({ products: products || 0, categories: categories || 0, enquiries: enquiries || 0, newEnquiries: newEnquiries || 0 })
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin')
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Tags },
    { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">MediPrecision Admin</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">View Site</Link>
            <button onClick={logout} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 hover:text-blue-600 whitespace-nowrap">
              <item.icon className="w-4 h-4" /> {item.label}
            </Link>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Products', value: stats.products, icon: Package, color: 'blue' },
            { label: 'Categories', value: stats.categories, icon: Tags, color: 'purple' },
            { label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'green' },
            { label: 'New Enquiries', value: stats.newEnquiries, icon: MessageSquare, color: 'red' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}