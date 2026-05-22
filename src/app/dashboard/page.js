"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Calendar, ShieldCheck, LogOut, Package, Orbit, Feather, ArrowUpRight, ArrowLeft } from "lucide-react";
import axiosClient from "@/api/axiosClient";

const MOCK_ORDERS = [
  {
    id: "GRV-84920194",
    date: "2026-05-18",
    items: [
      { name: "HoloGlow Puffer Jacket", quantity: 1, price: 280.00 }
    ],
    status: "Stabilized",
    coordinates: "L4-ORBIT-2A",
    total: 280.00
  },
  {
    id: "GRV-73910482",
    date: "2026-04-12",
    items: [
      { name: "Levitation Cyber Sneakers", quantity: 1, price: 195.00 },
      { name: "AeroMesh Pack", quantity: 2, price: 140.00 }
    ],
    status: "Delivered",
    coordinates: "DEEP-FIELD-9",
    total: 475.00
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    document.title = "GravitoWear | Pilot Dashboard";

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Call the protected route we verified
        const response = await axiosClient.get("/protected/user");
        setUserData(response.data.user);
        setError(null);
      } catch (err) {
        console.error("Failed to load user profile:", err);
        setError("Telemetry signal lost. Unregistered signature.");
        // Redirect to login if user fetch fails (invalid token, etc)
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await axiosClient.post("/auth/logout");
      // Redirect to login after successful logout
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Failed to logout:", err);
      // Fallback redirect
      router.push("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  // Format Date safely
  const formatJoinDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state skeleton
  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-44 bg-white/5 rounded-3xl border border-white/5" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 h-80 bg-white/5 rounded-3xl border border-white/5" />
            <div className="lg:col-span-2 h-[450px] bg-white/5 rounded-3xl border border-white/5" />
          </div>
        </div>
      </div>
    );
  }

  // Error Redirecting State
  if (error) {
    return (
      <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 flex flex-col justify-center items-center px-6">
        <div className="glass-panel border border-brand-pink/20 rounded-3xl p-8 text-center max-w-lg animate-float">
          <span className="text-4xl block mb-4">🚨</span>
          <h3 className="text-white text-lg font-bold mb-2">Unauthorized Orbit</h3>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <p className="text-[10px] text-slate-500">Redirecting to security gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 pt-28 pb-20 px-6 overflow-x-hidden">
      {/* Background Starry Overlay & Nebulas */}
      <div className="absolute inset-0 stars-overlay pointer-events-none z-0" />
      <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation & Logout header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            BACK TO CATALOG
          </Link>
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-pink/20 bg-brand-pink/5 hover:bg-brand-pink text-xs font-bold tracking-wider text-brand-pink hover:text-white transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loggingOut ? (
              <span className="w-3.5 h-3.5 rounded-full border border-white/30 border-t-white animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            DISCONNECT PILOT LINK
          </button>
        </div>

        {/* Floating Welcome Header Panel */}
        <div className="relative glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 to-brand-cyan/5 pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-cyan text-3xl font-black shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "P"}
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-brand-cyan uppercase">Active Connection</span>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Welcome back, {userData?.name}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
              <span className="capitalize">{userData?.role} Profile</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
              <Calendar className="w-4 h-4 text-brand-purple" />
              <span>Joined: {formatJoinDate(userData?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Profile Settings Block */}
          <div className="lg:col-span-1 glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <User className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                TELEMETRY PARAMETERS
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Pilot Identification</span>
                <span className="text-sm font-bold text-slate-200">{userData?.name}</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Comms Vector</span>
                <span className="text-sm font-bold text-slate-200 flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                  {userData?.email}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">System Status</span>
                <span className="text-xs font-bold text-brand-cyan flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
                  CONNECTED TO ORBIT NODE
                </span>
              </div>
            </div>
          </div>

          {/* Order History Block */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-purple" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  CAPSULE STORAGE LOCKS (Order History)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-bold bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                {MOCK_ORDERS.length} LOGS
              </span>
            </div>

            {MOCK_ORDERS.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <Orbit className="w-12 h-12 text-slate-500 mx-auto animate-float" />
                <h4 className="text-white font-semibold">Capsule Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  You have not registered any weightless apparel shipments yet.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-brand-purple hover:bg-brand-purple/95 text-xs font-bold text-white tracking-wider uppercase transition-all duration-300"
                >
                  ACQUIRE APPAREL <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-purple/20 transition-all duration-300 space-y-4"
                  >
                    {/* Header info */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-3 border-b border-white/5">
                      <div>
                        <span className="text-[10px] font-black text-brand-cyan tracking-widest block uppercase">
                          SHIPMENT ID
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-200">{order.id}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-[10px] font-bold text-slate-400">
                        <div>
                          <span>SHIPPED ON</span>
                          <span className="text-xs font-semibold text-slate-200 block mt-0.5">{order.date}</span>
                        </div>
                        <div>
                          <span>DESTINATION GRID</span>
                          <span className="text-xs font-mono font-semibold text-slate-200 block mt-0.5">{order.coordinates}</span>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <span>ORBIT STATUS</span>
                          <span className="text-xs font-semibold text-brand-cyan flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-white/5 border border-white/5 flex items-center justify-center font-bold text-slate-300">
                              {item.quantity}x
                            </span>
                            <span className="font-semibold text-slate-200">{item.name}</span>
                          </div>
                          <span className="font-bold text-slate-300">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer summary */}
                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1">
                        <Feather className="w-3.5 h-3.5 text-brand-cyan" /> MASSLESS FREIGHT SYNCED
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Total Paid</span>
                        <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
