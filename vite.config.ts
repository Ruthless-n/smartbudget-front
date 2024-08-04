import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@libs': path.resolve(__dirname, './src/lib'),
      '@user': path.resolve(__dirname, './src/modules/user'),
      '@auth': path.resolve(__dirname, './src/modules/auth'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
})