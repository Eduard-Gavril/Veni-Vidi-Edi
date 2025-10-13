/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#E07B5C',
        crema: '#FFF4E1',
        vino: '#7B1E3D',
        verde: '#6B8E23',
        oro: '#D4AF37'
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Roboto"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
