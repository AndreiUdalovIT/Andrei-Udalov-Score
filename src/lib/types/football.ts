// Domain types shared by the UI, the prediction model and the data layer.
// Where football-data.org v4 defines a value, the names mirror the API.

/** Match outcome from the home side: П1 / Х / П2. */
export type Outcome = 'home' | 'draw' | 'away';

/** Result for one team: В / Н / П. */
export type Result = 'W' | 'D' | 'L';

/** Every match status football-data.org v4 can return. */
export const MATCH_STATUSES = [
  'SCHEDULED', // planned, kickoff time may still change
  'TIMED', // kickoff time confirmed
  'IN_PLAY',
  'PAUSED', // half-time break
  'EXTRA_TIME',
  'PENALTY_SHOOTOUT',
  'FINISHED',
  'SUSPENDED',
  'POSTPONED',
  'CANCELLED',
  'AWARDED', // result set by the organizer, not on the pitch
] as const;

export type MatchStatus = (typeof MATCH_STATUSES)[number];

/** League table zone; each maps to a `--zone-*` color token. */
export type Zone = 'ucl' | 'uel' | 'uecl' | 'playoff' | 'releg';
