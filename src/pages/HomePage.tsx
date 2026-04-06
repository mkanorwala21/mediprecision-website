import { Link } from 'react-router-dom'
import { siteConfig } from '@/lib/siteConfig'
import { ArrowRight, Shield, Award, Globe, Microscope } from 'lucide-react'

const features = [
  { icon: Shield, title: 'ISO 13485 Certified', desc: 'Meeting international quality standards for medical devices' },
  { icon: Award, title: 'CE & FDA Approved', desc: 'Products meet stringent regulatory requirements worldwide' },
  { icon: Globe, title: 'Global Export', desc: 'Exporting to 50+ countries across 6 continents' },
  { icon: Microscope, title: 'Precision Manufacturing', desc: 'State-of-the-art facilities with quality control at every step' },
]

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '5000+', label: 'Products' },
  { value: '50+', label: 'Countries' },
  { value: '10000+', label: 'Happy Clients' },
]

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {siteConfig.tagline}
            </h1>
            <p className="text-xl text-blue-100 mb-8">{siteConfig.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                View Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-blue-100 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MediPrecision?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We combine decades of manufacturing expertise with the latest technology to deliver superior medical equipment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">Contact our team today for custom OEM solutions or product inquiries.</p>
          <Link to="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}