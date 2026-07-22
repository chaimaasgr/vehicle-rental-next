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
          950: "#12151B",
          900: "#181C24",
          800: "#20252F",
          700: "#2B303C",
          600: "#3B4150",
        },
        signal: {
          400: "#F5B45C",
          500: "#F2A93B",
          600: "#DC8E1E",
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
