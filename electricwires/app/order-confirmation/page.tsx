'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '../../firebaseConfig';

const auth = getAuth(app);

export default function OrderConfirmation() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        });
        return () => unsubscribe();
    }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header user={user} handleLogout={() => auth.signOut()} handleGoogleLogin={() => {}} />
        <main className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-lg text-gray-700 mb-8">Your order has been placed successfully.</p>
            <Link href="/">
                <p className="text-blue-600 hover:underline">Continue Shopping</p>
            </Link>
        </main>
    </div>
  );
}
