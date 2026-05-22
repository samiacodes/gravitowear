"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ArrowUpRight, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItem {
  _id?: string;
  id?: string;
  name: string;
  price: string | number;
  imageUrl: string;
  category: string;
  quantity: number;
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal, isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Collections", href: "/#collections" },
    { name: "Lab", href: "/#lab" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-brand-deepSpace/65 backdrop-blur-md border-b border-white/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-brand-cyan group-hover:text-glow transition-all duration-300">
              GRAVITO<span className="text-brand-purple">WEAR</span>
            </span>
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-float-fast shadow-[0_0_10px_#06b6d4]" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative p-2 text-slate-300 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-purple text-[10px] font-bold rounded-full flex items-center justify-center text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button className="hidden md:flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider text-white border border-white/10 rounded-full glass-panel-interactive hover:border-brand-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              LAUNCH LAB <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-t border-white/10 py-6 px-6 flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white border border-white/10 rounded-full glass-panel-interactive">
              LAUNCH LAB <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </nav>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeCart}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md h-full bg-brand-deepSpace/95 backdrop-blur-xl border-l border-white/10 shadow-[0_0_50px_rgba(6,180,212,0.15)] flex flex-col z-10 transition-transform duration-300">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-cyan" />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                  Your Gravity Cart
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 animate-float text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Cart is Weightless</h3>
                  <p className="text-sm text-slate-400 max-w-xs">
                    Add gravity-defying apparel to stabilize your orbit.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 text-xs font-semibold tracking-wider text-white bg-brand-cyan hover:bg-brand-cyan/80 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,180,212,0.3)] hover:shadow-[0_0_25px_rgba(6,180,212,0.5)]"
                  >
                    EXPLORE SHOP
                  </Link>
                </div>
              ) : (
                cartItems.map((item: CartItem) => {
                  const itemId = item._id || item.id;
                  const priceStr = String(item.price || "0");
                  const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
                  return (
                    <div
                      key={itemId}
                      className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-brand-deepSpace border border-white/10 rounded-lg overflow-hidden flex items-center justify-center relative group">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-2 transform group-hover:scale-110 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-white line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-xs text-slate-400 capitalize">{item.category}</span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-black/40 border border-white/10 rounded-full py-1 px-2.5 gap-3">
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity - 1)}
                              className="text-slate-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-semibold text-white min-w-[12px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              className="text-slate-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="p-1.5 text-slate-400 hover:text-brand-purple rounded-full hover:bg-white/5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex flex-col justify-between items-end">
                        <span className="text-sm font-bold text-brand-cyan">
                          ${(priceNum * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ${priceNum.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Mass (Items)</span>
                  <span className="text-white font-medium">{cartCount} items</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-base text-slate-300 font-semibold">Total Price</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple shadow-glow">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button className="w-full py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full transition-all duration-300 hover:brightness-110 shadow-[0_0_20px_rgba(6,180,212,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5 active:translate-y-0">
                  Secure Checkout
                </button>
                <p className="text-[10px] text-center text-slate-500">
                  Taxes and anti-gravitational shipping calculated at checkout.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
