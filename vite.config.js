import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    tailwindcss(),
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.ladle.tsx'],
      rollupTypes: true,
    })
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: {
      overlay: false
    }
  },
  build: {
    ssr: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ReactQuizletFlashcard',
      fileName: (format) => `react-quizlet-flashcard.${format}.js`,
      formats: ['es', 'cjs', 'umd'] // Added UMD format for broader compatibility
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Mark React as external dependency
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        manualChunks: undefined,
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    sourcemap: true, // Enable sourcemaps for debugging
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    minify: 'esbuild' // Explicitly set minifier
  }
})