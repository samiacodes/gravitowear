"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Activity, Shield, Cpu } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background stars overlay */}
      <div className="absolute inset-0 stars-overlay pointer-events-none" />

      {/* Floating Nebula Background Accents */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-purple/20 blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-brand-cyan/15 blur-[120px] animate-float-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-semibold tracking-wider w-fit animate-float-fast">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
            ANTI-GRAVITY SERIES V1.0 IS LIVE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            APPAREL THAT <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-indigo-300 to-brand-cyan text-glow">
              DEFIES GRAVITY
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Engineered with zero-mass aesthetics, our garments hover above the conventional. Experience high-tech streetwear featuring premium materials, floating silhouettes, and glassmorphic micro-details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="#collections"
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider text-white bg-brand-purple rounded-full hover:bg-brand-purple/90 transition-all duration-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transform hover:-translate-y-1"
            >
              EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#lab"
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider text-slate-300 border border-white/10 rounded-full hover:text-white hover:border-slate-500 transition-all duration-300 glass-panel-interactive"
            >
              GRAVITY LAB
            </a>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-purple" /> LIFT INDEX
              </span>
              <span className="text-lg font-bold text-white">9.81 m/s²</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wider text-slate-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-cyan" /> MATERIAL
              </span>
              <span className="text-lg font-bold text-white">AeroGrid™</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wider text-slate-500 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-pink" /> CORE
              </span>
              <span className="text-lg font-bold text-white">Levit-9</span>
            </div>
          </div>
        </div>

        {/* Right Floating Product Visualizer */}
        <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
          {/* Glowing backdrops for the main item */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-purple/10 blur-[80px] animate-pulse-glow" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-brand-cyan/10 blur-[80px] animate-float-delayed" />
          
          {/* Main Floating Puffer Jacket */}
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] animate-float-slow transition-transform hover:scale-[1.03] duration-700">
            <Image
              src="/images/puffer_jacket.png"
              alt="GravitoWear Holographic Floating Jacket"
              fill
              priority
              className="object-contain filter drop-shadow-[0_20px_50px_rgba(139,92,246,0.3)]"
              sizes="(max-w-768px) 300px, 420px"
            />
            {/* Holographic glowing lines / dots surrounding the jacket */}
            <div className="absolute top-10 right-10 w-2.5 h-2.5 rounded-full bg-brand-cyan animate-ping" />
            <div className="absolute bottom-12 left-8 w-2 h-2 rounded-full bg-brand-purple animate-ping [animation-delay:1s]" />
          </div>

          {/* Tiny Floating Accessory Icons or cards around the main item */}
          <div className="absolute top-[10%] left-[5%] glass-panel rounded-2xl p-3 flex items-center gap-3 animate-float-delayed pointer-events-none hover:shadow-glass-glow">
            <span className="text-2xl">✨</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">HoloWear Tech</span>
              <span className="text-xs font-bold text-white">Mass: 0.00g</span>
            </div>
          </div>

          <div className="absolute bottom-[15%] right-[5%] glass-panel rounded-2xl p-3 flex items-center gap-3 animate-float-slow pointer-events-none hover:shadow-glass-glow">
            <span className="text-2xl">⚡</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Levitation Status</span>
              <span className="text-xs font-bold text-brand-cyan">Active 100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
