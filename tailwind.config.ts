import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          light: "#e0e7ff", // indigo-100
          purple: "#8b5cf6", // violet-500
          cyan: "#06b6d4", // cyan-500
          pink: "#db2777", // pink-600
          deepSpace: "#030014", // dark dark space
          glassBg: "rgba(10, 10, 20, 0.5)",
          glassBorder: "rgba(255, 255, 255, 0.08)",
        },
      },
      backgroundImage: {
        "space-gradient": "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #030014 100%)",
        "nebula-gradient": "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(219, 39, 119, 0.1) 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        levitate: "levitate 8s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3.5s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        levitate: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(1deg)" },
        },
        glow: {
          "0%, 100%": { filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.4))" },
          "50%": { filter: "drop-shadow(0 0 25px rgba(139, 92, 246, 0.8))" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(-12px)" },
          "50%": { transform: "translateY(8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.35))" },
          "50%": { filter: "drop-shadow(0 0 25px rgba(6, 182, 212, 0.65))" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 8px 32px 0 rgba(139, 92, 246, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
