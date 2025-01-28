import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx'],
      rollupTypes: true,
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:5]'
    },
    postcss: {
      plugins: [
        autoprefixer()
      ]
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'ReactQuizletFlashcard',
      fileName: (format) => `react-quizlet-flashcard.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        minifyInternalExports: true,
      }
    },
    minify: false,
    target: 'es2015',
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    manifest: false,
    write: true,
    reportCompressedSize: true,
    brotliSize: true,
  }
})
