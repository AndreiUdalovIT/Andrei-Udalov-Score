import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';

import SiteError from './error';

it('offers a retry and shows the id from the server logs', async () => {
  const retry = vi.fn();
  const error = Object.assign(new Error('boom'), { digest: '2849571' });
  render(<SiteError error={error} retry={retry} />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Что-то пошло не так',
  );
  expect(screen.getByRole('alert')).toHaveTextContent('код ошибки 2849571');

  await userEvent.setup().click(screen.getByRole('button', { name: 'Повторить' }));
  expect(retry).toHaveBeenCalledOnce();
});

it('leaves the code out when there is none', () => {
  // A Client Component may throw anything, not only an Error.
  render(<SiteError error="boom" retry={() => {}} />);

  expect(screen.queryByText(/код ошибки/)).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute(
    'href',
    '/',
  );
});
