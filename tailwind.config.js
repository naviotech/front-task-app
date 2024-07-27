/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'menu-close': "url('svg/closed.svg')",
        'menu-burguer': "url('svg/burguer.svg')"
      }
    },
  },
  plugins: [],
}