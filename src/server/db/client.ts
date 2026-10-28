// Fails the build if a Client Component imports the database: the connection
// string must never reach the browser.
import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL is not set: add the Neon dev branch to .env.local');
}

/**
 * The app's database. Every query is a single HTTP request with no open
 * connection — what serverless functions want. No transactions over HTTP:
 * the sync script has its own WebSocket client for those.
 */
export const db = drizzle({ client: neon(url), schema, casing: 'snake_case' });
