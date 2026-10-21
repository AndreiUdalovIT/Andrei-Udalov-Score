import { describe, expect, it } from 'vitest';

import { plural, type PluralForms } from './plural';

const MATCHES: PluralForms = ['матч', 'матча', 'матчей'];

describe('plural', () => {
  it.each([
    [0, 'матчей'],
    [1, 'матч'],
    [2, 'матча'],
    [4, 'матча'],
    [5, 'матчей'],
    [11, 'матчей'],
    [12, 'матчей'],
    [14, 'матчей'],
    [21, 'матч'],
    [22, 'матча'],
    [25, 'матчей'],
    [101, 'матч'],
    [111, 'матчей'],
    [112, 'матчей'],
  ])('%i → %s', (count, expected) => {
    expect(plural(count, MATCHES)).toBe(expected);
  });

  it('uses the genitive singular for fractions', () => {
    expect(plural(1.5, MATCHES)).toBe('матча');
  });

  it('ignores the sign', () => {
    expect(plural(-1, MATCHES)).toBe('матч');
    expect(plural(-5, MATCHES)).toBe('матчей');
  });
});
