import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts()
  ],
  css: {
    postcss: {}
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactQuizletFlashcard',
      fileName: (format) => `react-quizlet-flashcard.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'prop-types'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes'
        },
        minifyInternalExports: true
      }
    },
    minify: 'terser'
  }
});

