import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "GravitoWear | Anti-Gravity Luxury Fashion",
  description: "Experience the next evolution of luxury streetwear. GravitoWear fuses zero-mass materials with glassmorphism design and float-tech details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} font-sans antialiased bg-brand-deepSpace text-slate-100 min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </CartProvider>
        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-brand-deepSpace/40 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-sm text-slate-500">
              © {new Date().getFullYear()} GRAVITOWEAR. Engineered with Zero Gravity.
            </span>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#lab" className="hover:text-white transition-colors">Gravity Lab API</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
