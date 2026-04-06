import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Eye } from 'lucide-react';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  country: string;
  company?: string;
  product_interest?: string;
  message: string;
  enquiry_type: string;
  status: string;
  created_at: string;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (data) setEnquiries(data);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    await supabase.from('enquiries').update({ status }).eq('id', id);
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const filtered = statusFilter === 'all' ? enquiries : enquiries.filter(e => e.status === statusFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Enquiries</h2>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-md px-3 py-2 text-sm">
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {selected && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Enquiry Details</h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-sm">Close</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone || '-'], ['Country', selected.country], ['Company', selected.company || '-'], ['Type', selected.enquiry_type], ['Product Interest', selected.product_interest || '-'], ['Date', new Date(selected.created_at).toLocaleDateString()]].map(([label, value]) => (
              <div key={label}>
                <span className="font-medium text-gray-600">{label}: </span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-medium text-gray-600 text-sm mb-1">Message:</p>
            <p className="text-gray-800 text-sm bg-gray-50 rounded p-3">{selected.message}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} className="border rounded-md px-3 py-2 text-sm">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading enquiries...</div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">Country</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium hidden md:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-gray-700 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.email}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.country}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      e.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      e.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{new Date(e.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(e)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 ml-auto">
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">No enquiries found.</div>}
        </div>
      )}
    </div>
  );
}
