import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  // Shared settings
  {
    settings: {
      perfectionist: {
        type: 'alphabetical',
        order: 'asc',
        fallbackSort: { type: 'line-length', order: 'asc' },
        partitionByComment: true,
      },
    },
  },

  //  Client (React)
  {
    files: ['client/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintConfigPrettier, // Disables the eslint rules that conflicts with prettier
    ],
    plugins: {
      prettier,
      perfectionist,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'prettier/prettier': 'error',
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-objects': 'error',
    },
  },

  // Server (Node/Express)
  {
    files: ['server/**/*.{js,ts}'],
    extends: [js.configs.recommended, eslintConfigPrettier],
    plugins: {
      prettier,
      perfectionist,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^[A-Z_]',
        },
      ],
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-objects': 'error',
    },
  },
]);
