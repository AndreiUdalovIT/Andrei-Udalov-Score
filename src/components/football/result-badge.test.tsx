import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { ResultBadge } from './result-badge';

it.each([
  ['W', 'В', 'Победа'],
  ['D', 'Н', 'Ничья'],
  ['L', 'П', 'Поражение'],
] as const)('%s shows «%s» and reads as «%s»', (result, letter, label) => {
  render(<ResultBadge result={result} />);
  expect(screen.getByText(letter)).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByText(label)).toHaveClass('sr-only');
});
