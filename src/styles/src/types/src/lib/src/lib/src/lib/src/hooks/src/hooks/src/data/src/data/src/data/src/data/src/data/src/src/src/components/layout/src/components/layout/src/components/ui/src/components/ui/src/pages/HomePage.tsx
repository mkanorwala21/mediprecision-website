import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Globe, Truck, CheckCircle } from 'lucide-react';
import { siteContent } from '@/data/content';
import { defaultProducts } from '@/data/products';
import { defaultCategories } from '@/data/categories';

export default function HomePage() {
  const { home } = siteContent;
  const featuredProducts = defaultProducts.slice(0, 4);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-blue-700/50 rounded-full px-4 py-2 mb-6">
            <Shield size={16} className="mr-2" />
            <span className="text-sm">ISO 13485:2016 Certified Manufacturer</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            {home.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {home.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors">
              {home.hero.cta_primary} <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-md font-semibold border border-white/30 transition-colors">
              {home.hero.cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {home.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 text-lg mb-8">{home.about_snippet}</p>
            <Link to="/about" className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 gap-2">
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Product Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {defaultCategories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all text-center group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100">
                  <Shield size={20} className="text-blue-700" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 gap-2 transition-colors">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-100 h-40 flex items-center justify-center">
                  <Shield size={48} className="text-gray-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{product.shortDescription}</p>
                  <span className="inline-flex items-center text-blue-700 text-sm font-medium gap-1">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Why Choose MediPrecision?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'ISO 13485 Certified', desc: 'Internationally recognized quality management system' },
              { icon: Globe, title: '125+ Countries', desc: 'Trusted exporter to hospitals worldwide' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Reliable global logistics and shipping' },
              { icon: CheckCircle, title: 'Custom OEM', desc: 'Private label & OEM solutions available' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-blue-700" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-teal-100 mb-8 text-lg">Get custom pricing, samples, and regulatory support for your market.</p>
          <Link to="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold inline-flex items-center gap-2 transition-colors">
            Request a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
