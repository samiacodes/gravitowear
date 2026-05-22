"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Shield, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import axiosClient from "@/api/axiosClient";

export default function LoginPage() {
  const router = useRouter();
  
  // Tabs: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState("login");
  
  // Form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    document.title = activeTab === "login" 
      ? "GravitoWear | Access Capsule Storage" 
      : "GravitoWear | Initialize Pilot Profile";
  }, [activeTab]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (activeTab === "login") {
        if (!email || !password) {
          throw new Error("Please fill in all security fields.");
        }
        
        await axiosClient.post("/auth/login", { email, password });
        
        setSuccess("Quantum signature verified! Access granted.");
        // Redirect to dashboard after a short delay for transition
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1200);

      } else {
        if (!name || !email || !password) {
          throw new Error("Please complete the initialization fields.");
        }
        if (password.length < 6) {
          throw new Error("Security phrase must be at least 6 characters.");
        }

        await axiosClient.post("/auth/signup", { name, email, password });
        
        setSuccess("Profile initialized successfully! Syncing connection...");
        // Auto-login or toggle tab to login after signup
        setTimeout(() => {
          setActiveTab("login");
          setSuccess(null);
          // Pre-fill email
          setPassword("");
        }, 2000);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Connection interrupted. Please align parameters and retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleGooglePlaceholder = () => {
    setError("Social Sync module offline. Google OAuth currently in simulation mode.");
    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 flex items-center justify-center pt-24 pb-16 px-6 overflow-x-hidden">
      {/* Background Starry Overlay & Nebulas */}
      <div className="absolute inset-0 stars-overlay pointer-events-none z-0" />
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-purple/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-[0_20px_50px_rgba(139,92,246,0.15)] animate-levitate">
        
        {/* Brand/System Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center mx-auto mb-3 animate-float-fast">
            <Shield className="w-6 h-6 text-brand-cyan" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-brand-cyan uppercase">
            GRAVITOWEAR SECURITY GATEWAY
          </span>
          <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">
            {activeTab === "login" ? "ACCESS CAPSULE" : "INITIALIZE PILOT"}
          </h2>
        </div>

        {/* Custom Tabs Slider */}
        <div className="grid grid-cols-2 bg-black/45 border border-white/5 rounded-full p-1 mb-8">
          <button
            onClick={() => {
              setActiveTab("login");
              setError(null);
              setSuccess(null);
            }}
            className={`py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              activeTab === "login"
                ? "bg-brand-purple text-white shadow-[0_2px_10px_rgba(139,92,246,0.3)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Access Gate
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setError(null);
              setSuccess(null);
            }}
            className={`py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              activeTab === "signup"
                ? "bg-brand-purple text-white shadow-[0_2px_10px_rgba(139,92,246,0.3)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Initialize Profile
          </button>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-brand-pink/10 border border-brand-pink/20 flex gap-3 items-center text-xs font-semibold text-brand-pink animate-float">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex gap-3 items-center text-xs font-semibold text-emerald-400 animate-pulse">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleAuth} className="space-y-5">
          {activeTab === "signup" && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Pilot Call Sign / Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 outline-none rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-all duration-300"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
            <input
              type="email"
              placeholder="Secure Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 outline-none rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
            <input
              type="password"
              placeholder="Security Keyphrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 outline-none rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-all duration-300"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-bold tracking-wider text-white bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none shadow-[0_5px_15px_rgba(6,182,212,0.2)]"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : activeTab === "login" ? (
              <>
                INITIALIZE CAPSULE ACCESS <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                REGISTER PILOT CODES <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Separator Divider */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-y-1/2 left-0 right-0 border-t border-white/5" />
          <span className="relative z-10 px-4 bg-brand-deepSpace/80 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
            OR TETHER SECURE AUTH
          </span>
        </div>

        {/* Social Logins Placeholder */}
        <button
          onClick={handleGooglePlaceholder}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-wider text-slate-300 hover:text-white transition-all duration-300 active:scale-95"
        >
          {/* Custom Google SVG Icon */}
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          SYNC WITH GOOGLE LINK
        </button>

        <p className="text-[10px] text-center text-slate-500 font-medium tracking-wide mt-6 leading-relaxed">
          Accessing this portal confirms adherence to the Gravito Electromagnetic Network protocols. Encrypted end-to-end via quantum telemetry.
        </p>

      </div>
    </div>
  );
}
