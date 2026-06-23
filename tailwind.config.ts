import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B8A3E",
        "primary-dark": "#15803d",
        "primary-light": "#22c55e",
        accent: "#facc15",
        dark: "#010101",
        "dark-card": "#111827",
        muted: "#888888",
        light: "#f9fafb",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
