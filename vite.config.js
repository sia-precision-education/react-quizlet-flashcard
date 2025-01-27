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
    postcss: {
      plugins: [
        autoprefixer()
      ]
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactQuizletFlashcard',
      fileName: (format) => `react-quizlet-flashcard.${format}.js`,
      formats: ['es', 'umd'] // Specify desired output formats
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Mark React as external dependency
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
