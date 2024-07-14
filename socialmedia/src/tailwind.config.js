/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs':"450px",
      },
      spacing: {
        'fit-plus-20': 'calc(100% + 20px)',
      },
      fontFamily:{
        signature : ['Great Vibes'],
        signature1 : ['Exo 2']
      }
    },
  },
  plugins: [],
}

