'use client';
import { useCart } from './CartContext';
import Header from '../components/Header';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const auth = getAuth(app);

export default function Cart() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} handleLogout={() => auth.signOut()} handleGoogleLogin={() => {}} />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
