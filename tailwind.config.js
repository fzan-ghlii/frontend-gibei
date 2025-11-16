/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Memindai semua file Vue dan JS/TS
  ],
  theme: {
    extend: {
      // Menambahkan palet warna dari WDD (poin 5.2)
      colors: {
        'gibei-primary': '#1a4162',
        'gibei-secondary': '#e6d9c6',
        'gibei-text': '#333333',
      },
      // Menambahkan font family dari WDD (poin 5.3)
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], // Untuk Headings
        'inter': ['Inter', 'sans-serif'],     // Untuk Body
      }
    },
  },
  plugins: [],
}