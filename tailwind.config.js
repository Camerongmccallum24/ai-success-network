/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-midnight': '#0A244A',
        'brand-emerald': '#1EC46D',
        'brand-orange': '#FF7F50',
        'brand-sky': '#47A3F3',
        'brand-dark': '#2F394D',
        'brand-darker': '#1A2B4A',
        'brand-light': '#F5F5F5',
      },
      fontFamily: {
        primary: ['Nunito', 'system-ui', 'sans-serif'],
        secondary: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};