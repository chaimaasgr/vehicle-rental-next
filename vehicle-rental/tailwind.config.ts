import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        asphalt: {
          950: "#1B2A4A", // bleu marine (fond principal)
          900: "#22335A",
          800: "#2A3D6B",
          700: "#33487D",
          600: "#3D5490",
        },
        signal: {
          400: "#F26161",
          500: "#E63946",
          600: "#C62838",
        },
        mist: {
          50: "#F7F6F3",
          100: "#EFEDE7",
          200: "#DDD9CF",
        },
        route: {
          500: "#3E7C6B",
          600: "#2F6355",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(18, 21, 27, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;