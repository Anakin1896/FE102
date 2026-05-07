/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lib-dark': '#1a202c',
        'lib-card': '#2d3748',
        'lib-teal': '#00c1a3',
        'lib-blue': '#00a3ff',
        'lib-pink': '#ec4899',
      },
      borderRadius: {
        'xl': '1rem', // Matches the 16px corners
      }
    },
  },
  plugins: [],
}