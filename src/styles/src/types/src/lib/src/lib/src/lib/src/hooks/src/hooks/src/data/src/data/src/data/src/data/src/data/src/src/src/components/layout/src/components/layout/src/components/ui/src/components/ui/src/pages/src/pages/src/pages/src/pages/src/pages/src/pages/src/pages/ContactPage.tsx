import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';
import { enquirySchema, type EnquiryFormData } from '@/lib/validators';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { contact } = siteContent;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setError('');
    try {
      const { error: sbError } = await supabase.from('enquiries').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country,
        company: data.company || null,
        product_interest: data.product_interest || null,
        message: data.message,
        enquiry_type: data.enquiry_type,
        status: 'new',
      }]);
      if (sbError) throw sbError;
      setSubmitted(true);
      reset();
    } catch (e) {
      setError('Failed to submit. Please try again or contact us directly.');
    }
  };

  return (
    <div className="pt-16">
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{contact.title}</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">{contact.intro}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-700 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Address</p>
                    <p className="text-gray-600 text-sm">{siteConfig.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-blue-700" />
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <a href={`tel:${siteConfig.phone}`} className="text-gray-600 text-sm hover:text-blue-700">{siteConfig.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-blue-700" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-gray-600 text-sm hover:text-blue-700">{siteConfig.email}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your enquiry has been submitted. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-700 hover:underline text-sm">Submit another enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{contact.form_title}</h3>

                {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 text-sm">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input {...register('name')} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input {...register('email')} type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input {...register('phone')} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <input {...register('country')} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input {...register('company')} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type *</label>
                    <select {...register('enquiry_type')} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="general">General Enquiry</option>
                      <option value="product">Product Enquiry</option>
                      <option value="oem">OEM / Private Label</option>
                      <option value="sample">Sample Request</option>
                      <option value="pricing">Pricing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Interest</label>
                  <input {...register('product_interest')} placeholder="e.g. IV Cannula, Surgical Blades" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea {...register('message')} rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-800 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
