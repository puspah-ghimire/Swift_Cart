/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swiftCart': '#0093E0',
        'swiftCartLight': '#ABE2FF',
        'swiftCartLighter': '#DFF4FF',
        'swiftCartDark': '#0177B5',
      },
    },
  },
  plugins: [],
}