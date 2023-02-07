const { fontFamily, colors } = require('tailwindcss/defaultTheme') // eslint-disable-line

/**
 * @type {import('tailwindcss').exports}
 */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx,svg}',
    './styles/**/*.css',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        appear: 'appear 300ms ease-in-out',
        marquee: 'marquee 60s steps(86, end) infinite',
        'marquee-reverse': 'marquee 60s steps(86, end) reverse infinite',
        show: 'show 150ms ease-in-out',
      },
      colors: {
        'theme-green': {
          100: '#CEFDEF',
          200: '#9EFADE',
          300: '#6DF8CE',
          400: '#3DF5BD',
          500: '#0CF3AD',
          600: '#0AC28A',
          700: '#079268',
          800: '#056145',
          900: '#023123',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', ...fontFamily.sans],
        'cormorant-garamond': ['Cormorant Garamond', ...fontFamily.serif],
        // 'montserrat-alternates': ['Montserrat Alternates', ...fontFamily.sans],
        // 'montserrat-subrayada': ['Montserrat Subrayada', ...fontFamily.sans],
        // cormorant: ['Cormorant', ...fontFamily.serif],
        // 'cormorant-infant': ['Cormorant Infant', ...fontFamily.serif],
      },
      keyframes: {
        appear: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          '100%': { backgroundPosition: '-100% 0' },
        },
        show: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  variants: {
    typography: ['responsive'],
  },
  plugins: [require('@tailwindcss/typography')],
}
