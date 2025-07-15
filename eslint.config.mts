import { FlatCompat } from '@eslint/eslintrc';
import javascript from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import typescript from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: javascript.configs.recommended,
});

export default [
  ...compat.plugins(
    'import-helpers',
    '@typescript-eslint',
    'import',
    'prettier',
  ),
  ...typescript.configs.recommendedTypeChecked,
  {
    ignores: ['**/dist', '**/node_modules', '**/coverage'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
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
      ...javascript.configs.recommended.rules,
      'no-undef': 'off',
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
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            "Direct use of process.env is forbidden. Instead, import 'myEnv' to access environment variables.",
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
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
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
          groups: [
            'module',
            [
              '/^@modules\\//',
              '/^@infrastructure\\//',
              '/^@shared\\//',
              '/^@tests\\//',
            ],
            ['parent', 'sibling', 'index'],
          ],
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
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];
