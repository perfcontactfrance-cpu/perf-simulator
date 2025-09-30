/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway', 'sans-serif'],
      },
      colors: {
        'bleu-nuit': '#0D1B2A',
        'jaune-soleil': '#FFC300',
        'gris-clair': '#F5F5F5',
        'noir': '#000000',
        'rouge-action': '#E10600',
      },
    },
  },
  plugins: [],
};
