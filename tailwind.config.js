/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E90ff',
        secondary: '#5c9fe0',
        textColor: '#787A7D',
        grayColor: '#F0F0F0'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
