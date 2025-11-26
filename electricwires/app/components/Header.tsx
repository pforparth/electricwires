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
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center w-full">
      <div className="text-2xl font-bold">
        <Link href="/">Electric Wires</Link>
      </div>
      <nav className="flex items-center space-x-6">
        <Link href="/cart">
            <div className="flex items-center space-x-2 relative">
                {/* Cart Icon */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="text-lg">Cart</span>
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </div>
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Hello, {user.displayName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
