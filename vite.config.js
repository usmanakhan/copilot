import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
  },
});