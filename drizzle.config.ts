import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

// Reads .env files in the same order as `next dev`. Locally .env.local points
// at the Neon `dev` branch; in CI and on Vercel the variables are already set.
loadEnvConfig(process.cwd(), true);

// Schema changes go over a direct connection: Neon advises against the pooler here.
const url = process.env.DATABASE_URL_UNPOOLED;
if (!url) {
  throw new Error(
    'DATABASE_URL_UNPOOLED is not set: add the Neon dev branch to .env.local',
  );
}

export default defineConfig({
  schema: './src/server/db/schema.ts',
  out: './src/server/db/migrations',
  dialect: 'postgresql',
  // `homeTeamId` in TypeScript, `home_team_id` in the database.
  casing: 'snake_case',
  dbCredentials: { url },
});
