import Link from 'next/link';
import { User } from 'firebase/auth';
import { useCart } from '../cart/CartContext';

interface HeaderProps {
  user: User | null;
  handleLogout: () => void;
  handleGoogleLogin: () => void;
}

export default function Header({ user, handleLogout, handleGoogleLogin }: HeaderProps) {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white text-black shadow-md p-4 flex justify-between items-center w-full">
      <div className="text-3xl font-bold text-gray-800">
        <Link href="/">WireCorp</Link>
      </div>
      <nav className="flex items-center space-x-8">
        <Link href="/products" className="text-lg hover:text-blue-600 transition-colors">Products</Link>
        <Link href="/about" className="text-lg hover:text-blue-600 transition-colors">About Us</Link>
        <Link href="/cart">
            <div className="flex items-center space-x-2 relative">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </div>
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">Hello, {user.displayName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
