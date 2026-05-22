"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Plus, Feather, Orbit, Sliders } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Home() {
  // Gravity simulator state
  const [gravity, setGravity] = useState(4.1);
  const [hoverPower, setHoverPower] = useState(80);
  
  // Static product list
  const products = [
    {
      id: "1",
      name: "HoloGlow Puffer Jacket",
      price: "$280.00",
      category: "Outerwear",
      mass: "0.00g",
      image: "/images/puffer_jacket.png",
      imageUrl: "/images/puffer_jacket.png",
      isNew: true,
    },
    {
      id: "2",
      name: "Levitation Cyber Sneakers",
      price: "$195.00",
      category: "Footwear",
      mass: "0.00g",
      image: "/images/cyber_sneakers.png",
      imageUrl: "/images/cyber_sneakers.png",
      isNew: true,
    },
    {
      id: "3",
      name: "AeroMesh Pack",
      price: "$140.00",
      category: "Accessories",
      mass: "0.00g",
      image: "/images/backpack.png",
      imageUrl: "/images/backpack.png",
      isNew: false,
    },
  ];

  const { addToCart } = useCart();

  const floatHeight = ((9.81 - gravity) / 9.81) * 35; // calculation for interactive lab

  return (
    <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 overflow-x-hidden">
      {/* Background Starry Overlay & Nebula */}
      <div className="absolute inset-0 stars-overlay pointer-events-none z-0" />
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-purple/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-brand-cyan/10 blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Block */}
          <div className="flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-bold tracking-wider w-fit animate-float">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
              ANTI-GRAVITY SUITS ACTIVE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              WEAR THE <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-indigo-300 to-brand-cyan animate-glow font-black">
                WEIGHTLESSNESS
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Experience the evolution of futuristic luxury streetwear. Fusing electromagnetic thread weave cushions, floating silhouettes, and glassmorphic micro-details.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Shop Now Button (Lifts on hover and casts a soft shadow) */}
              <a
                href="#collections"
                className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-wider text-white bg-brand-purple rounded-full hover:bg-brand-purple/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(139,92,246,0.45)]"
              >
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#lab"
                className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-wider text-slate-300 border border-white/10 rounded-full hover:text-white hover:border-slate-500 transition-all duration-300 hover:bg-white/5"
              >
                GRAVITY CONTROLLER
              </a>
            </div>
          </div>

          {/* Right Block (Levitating 3D Jacket Image) */}
          <div className="relative flex items-center justify-center min-h-[400px]">
            {/* Glowing blur effects */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-brand-purple/10 blur-[80px] animate-glow" />
            
            {/* 3D Levitating Image */}
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] animate-levitate transition-transform duration-700 hover:scale-105">
              <Image
                src="/images/puffer_jacket.png"
                alt="Levitating Holographic Puffer Jacket"
                fill
                priority
                className="object-contain filter drop-shadow-[0_25px_50px_rgba(139,92,246,0.3)]"
                sizes="(max-w-768px) 300px, 420px"
              />
              <div className="absolute top-12 right-12 w-2.5 h-2.5 rounded-full bg-brand-cyan animate-ping" />
              <div className="absolute bottom-16 left-12 w-2 h-2 rounded-full bg-brand-purple animate-ping [animation-delay:1.5s]" />
            </div>

            {/* Float Info Card */}
            <div className="absolute top-[10%] left-[8%] glass-panel rounded-2xl p-3 flex items-center gap-3 animate-float pointer-events-none">
              <span className="text-xl">✨</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AltiShield</span>
                <span className="text-xs font-bold text-white">Mass: 0.00g</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Card Grid (with tilt effect on hover) */}
      <section id="collections" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-brand-purple uppercase">
              Zero Gravity Catalog
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
              THE LEVITATING COLLECTION
            </h2>
            <p className="text-slate-400 mt-4">
              Click float to load weightless garments straight into your capsule storage block.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative glass-panel rounded-3xl p-5 flex flex-col justify-between h-full overflow-hidden transition-all duration-300 hover:-translate-y-[10px] hover:rotate-[2deg] hover:border-brand-purple/30 hover:shadow-[0_15px_30px_rgba(139,92,246,0.15)] cursor-pointer"
              >
                {/* Badges */}
                <div className="flex justify-between items-center z-10">
                  <span className="text-[10px] font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/25 uppercase">
                    {product.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1">
                    <Feather className="w-3 h-3 text-brand-cyan" /> {product.mass}
                  </span>
                </div>

                {/* Floating Image */}
                <div className="relative w-full h-52 my-6 flex items-center justify-center">
                  <div className="absolute bottom-0 w-28 h-2 bg-black/40 rounded-full blur-md group-hover:scale-75 group-hover:opacity-30 transition-all duration-300" />
                  <div className="relative w-44 h-44 transition-all duration-500 group-hover:-translate-y-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="176px"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4 mt-auto z-10">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xl font-black text-slate-100 mt-1 block">
                      {product.price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/5 bg-white/5 hover:bg-brand-purple text-xs font-bold tracking-wider text-slate-200 hover:text-white transition-all duration-300 transform active:scale-95"
                  >
                    FLOAT TO BAG <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {product.isNew && (
                  <span className="absolute top-5 right-5 text-[9px] font-black text-white bg-brand-pink px-2 py-0.5 rounded-md uppercase tracking-wider">
                    New
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gravity Simulator (Interactive Control Dashboard) */}
      <section id="lab" className="py-24 relative z-10 border-t border-white/5 bg-brand-deepSpace/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-brand-cyan uppercase">
              Gravity Lab
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
              COSMIC TETHER BOARD
            </h2>
            <p className="text-slate-400 mt-4">
              Alter the parameters of the local electromagnetic grid. Drag sliders to watch our puffer shell ascend.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Block */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-6 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <Sliders className="w-5 h-5 text-brand-cyan" />
                  <h3 className="text-base font-bold text-white tracking-widest">
                    EM-STATION SETTINGS
                  </h3>
                </div>

                {/* Slider 1: Gravity */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-400">Simulated Gravity</span>
                    <span className="text-brand-cyan font-bold">
                      {gravity.toFixed(2)} m/s²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="9.81"
                    step="0.05"
                    value={gravity}
                    onChange={(e) => setGravity(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                  />
                </div>

                {/* Slider 2: Power */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-400">Repulsor Engine Intensity</span>
                    <span className="text-brand-purple font-bold">{hoverPower}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="1"
                    value={hoverPower}
                    onChange={(e) => setHoverPower(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">COEFFICIENT OF LIFT:</span>
                <span className="text-brand-pink font-bold">
                  {((9.81 - gravity) * (hoverPower / 100) * 1.5).toFixed(2)} Φ
                </span>
              </div>
            </div>

            {/* Visualizer Block */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 flex flex-col justify-between min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none" />

              <div className="flex justify-between items-center relative z-10">
                <span className="text-xs font-bold text-slate-400 tracking-widest flex items-center gap-2">
                  <Orbit className="w-5 h-5 text-brand-purple" /> ACTIVE TELEMETRY
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-bold">
                  GRID SECURE
                </div>
              </div>

              {/* Dynamic Levitating Item */}
              <div className="my-auto flex flex-col items-center justify-center relative min-h-[220px]">
                <div
                  className="absolute w-44 h-10 rounded-full border border-dashed border-brand-cyan/30 pointer-events-none opacity-40"
                  style={{
                    transform: `translateY(${floatHeight + 20}px) rotateX(75deg)`,
                  }}
                />

                <div
                  className="relative w-44 h-44 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(${-floatHeight}px) scale(${1 + floatHeight / 300})`,
                  }}
                >
                  <Image
                    src="/images/puffer_jacket.png"
                    alt="Simulator Jacket"
                    fill
                    className="object-contain"
                  />
                </div>

                <div
                  className="w-24 h-2 bg-black/60 rounded-full blur-sm transition-all duration-700 pointer-events-none"
                  style={{
                    transform: `scale(${Math.max(0.3, 1 - floatHeight / 50)})`,
                    opacity: Math.max(0.1, 1 - floatHeight / 40),
                  }}
                />
              </div>

              {/* Grid Footer Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 z-10 relative pt-4 border-t border-white/5 text-[10px] font-bold text-slate-400 tracking-wider">
                <div className="flex flex-col gap-0.5">
                  <span>ALTITUDE DETECTED</span>
                  <span className="text-xs font-black text-white">
                    {(floatHeight / 10).toFixed(2)} m
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span>AIR DRAG</span>
                  <span className="text-xs font-black text-white">
                    {(gravity * 0.08).toFixed(3)} N
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span>STABILITY STATUS</span>
                  <span className="text-xs font-black text-brand-cyan">99.8% ACC</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span>POWER FEED</span>
                  <span className="text-xs font-black text-white">
                    {(hoverPower * 0.12).toFixed(1)} kW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
