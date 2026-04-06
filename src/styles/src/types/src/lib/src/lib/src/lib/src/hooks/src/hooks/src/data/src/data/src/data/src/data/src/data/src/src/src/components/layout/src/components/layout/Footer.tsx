import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Youtube } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { navigation } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <span className="font-bold text-white text-lg">{siteConfig.name}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{siteConfig.tagline}</p>
            <div className="flex space-x-3">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={18} />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products?category=infusion-therapy" className="hover:text-white">Infusion Therapy</Link></li>
              <li><Link to="/products?category=surgical-instruments" className="hover:text-white">Surgical Instruments</Link></li>
              <li><Link to="/products?category=diagnostics" className="hover:text-white">Diagnostics</Link></li>
              <li><Link to="/products?category=wound-care" className="hover:text-white">Wound Care</Link></li>
              <li><Link to="/products?category=urology" className="hover:text-white">Urology</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{siteConfig.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <a href={`tel:${siteConfig.phone}`} className="text-gray-400 hover:text-white text-sm">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white text-sm">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-gray-500 text-sm">ISO 13485 Certified | Made in India</p>
        </div>
      </div>
    </footer>
  );
}
