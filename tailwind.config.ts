import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6BFF3C",
          50:  "#f0fff0",
          100: "#d4ffe0",
          200: "#aaffb8",
          300: "#6BFF3C",
          400: "#4de620",
          500: "#36c914",
          600: "#289e0f",
          700: "#1e7a0b",
          800: "#155508",
          900: "#0a2e03",
        },
        dark: {
          DEFAULT: "#0a0a0f",
          50:  "#f5f5f7",
          100: "#e8e8ed",
          200: "#c7c7d4",
          300: "#a0a0b8",
          400: "#6b6b85",
          500: "#4a4a62",
          600: "#333347",
          700: "#1e1e2e",
          800: "#13131f",
          900: "#0a0a0f",
        },
        gold: {
          DEFAULT: "#FFD700",
          light: "#FFE44D",
          dark:  "#CCac00",
        },
      },
      fontFamily: {
        sans:      ["var(--font-inter)",         "system-ui", "sans-serif"],
        ethiopic:  ["var(--font-noto-ethiopic)", "serif"],
        display:   ["var(--font-inter)",         "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #6BFF3C 0%, #39d411 50%, #1e7a0b 100%)",
        "gradient-dark":
          "linear-gradient(135deg, #0a0a0f 0%, #1e1e2e 50%, #13131f 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 40%, #0d2818 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(107,255,60,0.05) 0%, rgba(10,10,15,0.8) 100%)",
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
      boxShadow: {
        brand:    "0 0 30px rgba(107,255,60,0.3)",
        "brand-lg": "0 0 60px rgba(107,255,60,0.4)",
        "brand-sm": "0 0 15px rgba(107,255,60,0.2)",
        glass:    "0 8px 32px rgba(0,0,0,0.3)",
        "glass-lg": "0 16px 48px rgba(0,0,0,0.4)",
        card:     "0 4px 24px rgba(0,0,0,0.2)",
        "card-hover": "0 8px 40px rgba(107,255,60,0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float":          "float 6s ease-in-out infinite",
        "float-delayed":  "float 6s ease-in-out infinite 2s",
        "float-slow":     "float 8s ease-in-out infinite 1s",
        "pulse-brand":    "pulseBrand 2s ease-in-out infinite",
        "spin-slow":      "spin 8s linear infinite",
        "gradient-shift": "gradientShift 4s ease infinite",
        "shimmer":        "shimmer 2s linear infinite",
        "bounce-gentle":  "bounceGentle 2s ease-in-out infinite",
        "glow":           "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        pulseBrand: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(107,255,60,0.3)" },
          "50%":      { boxShadow: "0 0 50px rgba(107,255,60,0.6)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        glow: {
          from: { textShadow: "0 0 10px rgba(107,255,60,0.5)" },
          to:   { textShadow: "0 0 20px rgba(107,255,60,0.9), 0 0 40px rgba(107,255,60,0.5)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;