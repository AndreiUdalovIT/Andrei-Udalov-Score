// Database schema. Drizzle builds both the TypeScript types and the SQL
// migrations from this file. Primary keys are the ids from football-data.org:
// upserts need no lookups, and `/teams/57` is the row with id 57.
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import type { MatchDuration, MatchStatus } from '@/lib/types/football';

export const competitions = pgTable('competitions', {
  id: integer().primaryKey(),
  /** Upper case, as in the API: 'PL'. URLs use lower case. */
  code: text().notNull().unique(),
  name: text().notNull(),
  emblem: text(),
  currentMatchday: integer(),
});

export const teams = pgTable('teams', {
  id: integer().primaryKey(),
  name: text().notNull(),
  // The API sometimes sends null; the mapper falls back to the name.
  shortName: text().notNull(),
  tla: text().notNull(),
  crest: text(),
  clubColors: text(),
});

/** Which teams play in a competition in a given season. */
export const teamCompetitions = pgTable(
  'team_competitions',
  {
    competitionId: integer()
      .notNull()
      .references(() => competitions.id),
    /** Year the season starts: 2026 is 2026/27, as in the API. */
    season: integer().notNull(),
    teamId: integer()
      .notNull()
      .references(() => teams.id),
  },
  (t) => [
    primaryKey({ columns: [t.competitionId, t.season, t.teamId] }),
    index('team_competitions_team_idx').on(t.teamId),
  ],
);

export const matches = pgTable(
  'matches',
  {
    id: integer().primaryKey(),
    competitionId: integer()
      .notNull()
      .references(() => competitions.id),
    season: integer().notNull(),
    matchday: integer(),
    /** 'REGULAR_SEASON', 'LEAGUE_STAGE', 'LAST_16'… */
    stage: text().notNull(),
    // A stored UTC instant; converted to the browser's time zone only on screen.
    utcDate: timestamp({ withTimezone: true }).notNull(),
    // Text, not a database enum: a new API status needs no migration.
    status: text().$type<MatchStatus>().notNull(),
    // Null until the opponent is known: knockout ties are scheduled early.
    homeTeamId: integer().references(() => teams.id),
    awayTeamId: integer().references(() => teams.id),
    /** The score shown to people. */
    homeGoals: integer(),
    awayGoals: integer(),
    /** Goals in 90 minutes, for the model: extra time would skew it. */
    homeGoals90: integer(),
    awayGoals90: integer(),
    duration: text().$type<MatchDuration>().notNull(),
    homePenalties: integer(),
    awayPenalties: integer(),
    lastUpdated: timestamp({ withTimezone: true }).notNull(),
  },
  (t) => [
    index('matches_competition_date_idx').on(t.competitionId, t.utcDate),
    index('matches_home_team_idx').on(t.homeTeamId),
    index('matches_away_team_idx').on(t.awayTeamId),
  ],
);
