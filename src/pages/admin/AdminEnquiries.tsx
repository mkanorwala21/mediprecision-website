import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Enquiry } from '@/types'
import { ArrowLeft, Mail, Phone, Eye } from 'lucide-react'

export default function AdminEnquiries() {
  const navigate = useNavigate()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Enquiry | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) navigate('/admin')
    fetchEnquiries()
  }, [])

  async function fetchEnquiries() {
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    setEnquiries(data || [])
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    await supabase.from('enquiries').update({ status: 'read' }).eq('id', id)
    fetchEnquiries()
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-600',
    replied: 'bg-green-100 text-green-700',
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-900">Enquiries</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {selected && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Enquiry Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-gray-700">Name:</span> <span className="text-gray-600">{selected.name}</span></div>
              <div><span className="font-medium text-gray-700">Email:</span> <a href={`mailto:${selected.email}`} className="text-blue-600">{selected.email}</a></div>
              <div><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-600">{selected.phone || 'N/A'}</span></div>
              <div><span className="font-medium text-gray-700">Company:</span> <span className="text-gray-600">{selected.company || 'N/A'}</span></div>
              <div><span className="font-medium text-gray-700">Country:</span> <span className="text-gray-600">{selected.country || 'N/A'}</span></div>
              <div><span className="font-medium text-gray-700">Date:</span> <span className="text-gray-600">{new Date(selected.created_at).toLocaleDateString()}</span></div>
              <div className="col-span-2"><span className="font-medium text-gray-700">Message:</span><p className="text-gray-600 mt-1 p-3 bg-gray-50 rounded-lg">{selected.message}</p></div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"><Mail className="w-4 h-4" /> Reply by Email</a>
              {selected.phone && <a href={`tel:${selected.phone}`} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"><Phone className="w-4 h-4" /> Call</a>}
            </div>
          </div>
        )}
        {loading ? <div className="text-center py-12">Loading...</div> : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left px-4 py-3 font-medium text-gray-700">Name</th><th className="text-left px-4 py-3 font-medium text-gray-700">Email</th><th className="text-left px-4 py-3 font-medium text-gray-700">Country</th><th className="text-left px-4 py-3 font-medium text-gray-700">Status</th><th className="text-left px-4 py-3 font-medium text-gray-700">Date</th><th className="px-4 py-3">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map(enq => (
                  <tr key={enq.id} className={enq.status === 'new' ? 'font-medium' : ''}>
                    <td className="px-4 py-3 text-gray-900">{enq.name}</td>
                    <td className="px-4 py-3 text-gray-500">{enq.email}</td>
                    <td className="px-4 py-3 text-gray-500">{enq.country || '-'}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[enq.status] || ''}`}>{enq.status}</span></td>
                    <td className="px-4 py-3 text-gray-500">{new Date(enq.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex items-center gap-2 justify-center">
                      <button onClick={() => { setSelected(enq); if (enq.status === 'new') markAsRead(enq.id) }} className="text-blue-600 hover:text-blue-800"><Eye className="w-4 h-4" /></button>
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