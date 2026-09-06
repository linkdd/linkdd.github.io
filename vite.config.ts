import { fileURLToPath, URL } from 'node:url'

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    {
      name: 'fix-98css-hover-query',
      enforce: 'pre',
      transform(code, id) {
        // 98.css 0.1.21 ships a malformed query rejected by CSS minification.
        if (id.split('?')[0].endsWith('/98.css/dist/98.css')) {
          return code.replaceAll('@media (not(hover))', '@media (hover: none)')
        }
      },
    },
    mdx(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
