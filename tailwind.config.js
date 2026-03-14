/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {

        brand: {
          500: "#ea580c",
        },

        dark: {
          900: "#0f0f0f",
        },

        surface: {
          50: "#fafafa",
          100: "#ffffff",
        },

        muted: "#6b7280",

        border: "#e5e7eb",

      },
    },
  },

  plugins: [],
}