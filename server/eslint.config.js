// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  //   globalIgnores(['dist']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: { globals: globals.node, sourceType: 'module' },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    },
  }
)
