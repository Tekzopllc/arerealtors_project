/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'lg': ['1.5rem', '2rem'], // Modifying text-lg to be larger with adjusted line height
      },
      colors: {
        'modalprimary': '#ea580c',
        'modalprimary-dark': '#d24b09',
        'modalsecondary': '#272727',
        primary: {
          DEFAULT: '#FF6B00',
          dark: '#CC5500',
          light: '#FF8533',
        },
        secondary: {
          'DEFAULT': '#1A1A1A',
          'light': '#333333',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mulish': ['Mulish', 'sans-serif'],
      }
    },
  },
  plugins: [],
};