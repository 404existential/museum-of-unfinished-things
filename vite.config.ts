import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-dev-transform',
      enforce: 'pre',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          // Dynamically replace production bundle tags with live TSX source before bundling
          return html
            .replace(/<script type="module" crossorigin src=".*?"><\/script>/, '<script type="module" src="/src/main.tsx"></script>')
            .replace(/<link rel="stylesheet" crossorigin href=".*?">/, '');
        },
      },
    },
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
