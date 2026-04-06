import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <Link to="/" className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800">
          Go Home
        </Link>
      </div>
    </div>
  );
}
