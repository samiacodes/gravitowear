import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

const INITIAL_PRODUCTS = [
  {
    name: "HoloGlow Puffer Jacket",
    price: 280.00,
    imageUrl: "/images/puffer_jacket.png",
    category: "outerwear",
    description: "Experience the next evolution of luxury streetwear. Fusing zero-mass materials with glassmorphism design, electromagnetic thread cushions, and float-tech details. Perfect for sub-zero orbits and light-speed commutes.",
    inStock: true
  },
  {
    name: "Levitation Cyber Sneakers",
    price: 195.00,
    imageUrl: "/images/cyber_sneakers.png",
    category: "footwear",
    description: "Engineered with active electromagnetic levitation cushions and high-traction electro-soles. Levitate in comfort and style. Ideal for navigating zero-gravity environments.",
    inStock: true
  },
  {
    name: "AeroMesh Pack",
    price: 140.00,
    imageUrl: "/images/backpack.png",
    category: "accessories",
    description: "An ultralight aerodynamic pack featuring smart magnetic buckles and weather-resistant compression shields. Perfectly distributed mass makes it feel weightless on your back.",
    inStock: true
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    let products = await Product.find({});
    
    // Auto-seed if empty
    if (products.length === 0) {
      await Product.insertMany(INITIAL_PRODUCTS);
      products = await Product.find({});
    }
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
