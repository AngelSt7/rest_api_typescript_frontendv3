/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customGris: '#1e1e1e',
        customGrisHeader: '#111111',
        customRed: '#B20710',
        customGreen: '#358E5B',
        customGreenHover: '#1e7242',
        customGrisContenedor: '#171414',
        customColorBody: '#e8e8e8'
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
