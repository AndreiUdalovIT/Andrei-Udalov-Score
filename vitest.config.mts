import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // Vite 8 resolves the `@/*` alias from tsconfig.json natively.
  resolve: { tsconfigPaths: true },
  test: {
    // Projects inherit the root config (plugins, resolve) by default.
    projects: [
      {
        // Pure logic (model, utils) — no DOM, starts fast.
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        // React components.
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['src/**/*.test.tsx'],
          setupFiles: ['./vitest.setup.ts'],
        },
      },
    ],
  },
});
