import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Shield } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultProducts } from '@/data/products';
import { defaultCategories } from '@/data/categories';
import type { Product, Category } from '@/types';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const categoryFilter = searchParams.get('category') || '';

  const [storedProducts] = useLocalStorage<Product[]>('cms_products', defaultProducts);
  const [storedCategories] = useLocalStorage<Category[]>('cms_categories', defaultCategories);

  const filtered = useMemo(() => {
    return storedProducts.filter(p => {
      if (!p.isActive) return false;
      if (categoryFilter) {
        const cat = storedCategories.find(c => c.slug === categoryFilter);
        if (cat && p.categoryId !== cat.id) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [storedProducts, storedCategories, categoryFilter, search]);

  return (
    <div className="pt-16">
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Products</h1>
          <p className="text-blue-200">500+ medical devices & disposables for global healthcare</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-4 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setSearchParams({})}
                    className={`w-full text-left text-sm px-3 py-2 rounded-md ${
                      !categoryFilter ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {storedCategories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSearchParams({ category: cat.slug })}
                      className={`w-full text-left text-sm px-3 py-2 rounded-md ${
                        categoryFilter === cat.slug ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">{filtered.length} products found</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-gray-100 h-36 flex items-center justify-center">
                    <Shield size={40} className="text-gray-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                    {product.moq && <p className="text-xs text-gray-400">MOQ: {product.moq}</p>}
                    <span className="inline-flex items-center text-blue-700 text-sm font-medium gap-1 mt-2">
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Shield size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No products found. Try a different search or category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
