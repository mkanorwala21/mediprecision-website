import { siteConfig } from '@/lib/siteConfig'
import { CheckCircle, FlaskConical, FileCheck, ShieldCheck } from 'lucide-react'

const processes = [
  { icon: FlaskConical, title: 'Raw Material Testing', desc: 'Every incoming material is tested for composition, hardness, and compliance.' },
  { icon: ShieldCheck, title: 'In-Process QC', desc: 'Quality checks at every stage of manufacturing to catch issues early.' },
  { icon: FileCheck, title: 'Final Inspection', desc: 'Comprehensive inspection before packaging including dimensional checks.' },
  { icon: CheckCircle, title: 'Documentation', desc: 'Full traceability and documentation for regulatory compliance.' },
]

export default function QualityPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Quality Assurance</h1>
          <p className="text-blue-200 text-xl max-w-2xl">Our commitment to quality is embedded in every step of our manufacturing process.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Quality Standards</h2>
              <p className="text-gray-600 mb-4">MediPrecision operates under a rigorous Quality Management System (QMS) certified to ISO 13485:2016 - the international standard for medical device manufacturers.</p>
              <p className="text-gray-600 mb-6">All our products undergo extensive testing and validation to ensure they meet the highest safety and performance standards required by healthcare professionals globally.</p>
              <div className="space-y-3">
                {siteConfig.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-800">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Testing Capabilities</h3>
              <ul className="space-y-3 text-gray-700">
                {['Dimensional inspection', 'Material composition analysis', 'Sterility testing', 'Biocompatibility testing', 'Mechanical stress testing', 'Corrosion resistance testing', 'Packaging integrity testing'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Quality Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-8 h-8 text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-900 text-white text-xs rounded-full flex items-center justify-center font-bold">{i+1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}