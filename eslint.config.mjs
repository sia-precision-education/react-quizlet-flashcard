import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
      plugins: {
        "react-compiler": reactCompilerPlugin,
      },
      rules: {
        "react-compiler/react-compiler": "warn",
      },
    },
    { // The rest of my config
      files: ["**/*.{j,t}s{,x}"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      }
    },
    {
      ignores: [ /* global ignores */ ],
    },
  )