import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      manifest: true,
    },
      
    plugins: [vue()],

    // production base must match STATIC_URL in settings.py
    base: mode === "production" ? "/static/" : "/",

    server: {
      proxy: {
        '/api/': {
          target: 'http://127.0.0.1:8000/'
        },
        '/static/': {
          target: 'http://127.0.0.1:8000/'
        },
        '/admin/': {
          target: 'http://127.0.0.1:8000/'
        },
      }
    }
  }
})
