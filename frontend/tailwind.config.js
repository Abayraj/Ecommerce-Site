/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      backgroundImage: {
        'logo': "url('./public/images/Logo-removebg-preview.png')",
      
      },
      colors: {
        'navbg': '#FFFF', // Background color for navigation
        'slate-blue-custom': '#0D0C22', // Custom slate blue color
        'slate-green': '#33FF33', // Custom slate green color
        'slate-logo-color': '#0D0C22', // Color for logo (assuming this is what 'slate-logoColor' meant)
        'input-bg-color':'#f4f5fb'
        // Add more custom colors as needed
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}

