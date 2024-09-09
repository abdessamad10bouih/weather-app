/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B262C',
        button: '#3A5E72',
        inputs: '#24343D'
      },
      backdropBlur: {
        '4xl': '40px', // Add if missing or customize
      },
      fontFamily: {
        poppins: ['poppins', 'sans-serif']
      }
    },
  },
  plugins: [
  ],
}