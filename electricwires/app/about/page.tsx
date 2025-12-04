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

const auth = getAuth(app);
const db = getFirestore(app);

export default function AboutPage() {
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
    <div className="bg-white min-h-screen">
      <Header 
        user={user} 
        handleLogout={handleLogout} 
        handleGoogleLogin={handleGoogleLogin} 
      />
      <main className="p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">About WireCorp</h1>
            <p className="mt-4 text-lg text-gray-600">Your Trusted Partner for High-Quality Electrical Wires</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              At WireCorp, our mission is to provide businesses with the most reliable and efficient electrical wires on the market. We are committed to powering a connected world with products that meet the highest standards of safety, quality, and performance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-center">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
              <ul className="text-gray-700 text-lg space-y-2">
                <li><span className="font-semibold">Quality:</span> We never compromise on the quality of our products.</li>
                <li><span className="font-semibold">Reliability:</span> Our wires are built to last, ensuring long-term performance.</li>
                <li><span className="font-semibold">Customer Focus:</span> We are dedicated to meeting the unique needs of our B2B clients.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our History</h3>
              <p className="text-gray-700 text-lg">
                Founded in 2023, WireCorp has quickly become a leading supplier of electrical wires for businesses across the globe. Our commitment to innovation and excellence has driven our growth, and we continue to expand our offerings to meet the evolving needs of our clients.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
