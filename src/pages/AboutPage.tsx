import { siteConfig } from '@/lib/siteConfig'
import { Users, Factory, Award, Target } from 'lucide-react'

const values = [
  { icon: Award, title: 'Quality First', desc: 'Every product meets international quality standards before leaving our facility.' },
  { icon: Users, title: 'Customer Focus', desc: 'We work closely with clients to understand and meet their specific requirements.' },
  { icon: Factory, title: 'Innovation', desc: 'Continuously investing in R&D to develop cutting-edge medical solutions.' },
  { icon: Target, title: 'Precision', desc: 'Micro-level precision in manufacturing for optimal performance and safety.' },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About MediPrecision</h1>
          <p className="text-blue-200 text-xl max-w-2xl">Trusted manufacturer of precision medical equipment serving healthcare globally since 1999.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">{siteConfig.name} was founded with a mission to make high-quality medical equipment accessible to healthcare providers worldwide. Based in Sialkot, the surgical instrument capital of the world, we leverage generations of craftsmanship and modern technology.</p>
              <p className="text-gray-600 mb-4">Over 25 years, we have grown from a local manufacturer to a global exporter, serving hospitals, clinics, and medical distributors in 50+ countries across 6 continents.</p>
              <p className="text-gray-600">Our state-of-the-art manufacturing facility is ISO 13485:2016 certified, and all our products meet CE marking and FDA registration requirements.</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-6">Certifications & Compliance</h3>
              <ul className="space-y-3">
                {siteConfig.certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}