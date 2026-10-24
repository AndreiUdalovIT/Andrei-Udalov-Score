import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TeamLogo } from './team-logo';

const CREST = 'https://crests.football-data.org/57.png';
const fallback = (container: HTMLElement) =>
  container.querySelector('[data-slot="team-logo-fallback"]');

describe('TeamLogo', () => {
  it('renders the crest as a decorative image', () => {
    const { container } = render(<TeamLogo src={CREST} name="Arsenal" size={24} />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
    expect(fallback(container)).toBeNull();
  });

  it('shows the placeholder when there is no crest', () => {
    const { container } = render(<TeamLogo src={null} name="Paderborn" size={24} />);
    expect(container.querySelector('img')).toBeNull();
    expect(fallback(container)).toHaveAttribute('title', 'Paderborn');
  });

  it('switches to the placeholder when the crest fails to load', () => {
    const { container } = render(<TeamLogo src={CREST} name="Arsenal" size={24} />);
    fireEvent.error(container.querySelector('img') as HTMLImageElement);
    expect(fallback(container)).not.toBeNull();
  });

  it('prints the club code only on the large placeholder', () => {
    const { container, rerender } = render(
      <TeamLogo name="Arsenal" tla="ARS" size={40} />,
    );
    expect(fallback(container)).toHaveTextContent('ARS');

    rerender(<TeamLogo name="Arsenal" tla="ARS" size={24} />);
    expect(fallback(container)).toHaveTextContent('');
  });
});
