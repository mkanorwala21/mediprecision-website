import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hello, I am interested in your medical equipment products.');
  const url = `https://wa.me/${siteConfig.whatsapp_number}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} fill="white" />
    </a>
  );
}
