import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // react-hooks v7 bundles React Compiler rules that assume state is only
      // ever mutated via setState. This project mutates Three.js/TSL objects
      // (scene, uniforms) directly inside useFrame/useEffect, which is the
      // standard react-three-fiber pattern and not React Compiler-compatible.
      'react-hooks/immutability': 'off',
    },
  },
])
