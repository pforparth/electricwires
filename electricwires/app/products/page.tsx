"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../firebaseConfig";
import Header from "../../app/components/Header";
import ProductCard from "../../app/components/ProductCard";
import { products } from "../../app/products/data";

const auth = getAuth(app);
const db = getFirestore(app);

export default function ProductsPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header 
        user={user} 
        handleLogout={handleLogout} 
        handleGoogleLogin={handleGoogleLogin} 
      />
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
