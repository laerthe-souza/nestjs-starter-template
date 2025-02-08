import importPlugin from 'eslint-plugin-import';
import importHelpers from 'eslint-plugin-import-helpers';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import typescript from 'typescript-eslint';

import javascript from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

export default typescript.config(
  javascript.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...typescript.configs.recommendedTypeChecked,
  {
    ignores: ['**/dist', '**/node_modules', '**/coverage'],
  },
  {
    plugins: {
      'import-helpers': importHelpers,
      typescript: typescript.plugin,
      prettier,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },
  {
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'class-methods-use-this': 'off',
      'no-console': 'error',
      'prettier/prettier': 'error',
      'no-empty-function': 'off',
      'prefer-template': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@core', '^@framework'],
        },
      ],
      'no-useless-constructor': 'off',
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['interface', 'typeLike'],
          format: ['PascalCase'],

          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: ['typeParameter', 'class', 'enum'],
          format: ['PascalCase'],
        },
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', '/^@/', ['parent', 'sibling', 'index']],

          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'vitest.config.mts',
            'eslint.config.mts',
            'tests/**/*.ts',
            'src/@types/*.d.ts',
          ],
        },
      ],
    },
  },
  {
    files: ['tests/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
);
