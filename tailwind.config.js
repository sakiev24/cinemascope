/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Exact Letterboxd color palette
        light: {
          bg: '#ffffff',
          surface: '#f8f8f8',
          text: '#2c3440',
          'text-secondary': '#889',
          border: '#e8e8e8',
          accent: '#FF8000', // Letterboxd orange
          green: '#00E054', // Letterboxd green
          star: '#ffc107',
        },
        dark: {
          bg: '#14171C', // Deep black/charcoal - Letterboxd authentic
          surface: '#2C343F', // Charcoal gray for cards
          'surface-hover': '#3a4250', // Subtle hover
          text: '#FFFFFF', // Pure white for high contrast
          'text-secondary': '#9ab', // Muted gray metadata
          'text-tertiary': '#789',
          border: '#2C343F',
          accent: '#FF8000', // Vibrant orange for actions
          'accent-hover': '#ff9500',
          green: '#00E054', // Vibrant green for ratings/positive
          star: '#ffc107', // Yellow stars
        },
      },
      borderRadius: {
        'poster': '4px',
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
    },
  },
  plugins: [],
}
