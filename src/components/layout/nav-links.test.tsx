import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NavLinks, NavMenu } from './nav-links';

const navigation = vi.hoisted(() => ({ pathname: '/' }));

vi.mock('next/navigation', () => ({ usePathname: () => navigation.pathname }));

describe('NavLinks', () => {
  beforeEach(() => {
    navigation.pathname = '/';
  });

  it('lists all five sections', () => {
    render(<NavLinks />);
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Главная',
      'Лиги',
      'Календарь',
      'Прогнозы',
      'Сравнение',
    ]);
  });

  it('marks the section of a nested page as current, and only it', () => {
    navigation.pathname = '/leagues/pl';
    render(<NavLinks />);
    expect(screen.getByRole('link', { name: 'Лиги' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen
        .getAllByRole('link')
        .filter((link) => link.hasAttribute('aria-current')),
    ).toHaveLength(1);
  });
});

describe('NavMenu', () => {
  it('opens the sections with the current one marked', async () => {
    navigation.pathname = '/calendar';
    render(<NavMenu />);
    await userEvent.setup().click(screen.getByRole('button', { name: /Меню/ }));
    expect(
      await screen.findByRole('menuitem', { name: 'Календарь' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('menuitem', { name: 'Главная' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
