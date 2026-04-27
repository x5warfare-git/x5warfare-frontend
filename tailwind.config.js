/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: '#050505', // Biraz daha zifiri siyah
        bone: '#f5f5f7',
        muted: '#555555',
        'warfare-red': '#FF0000', // Tam, canlı ve saf kırmızı!
      },
      fontFamily: {
        // Tüm siteyi Times New Roman (Serif) ailesine geçiriyoruz
        sans: ['"Times New Roman"', 'Times', 'serif'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
      }
    },
  },
  plugins: [],
};