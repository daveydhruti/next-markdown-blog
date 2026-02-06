/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f1eb',
          300: '#ede7dd',
          400: '#e3d9ca',
        },
        blush: {
          50: '#fdf8f8',
          100: '#fceef0',
          200: '#f9dde1',
          300: '#f4bcc4',
          400: '#ee9aa6',
          500: '#e77889',
          600: '#d95b70',
        },
        mauve: {
          50: '#faf9fb',
          100: '#f3f1f5',
          200: '#e8e4ed',
          300: '#d4cce0',
          400: '#bdb0ce',
          500: '#a594bc',
          600: '#8b77a8',
        },
        sage: {
          50: '#f8faf9',
          100: '#f0f4f2',
          200: '#dfe8e4',
          300: '#c5d5ce',
          400: '#a8bfb5',
          500: '#8aa99c',
        },
        plum: {
          900: '#2d1b2e',
          950: '#1f1520',
        },
      },
    },
  },
  plugins: [],
}