import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BottomTabBar } from './bottom-tab-bar';

const navigation = vi.hoisted(() => ({ pathname: '/' }));

vi.mock('next/navigation', () => ({ usePathname: () => navigation.pathname }));

describe('BottomTabBar', () => {
  beforeEach(() => {
    navigation.pathname = '/';
  });

  it('shows four sections and «Войти» for a guest', () => {
    render(<BottomTabBar />);
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Главная',
      'Лиги',
      'Календарь',
      'Прогнозы',
      'Войти',
    ]);
  });

  it('shows «Профиль» once signed in', () => {
    render(<BottomTabBar signedIn />);
    expect(screen.getByRole('link', { name: 'Профиль' })).toBeInTheDocument();
  });

  it('marks the section of a nested page as current', () => {
    navigation.pathname = '/leagues/pl';
    render(<BottomTabBar />);
    expect(screen.getByRole('link', { name: 'Лиги' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Главная' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
