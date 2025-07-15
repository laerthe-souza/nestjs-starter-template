import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    api: {
      host: '0.0.0.0',
    },
    bail: 1,
    clearMocks: true,
    globals: true,
    environment: 'node',
    passWithNoTests: true,
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      include: ['src/modules/**/application/services/**'],
      exclude: ['src/modules/**/dtos'],
    },
    include: ['tests/**/*.spec.ts'],
    exclude: ['node_modules'],
  },
  resolve: {
    alias: {
      '@modules': resolve(__dirname, './src/modules'),
      '@shared': resolve(__dirname, './src/shared'),
      '@infrastructure': resolve(__dirname, './src/infrastructure'),
      '@tests': resolve(__dirname, './tests'),
    },
  },
});
