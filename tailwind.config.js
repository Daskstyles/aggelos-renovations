/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#f5f2ee",        // warm light background
          dark: "#111827",      // headings / primary text
          accent: "#b79471",    // gold-beige
          accentDark: "#a68465",
          card: "#ffffff",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.12)",
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
