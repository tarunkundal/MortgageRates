import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oah-api': {
        target: 'https://www.consumerfinance.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oah-api/, '/oah-api'),
      },
    },
  },
});
