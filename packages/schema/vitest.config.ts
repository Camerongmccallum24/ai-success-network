import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      // The rules function is the project's core credibility claim: every branch is tested.
      thresholds: { branches: 100, functions: 100, lines: 100, statements: 100 },
    },
  },
});
