import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PredictionBar } from './prediction-bar';

const verdictMark = (container: HTMLElement) =>
  container.querySelector('[data-verdict]');

describe('PredictionBar', () => {
  it('makes the most likely outcome bold and the others muted', () => {
    render(<PredictionBar home={46} draw={25} away={29} />);
    expect(screen.getByText('46%')).toHaveClass('font-semibold');
    expect(screen.getByText('25%')).toHaveClass('text-muted-foreground');
    expect(screen.getByText('29%')).toHaveClass('text-muted-foreground');
  });

  it('reads all three numbers as one phrase', () => {
    render(<PredictionBar home={46} draw={25} away={29} />);
    expect(
      screen.getByText('Прогноз: победа хозяев 46%, ничья 25%, победа гостей 29%.'),
    ).toHaveClass('sr-only');
  });

  it('before the match: no verdict and a full-strength bar', () => {
    const { container } = render(<PredictionBar home={46} draw={25} away={29} />);
    expect(verdictMark(container)).toBeNull();
    expect(screen.getByTitle('Прогноз до матча')).toBeInTheDocument();
    expect(container.querySelector('.opacity-45')).toBeNull();
  });

  it('marks a correct prediction with ✓ next to the favorite and fades the bar', () => {
    const { container } = render(
      <PredictionBar home={46} draw={25} away={29} outcome="home" />,
    );
    const mark = verdictMark(container);
    expect(mark).toHaveAttribute('data-verdict', 'hit');
    expect(screen.getByText('46%')).toContainElement(mark as HTMLElement);
    expect(screen.getByText(/Модель угадала исход/)).toHaveClass('sr-only');
    expect(container.querySelector('.opacity-45')).not.toBeNull();
  });

  it('marks a wrong prediction with ✗, still next to the favorite', () => {
    const { container } = render(
      <PredictionBar home={46} draw={25} away={29} outcome="away" />,
    );
    expect(verdictMark(container)).toHaveAttribute('data-verdict', 'miss');
    expect(screen.getByText('46%')).toContainElement(
      verdictMark(container) as HTMLElement,
    );
    expect(screen.getByTitle('Модель не угадала исход')).toBeInTheDocument();
  });

  it('picks the first outcome on a tie', () => {
    render(<PredictionBar home={35} draw={30} away={35} />);
    expect(screen.getAllByText('35%')[0]).toHaveClass('font-semibold');
    expect(screen.getAllByText('35%')[1]).toHaveClass('font-normal');
  });

  it('drops the % sign in the narrow mobile size', () => {
    render(<PredictionBar home={46} draw={25} away={29} size="sm" />);
    expect(screen.getByText('46')).toBeInTheDocument();
    expect(screen.queryByText('46%')).toBeNull();
  });
});
