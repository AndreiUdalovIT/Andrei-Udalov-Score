import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Turns off stylistic rules that conflict with Prettier — keep it last.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Local design mockups (gitignored), ESLint does not read .gitignore.
    'design/**',
    // Generated browser reports and traces are not application source.
    'playwright-report/**',
    'test-results/**',
    'blob-report/**',
    'playwright/**',
  ]),
]);

export default eslintConfig;
