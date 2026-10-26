import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Pàgines legals estàtiques (indexables sense JS)
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        avisLegal: path.resolve(__dirname, "avis-legal.html"),
        privacitat: path.resolve(__dirname, "privacitat.html"),
        cookies: path.resolve(__dirname, "cookies.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
