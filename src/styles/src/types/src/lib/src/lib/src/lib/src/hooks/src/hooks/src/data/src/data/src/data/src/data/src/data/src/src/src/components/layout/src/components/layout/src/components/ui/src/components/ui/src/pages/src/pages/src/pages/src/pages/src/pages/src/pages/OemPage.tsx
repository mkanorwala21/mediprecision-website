import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { siteContent } from '@/data/content';

export default function OemPage() {
  const { oem } = siteContent;

  return (
    <div className="pt-16">
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{oem.title}</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">{oem.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">OEM Benefits</h2>
              <ul className="space-y-3">
                {oem.benefits.map(b => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 gap-2 transition-colors">
                  Start OEM Partnership <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
              <div className="space-y-4">
                {oem.process.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Own Brand?</h2>
          <p className="text-teal-100 mb-6">Get a customized quote for private label or OEM manufacturing.</p>
          <Link to="/contact" className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold gap-2">
            Request OEM Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
