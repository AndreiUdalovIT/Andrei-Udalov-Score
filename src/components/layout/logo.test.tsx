import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { Logo } from './logo';

it('is named by the words on screen, so voice control can find it', () => {
  render(
    <>
      <Logo />
      <Logo short />
    </>,
  );

  expect(screen.getByRole('link', { name: 'Andrei Udalov Score' })).toHaveAttribute(
    'href',
    '/',
  );
  expect(screen.getByRole('link', { name: 'Udalov Score' })).toHaveAttribute(
    'href',
    '/',
  );
});
