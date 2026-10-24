import { describe, expect, it } from 'vitest';

import { cn } from './utils';

describe('cn', () => {
  it('keeps a type-scale size next to a text color', () => {
    expect(cn('text-caption', 'text-muted-foreground')).toBe(
      'text-caption text-muted-foreground',
    );
  });

  it('resolves two type-scale sizes to the last one', () => {
    expect(cn('text-body text-loss', 'text-micro')).toBe('text-loss text-micro');
  });

  it('still resolves regular Tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'px-4', false && 'hidden')).toBe('py-1 px-4');
  });
});
