'use client';
import { useState, useEffect } from "react";
import { useCart } from "../cart/CartContext";
import Header from "../components/Header";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "../../firebaseConfig";
import { getFirestore, doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zip: '' });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/'); // Redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePlaceOrder = async () => {
    if (!user) return;

    const order = {
      userId: user.uid,
      shippingInfo,
      items: cartItems,
      total: getCartTotal(),
      createdAt: serverTimestamp(),
    };

    try {
      const newOrderRef = doc(collection(db, "orders"));
      await setDoc(newOrderRef, order);
      clearCart();
      router.push('/order-confirmation');
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} handleLogout={() => auth.signOut()} handleGoogleLogin={() => {}} />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 border rounded" onChange={e => setShippingInfo({...shippingInfo, name: e.target.value})} />
              <input type="text" placeholder="Address" className="w-full p-2 mb-4 border rounded" onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} />
              <input type="text" placeholder="City" className="w-full p-2 mb-4 border rounded" onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
              <input type="text" placeholder="ZIP Code" className="w-full p-2 border rounded" onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full transition-colors duration-300">
              Place Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
