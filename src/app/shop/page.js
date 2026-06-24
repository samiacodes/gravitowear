"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Feather, ArrowUpDown, CornerDownRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import axiosClient from "@/api/axiosClient";

const SkeletonCard = () => (
  <div className="glass-panel rounded-3xl p-5 flex flex-col justify-between h-[420px] animate-pulse border border-white/5">
    <div className="flex justify-between items-center">
      <div className="w-16 h-4 bg-white/10 rounded-full" />
      <div className="w-12 h-4 bg-white/10 rounded-full" />
    </div>
    <div className="relative w-full h-48 flex items-center justify-center">
      <div className="w-32 h-32 bg-white/10 rounded-full" />
    </div>
    <div className="space-y-3">
      <div className="w-3/4 h-5 bg-white/10 rounded" />
      <div className="w-1/4 h-6 bg-white/10 rounded mt-1" />
      <div className="w-full h-11 bg-white/10 rounded-full mt-4" />
    </div>
  </div>
);

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  
  const { addToCart } = useCart();

  useEffect(() => {
    document.title = "GravitoWear | Shop Weightless Luxury";
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to connect to the Gravito grid. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter & Sort Logic
  const categories = ["all", "outerwear", "footwear", "accessories"];
  
  const filteredProducts = products
    .filter((product) => {
      const matchCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      return 0; // default order
    });

  return (
    <div className="relative w-full min-h-screen bg-brand-deepSpace text-slate-100 pt-28 pb-20 px-6 overflow-x-hidden">
      {/* Background Starry Overlay & Nebulas */}
      <div className="absolute inset-0 stars-overlay pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronSeparator />
          <span className="text-brand-cyan">Shop</span>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <span className="text-xs font-black tracking-widest text-brand-purple uppercase">
            Gravito Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 text-white tracking-tight uppercase">
            WEIGHTLESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">GARMENTS</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl text-sm md:text-base">
            Engineered with zero-mass technology. Hover over items to stabilize their orbits and click float to store them in your inventory.
          </p>
        </div>

        {/* Controls Panel (Search, Filter, Sort) */}
        <div className="glass-panel rounded-3xl p-6 mb-10 flex flex-col lg:flex-row gap-6 justify-between items-center border border-white/5">
          {/* Search bar */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-cyan transition-colors" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 outline-none rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 border ${
                  selectedCategory === category
                    ? "bg-brand-purple border-brand-purple text-white shadow-[0_0_8px_rgba(139,92,246,0.25)]"
                    : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="relative w-full lg:w-60 flex items-center gap-2 justify-end">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-black/40 border border-white/10 hover:border-white/20 outline-none rounded-full py-1.5 px-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer w-full lg:w-auto"
            >
              <option value="default">Default Gravity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Loading skeleton state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="glass-panel border border-brand-pink/20 rounded-3xl p-8 text-center max-w-lg mx-auto my-12 animate-float">
            <div className="w-12 h-12 rounded-full bg-brand-pink/15 flex items-center justify-center mx-auto mb-4 text-brand-pink">
              ⚠️
            </div>
            <h3 className="text-white font-bold mb-2">Grid Failure</h3>
            <p className="text-slate-400 text-sm">{error}</p>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-3xl border border-white/5 max-w-lg mx-auto">
                <span className="text-3xl block mb-4 animate-float">🌌</span>
                <h3 className="text-white font-semibold mb-1">No Quantum Signatures Found</h3>
                <p className="text-sm text-slate-400">
                  Try adjusting your search criteria or filters to locate items.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="group relative glass-panel rounded-3xl p-5 flex flex-col justify-between h-[420px] overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-[10px] hover:rotate-[2deg] hover:border-brand-purple/40 hover:shadow-[0_15px_30px_rgba(139,92,246,0.2)] cursor-pointer"
                  >
                    {/* Header Details */}
                    <div className="flex justify-between items-center z-10">
                      <span className="text-[10px] font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/25 uppercase">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1">
                        <Feather className="w-3 h-3 text-brand-cyan" /> 0.00g
                      </span>
                    </div>

                    {/* Floating Zoom Image with Custom Shadow */}
                    <div className="relative w-full h-48 my-4 flex flex-col items-center justify-center">
                      {/* Ambient Shadow underneath image */}
                      <div className="absolute bottom-2 w-24 h-2.5 bg-black/55 rounded-full blur-md group-hover:scale-75 group-hover:opacity-40 transition-all duration-500" />
                      
                      {/* Image Frame */}
                      <div className="relative w-40 h-40 transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-110">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain filter drop-shadow-[0_10px_20px_rgba(6,182,212,0.15)]"
                          sizes="160px"
                        />
                      </div>
                    </div>

                    {/* Product Name, Price, and Buy Now Action */}
                    <div className="mt-auto z-10 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors duration-300 line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="text-2xl font-black text-slate-100 mt-1 block">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-brand-purple text-xs font-bold tracking-wider text-slate-200 hover:text-white transition-all duration-300 transform active:scale-95 hover:shadow-[0_0_8px_rgba(139,92,246,0.25)]"
                      >
                        BUY NOW <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Glowing highlight corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-cyan/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
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
