"use client";

import React from "react";
import Image from "next/image";
import { Plus, Feather } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  mass: string;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  price,
  category,
  image,
  mass,
  isNew,
}) => {
  return (
    <div className="group glass-panel-interactive rounded-3xl p-5 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Glow highlight inside card */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-brand-purple/10 blur-[50px] group-hover:bg-brand-purple/20 transition-colors duration-500 pointer-events-none" />

      {/* Badges */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/25 uppercase">
          {category}
        </span>
        <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1">
          <Feather className="w-3 h-3 text-brand-cyan" /> {mass}
        </span>
      </div>

      {/* Floating Image Container */}
      <div className="relative w-full h-56 my-6 flex items-center justify-center overflow-visible">
        {/* Shadow under the product */}
        <div className="absolute bottom-2 w-32 h-3 bg-black/40 rounded-full blur-md group-hover:scale-75 group-hover:opacity-40 transition-all duration-500" />
        
        {/* Floating image that lifts on hover */}
        <div className="relative w-48 h-48 transition-all duration-500 group-hover:-translate-y-6 group-hover:scale-[1.08] filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(139,92,246,0.15)]"
            sizes="192px"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 mt-auto z-10">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors duration-300">
            {name}
          </h3>
          <span className="text-xl font-black text-slate-100 mt-1 block">
            {price}
          </span>
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/5 bg-white/5 hover:bg-brand-purple text-xs font-bold tracking-wider text-slate-200 hover:text-white transition-all duration-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.45)] hover:border-brand-purple">
          FLOAT TO BAG <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {isNew && (
        <span className="absolute top-5 right-5 text-[9px] font-black text-white bg-brand-pink px-2 py-0.5 rounded-md uppercase tracking-wider">
          New
        </span>
      )}
    </div>
  );
};

export default ProductCard;
