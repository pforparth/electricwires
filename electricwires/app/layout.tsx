import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from './cart/CartContext'; // Import CartProvider
import { AuthProvider } from './AuthContext'; // Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electric Wires",
  description: "Your one-stop shop for high-quality electrical wires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
