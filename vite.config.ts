import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: 'html-dev-transform',
      transformIndexHtml(html) {
        if (command === 'serve') {
          // In development mode, dynamically replace production bundle tags with live TSX source
          return html
            .replace(/<script type="module" crossorigin src=".*?"><\/script>/, '<script type="module" src="/src/main.tsx"></script>')
            .replace(/<link rel="stylesheet" crossorigin href=".*?">/, '');
        }
        return html;
      },
    },
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}));
