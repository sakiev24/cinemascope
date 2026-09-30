/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Two-color palette: Sunburst + Midnight, with tints/shades of each
        sunburst: {
          DEFAULT: '#F8C61E',
          50: '#FEF8E3',
          100: '#FDEFBF',
          200: '#FBE185',
          300: '#FAD44F',
          400: '#F8C61E',
          500: '#E0AF0A',
          600: '#B38B08',
        },
        midnight: {
          DEFAULT: '#252C37',
          50: '#F3F4F6',
          100: '#DDE0E6',
          200: '#B7BDC8',
          300: '#8C95A4',
          400: '#646E7F',
          500: '#465062',
          600: '#363F4D',
          700: '#2D3441',
          800: '#252C37',
          900: '#1C222B',
          950: '#141820',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      letterSpacing: {
        label: '0.25em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'slide-in': 'slide-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
}
