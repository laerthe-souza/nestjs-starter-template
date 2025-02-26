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
      include: ['src/**/*.usecase.ts'],
    },
    include: ['tests/**/*.spec.ts'],
    exclude: ['node_modules'],
  },
  resolve: {
    alias: {
      '@application': resolve(__dirname, './src/application'),
      '@domain': resolve(__dirname, './src/domain'),
      '@infrastructure': resolve(__dirname, './src/infrastructure'),
      '@shared': resolve(__dirname, './src/shared'),
      '@tests': resolve(__dirname, './tests'),
    },
  },
});
