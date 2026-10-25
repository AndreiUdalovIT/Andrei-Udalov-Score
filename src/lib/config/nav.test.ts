import { describe, expect, it } from 'vitest';

import { isNavActive, mainNav, tabBarNav } from './nav';

describe('isNavActive', () => {
  it.each([
    ['/', '/', true],
    ['/', '/calendar', false],
    ['/leagues', '/leagues', true],
    ['/leagues', '/leagues/pl', true],
    ['/leagues', '/leagues/pl/table', true],
    ['/compare', '/compare-old', false],
    ['/calendar', '/', false],
  ])('%s on %s → %s', (href, pathname, expected) => {
    expect(isNavActive(href, pathname)).toBe(expected);
  });
});

describe('tabBarNav', () => {
  it('reuses the first four header sections', () => {
    expect(tabBarNav(false).slice(0, 4)).toEqual(mainNav.slice(0, 4));
  });

  it('ends with «Войти» for a guest and «Профиль» after sign-in', () => {
    expect(tabBarNav(false).at(-1)?.label).toBe('Войти');
    expect(tabBarNav(true).at(-1)?.label).toBe('Профиль');
  });
});
