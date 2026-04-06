import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Shield, MessageCircle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultProducts } from '@/data/products';
import { defaultCategories } from '@/data/categories';
import { siteConfig } from '@/data/siteConfig';
import type { Product, Category } from '@/types';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products] = useLocalStorage<Product[]>('cms_products', defaultProducts);
  const [categories] = useLocalStorage<Category[]>('cms_categories', defaultCategories);

  const product = products.find(p => p.slug === slug);
  if (!product) return <Navigate to="/products" replace />;

  const category = categories.find(c => c.id === product.categoryId);
  const waMessage = encodeURIComponent(`Hello, I am interested in ${product.name}. Please share pricing and availability.`);
  const waUrl = `https://wa.me/${siteConfig.whatsapp_number}?text=${waMessage}`;

  return (
    <div className="pt-16">
      <section className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/products" className="flex items-center gap-1 hover:text-blue-700">
              <ArrowLeft size={14} /> Products
            </Link>
            <span>/</span>
            {category && <span>{category.name}</span>}
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center mb-4">
              <Shield size={80} className="text-gray-300" />
            </div>
          </div>

          <div>
            {category && (
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {category.name}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {product.moq && (
              <div className="bg-blue-50 rounded-lg p-3 mb-6">
                <span className="text-sm font-medium text-blue-700">Minimum Order: {product.moq}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to="/contact" className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-blue-800 transition-colors">
                Request a Quote
              </Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3 font-medium text-gray-700 text-sm w-1/3">{key}</td>
                      <td className="px-6 py-3 text-gray-600 text-sm">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
