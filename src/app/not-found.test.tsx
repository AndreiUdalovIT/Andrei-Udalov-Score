import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import NotFound from './not-found';

vi.mock('next/navigation', () => ({ usePathname: () => '/nope' }));

it('names the page with its only top-level heading', () => {
  render(<NotFound />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Страница не найдена',
  );
  expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute(
    'href',
    '/',
  );
});
