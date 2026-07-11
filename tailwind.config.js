/** @type {import('tailwindcss').Config} */
import dotenv from "dotenv";
dotenv.config();  

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
