import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // basic rules (add more as you like)
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // enable prettier compatibility
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
