import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ErrorState } from './error-state';

describe('ErrorState', () => {
  it('is announced as an alert with the default copy', () => {
    render(<ErrorState />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить данные',
    );
  });

  it('retries on click', async () => {
    const onRetry = vi.fn();
    render(<ErrorState title="Не удалось загрузить матчи" onRetry={onRetry} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Повторить' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('locks the button while a retry is in flight', () => {
    render(<ErrorState onRetry={() => {}} retrying />);
    expect(screen.getByRole('button', { name: 'Подключаемся…' })).toBeDisabled();
  });

  it('has no button when there is nothing to retry', () => {
    render(<ErrorState />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
