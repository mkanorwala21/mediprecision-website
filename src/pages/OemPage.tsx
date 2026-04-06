import { Link } from 'react-router-dom'
import { Settings, Package, Truck, Headphones } from 'lucide-react'

const services = [
  { icon: Settings, title: 'Custom Design', desc: 'Work with our engineers to create instruments tailored to your exact specifications.' },
  { icon: Package, title: 'Private Labeling', desc: 'Your brand, our quality. We can add your logo and branding to all products.' },
  { icon: Truck, title: 'Bulk Production', desc: 'Scalable manufacturing capacity to meet any order size from 100 to 1,000,000+ units.' },
  { icon: Headphones, title: 'Dedicated Support', desc: 'Assigned account manager to guide you through the entire process.' },
]

export default function OemPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">OEM Services</h1>
          <p className="text-blue-200 text-xl max-w-2xl">We manufacture medical equipment under your brand with your specifications.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our OEM Capabilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We have been providing OEM manufacturing services for medical equipment companies worldwide for over 20 years.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">OEM Process</h3>
                <ol className="space-y-4">
                  {['Submit your requirements and specifications', 'Receive samples and prototypes for approval', 'Finalize specifications and pricing', 'Production begins with quality monitoring', 'Final inspection and delivery to your location'].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i+1}</span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">Contact us today to discuss your OEM requirements and get a competitive quote.</p>
                <Link to="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block">Get OEM Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}