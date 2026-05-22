"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Feather, ShieldCheck, Zap, RefreshCw, Plus, Minus, CornerDownRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import axiosClient from "@/api/axiosClient";

export default function ProductDetailPage({ params }) {
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, updateQuantity, cartItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/products/${id}`);
        setProduct(response.data);
        document.title = `GravitoWear | ${response.data.name}`;
        setError(null);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Quantum signature not found in Gravito Wear matrix.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    // Add product then update quantity if the user selected more than 1
    addToCart(product);
    if (quantity > 1) {
      const itemId = product._id || product.id;
      // Get current quantity in cart after add (which will be originalCartQty + 1)
      const existingItem = cartItems.find((item) => (item._id || item.id) === itemId);
      const currentQty = existingItem ? existingItem.quantity : 0;
      updateQuantity(itemId, Math.max(quantity, currentQty));
    }
  };

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center items-center h-[400px] glass-panel rounded-3xl animate-pulse">
            <div className="w-56 h-56 bg-white/5 rounded-full" />
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="w-24 h-6 bg-white/10 rounded-full" />
            <div className="w-3/4 h-12 bg-white/10 rounded" />
            <div className="w-1/3 h-8 bg-white/10 rounded" />
            <div className="w-full h-24 bg-white/10 rounded" />
            <div className="w-1/2 h-10 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 flex flex-col justify-center items-center px-6">
        <div className="glass-panel border border-brand-pink/20 rounded-3xl p-8 text-center max-w-lg animate-float">
          <span className="text-4xl block mb-4">🛸</span>
          <h3 className="text-white text-lg font-bold mb-2">Item Out of Orbit</h3>
          <p className="text-slate-400 text-sm mb-6">{error}</p>
          <Link
            href="/shop"
            className="px-6 py-2.5 text-xs font-semibold tracking-wider text-white bg-brand-cyan hover:bg-brand-cyan/85 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,180,212,0.3)]"
          >
            RETURN TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  // Specifications mock based on item category
  const getSpecs = (category) => {
    switch (category?.toLowerCase()) {
      case "outerwear":
        return [
          { label: "Shield Rating", value: "AltiShield 9.0" },
          { label: "Material Composition", value: "0.00g Electromagnetic Weave" },
          { label: "Thermal Buffer", value: "Sub-zero stabilized (-40°C)" },
          { label: "Tether Harness", value: "Integrated chest ring system" },
        ];
      case "footwear":
        return [
          { label: "Thruster Matrix", value: "Dual Electromagnetic Cushion" },
          { label: "Sensing Rate", value: "1000hz Altitude Adjustment" },
          { label: "Sole Material", value: "Superconductive Cyber-foam" },
          { label: "Tether Harness", value: "Smart magnetic ankle locks" },
        ];
      default:
        return [
          { label: "Capacity Rating", value: "Mass-canceling 40L" },
          { label: "Shell Structure", value: "Aerodynamic Micro-mesh" },
          { label: "Compression", value: "Pneumatic Auto-balancing" },
          { label: "Tether Harness", value: "Double-tether magnetic buckles" },
        ];
    }
  };

  const specs = getSpecs(product?.category);

  return (
    <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 pt-28 pb-20 px-6 overflow-x-hidden">
      {/* Background Starry Overlay & Nebulas */}
      <div className="absolute inset-0 stars-overlay pointer-events-none z-0" />
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation & Back Button */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            BACK TO CATALOG
          </Link>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronSeparator />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronSeparator />
            <span className="text-brand-cyan truncate max-w-[120px]">{product?.name}</span>
          </div>
        </div>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Levitating Image Frame */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center glass-panel rounded-3xl p-8 border border-white/5 relative min-h-[480px]">
            {/* Background Orb Glow */}
            <div className="absolute w-[250px] h-[250px] rounded-full bg-brand-cyan/15 blur-[60px] animate-glow pointer-events-none" />
            
            {/* Image Container with Animation */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 animate-levitate transition-transform duration-700 hover:scale-105">
              <Image
                src={product?.imageUrl}
                alt={product?.name}
                fill
                priority
                className="object-contain filter drop-shadow-[0_20px_40px_rgba(6,182,212,0.25)]"
                sizes="(max-w-768px) 280px, 320px"
              />
            </div>

            {/* Simulated shadow under the float item */}
            <div className="w-36 h-2 bg-black/45 rounded-full blur-md animate-pulse mt-8" />
            
            {/* Atmospheric Altitude Gauge */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>ORBIT ALTITUDE: 15.4cm</span>
              <span>GRID LOCK: 98%</span>
            </div>
          </div>

          {/* Right Block: Content Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Product Category and Availability Badges */}
            <div className="flex gap-3 items-center">
              <span className="text-xs font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1.5 rounded-full border border-brand-cyan/25 uppercase">
                {product?.category}
              </span>
              <span className="text-xs font-semibold tracking-wider text-slate-400 flex items-center gap-1">
                <Feather className="w-3.5 h-3.5 text-brand-cyan" /> 0.00g (Massless)
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                {product?.name}
              </h1>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple mt-2 block shadow-glow">
                ${product?.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-sm md:text-base bg-white/5 border border-white/5 rounded-2xl p-5">
              {product?.description}
            </p>

            {/* Specifications list (Cosmic Specs) */}
            <div>
              <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3">
                Cosmic Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider mb-1">
                      {spec.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart button */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 items-stretch sm:items-center">
              {/* Quantity Controls */}
              <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-full py-3.5 px-5 gap-6 sm:w-fit">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Qty</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-white min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-grow flex items-center justify-center gap-2.5 py-4 text-sm font-bold tracking-wider text-white bg-brand-purple rounded-full hover:bg-brand-purple/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(139,92,246,0.4)]"
              >
                TETHER TO CAPSULE <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-6 border-t border-white/5 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-brand-cyan mb-1" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Secure Lock</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-5 h-5 text-brand-cyan mb-1" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Grid Sync</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-5 h-5 text-brand-cyan mb-1" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Free Alignment</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Inline Sub-components
const ChevronSeparator = () => (
  <span className="text-[10px] text-slate-600">
    <CornerDownRight className="w-3 h-3 inline rotate-[-90deg] translate-y-[-1px]" />
  </span>
);
