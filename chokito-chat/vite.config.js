import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 ESTA PARTE es la clave
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // 👇 Esto redirige todas las rutas al index.html
    fs: {
      allow: ['.']
    }
  },
  // 👇 Esto es fundamental para que las rutas internas funcionen
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})
