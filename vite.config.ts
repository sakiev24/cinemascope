import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/sakiev24/cinemascope', // Replace 'Letterboxd' with your actual GitHub repo name
})
