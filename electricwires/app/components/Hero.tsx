import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Premium Wires for a Connected World
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for high-quality electrical wires. We provide reliable solutions for all your B2B needs, ensuring safety and performance.
          </p>
          <div className="mt-8">
            <Link href="/products" legacyBehavior>
              <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md text-lg transition-transform transform hover:scale-105">
                Explore Our Products
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
