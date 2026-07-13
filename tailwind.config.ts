import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        "luxury-black": "#080604",
        "soft-black": "#15110D",
        "gold": "#D6B56D",
        "deep-gold": "#A67C2D",
        "warm-beige": "#E8D8C3",
        "light-beige": "#F7EFE4",
        "ivory": "#FFFBF4",
        "soft-taupe": "#A99782",
        "muted-rose": "#D8B7A3",
        "text-dark": "#1C1712",
        "text-soft": "#6F6255",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        "great-vibes": ["Great Vibes", "cursive"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D6B56D 0%, #A67C2D 50%, #D6B56D 100%)",
        "dark-gradient": "linear-gradient(180deg, #080604 0%, #15110D 100%)",
        "beige-gradient": "linear-gradient(180deg, #FFFBF4 0%, #F7EFE4 100%)",
        "hero-gradient": "linear-gradient(135deg, #080604 0%, #1C1712 60%, #15110D 100%)",
      },
      animation: {
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "particle": "particle 8s ease-in-out infinite",
        "line-draw": "lineDraw 1.5s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "spotlight": "spotlight 4s ease-in-out infinite",
      },
      keyframes: {
        goldShimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(360deg)", opacity: "0" },
        },
        lineDraw: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spotlight: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
      },
      boxShadow: {
        "gold": "0 0 30px rgba(214, 181, 109, 0.3)",
        "gold-sm": "0 0 15px rgba(214, 181, 109, 0.2)",
        "luxury": "0 25px 60px rgba(8, 6, 4, 0.5)",
        "card": "0 10px 40px rgba(166, 124, 45, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
