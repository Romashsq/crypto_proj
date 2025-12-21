import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // САМАЯ ВАЖНАЯ СТРОЧКА:
  base: '/crypto_proj/', // Имя вашего репозитория после .io/
})