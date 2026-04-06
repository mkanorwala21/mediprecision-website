import { Award, CheckCircle, Link } from 'lucide-react';
import { siteContent } from '@/data/content';

export default function QualityPage() {
  const { quality } = siteContent;

  return (
    <div className="pt-16">
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{quality.title}</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">{quality.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Our Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quality.certifications.map(cert => (
              <div key={cert.name} className="bg-white border-2 border-blue-100 rounded-xl p-6 text-center hover:border-blue-300 transition-colors shadow-sm">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-blue-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quality Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Raw material inspection and testing',
              'In-process quality control checks',
              'Final product testing and validation',
              'Packaging integrity verification',
              'Sterility testing for applicable products',
              'Regular third-party audits',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-white p-4 rounded-lg border">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
