/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:"#BF40BF",
        lowPurple:"#DA70D6",
        lightPurpe:"#480ca8"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
      }
    },
  },
  plugins: [],
}

