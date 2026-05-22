const mongoose = require("mongoose");

// Redefine Schema locally to bypass ESM/CommonJS model loading problems in standalone Node execution
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const PRODUCTS = [
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
  },
  {
    name: "Quantum Float Vest",
    price: 310.00,
    imageUrl: "/images/puffer_jacket.png", // fallback placeholder sharing jacket asset
    category: "outerwear",
    description: "A mid-layer float shell optimized for high stability under heavy gravity loads. Embedded with core micro-thrusters and adaptive thermal insulators.",
    inStock: true
  },
  {
    name: "Gravity Boots V2",
    price: 240.00,
    imageUrl: "/images/cyber_sneakers.png", // fallback placeholder sharing sneakers asset
    category: "footwear",
    description: "Equipped with hyper-conductive shock buffers and lock-in magnetic tethers. Calibrated for standard moon walks and low-orbit urban exploration.",
    inStock: true
  },
  {
    name: "Ion Harness Belt",
    price: 85.00,
    imageUrl: "/images/backpack.png", // fallback placeholder sharing pack asset
    category: "accessories",
    description: "A lightweight structural utility belt with quick-release ion clamps. Features double tether rings to anchor lightweight items securely inside cabin compartments.",
    inStock: true
  }
];

async function seedDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined. Please add it to your environment variables.");
    process.exit(1);
  }

  try {
    console.log("Connecting to Gravito MongoDB grid...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    console.log("Purging existing items...");
    await Product.deleteMany({});
    console.log("Existing collection cleared.");

    console.log("Seeding 6 weightless fashion items...");
    const seeded = await Product.insertMany(PRODUCTS);
    console.log(`Successfully seeded ${seeded.length} products!`);

    await mongoose.disconnect();
    console.log("Disconnected from database grid safely.");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();
