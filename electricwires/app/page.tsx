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
import app from "../firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Home() {
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
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-center">
          Electric wires
        </h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          {user ? (
            <div>
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-center">
                Welcome, {user.displayName}
              </h1>
              <p className="max-w-md text-lg leading-8 text-zinc-600">
                You are logged in with {user.email}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 text-white transition-colors hover:bg-red-700 md:w-[158px]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-center">
                Please log in to continue
              </h1>
              <button
                onClick={handleGoogleLogin}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700 md:w-[200px]"
              >
                Sign in with Google
              </button>
            </div>
          )}
        </div>
        <div></div>
      </main>
    </div>
  );
}