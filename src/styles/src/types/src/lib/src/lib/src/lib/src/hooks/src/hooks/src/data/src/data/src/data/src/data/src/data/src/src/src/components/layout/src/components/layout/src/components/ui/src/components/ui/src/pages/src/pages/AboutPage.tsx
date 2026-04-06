import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight } from 'lucide-react';
import { siteContent } from '@/data/content';
import { siteConfig } from '@/data/siteConfig';

export default function AboutPage() {
  const { about } = siteContent;

  return (
    <div className="pt-16">
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{about.title}</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">ISO 13485 Certified Medical Equipment Manufacturer based in Pune, India</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">{about.story}</p>
              <p className="text-gray-600">Located at {siteConfig.address}, our facility spans modern manufacturing infrastructure with ISO-compliant processes at every step.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{label:'Countries Served', value:'125+'},{label:'Products', value:'500+'},{label:'Years Experience', value:'20+'},{label:'Happy Clients', value:'1000+'}].map(stat => (
                <div key={stat.label} className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Target size={20} className="text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600">{about.mission}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <Eye size={20} className="text-teal-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">{about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((val) => (
              <div key={val.title} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <h3 className="font-bold text-blue-700 text-lg mb-2">{val.title}</h3>
                <p className="text-gray-600 text-sm">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Know More?</h2>
          <Link to="/contact" className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold gap-2">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
