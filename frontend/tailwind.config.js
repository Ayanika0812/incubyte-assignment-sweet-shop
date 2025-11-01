/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sweetLightBg: "#FFF7FA",
        sweetHotPink: "#FF4DA6",
        sweetCard: "#FFE6EE",
      },
      boxShadow: {
        sweet: "0 4px 10px rgba(255, 105, 180, 0.2)",
        sweetHover: "0 6px 14px rgba(255, 105, 180, 0.35)",
      },
    },
  },
  plugins: [],
};
