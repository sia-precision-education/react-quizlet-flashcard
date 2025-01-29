/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      'primary': '#1234567',
      'secondary': '#7654321',
    },
    extend: {
      colors: {
        'brand': {
          100: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        'sky': {
          100: '#e0f7ff',
          200: '#b3eaff',
          300: '#80dcff',
          400: '#4dceff',
          500: '#0ea5e9',
          600: '#008bbf',
          700: '#006f99',
          800: '#005373',
          900: '#00374d',
        },
      },
      keyframes: {
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'soft-bounce': 'soft-bounce 1s ease-in-out infinite',
      }
    }
  }
}