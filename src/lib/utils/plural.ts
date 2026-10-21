export type PluralForms = readonly [one: string, few: string, many: string];

const rules = new Intl.PluralRules('ru');

/**
 * Russian plural form for a count: `plural(5, ['матч', 'матча', 'матчей'])` → `'матчей'`.
 * Returns only the word, so the number can be formatted separately.
 */
export function plural(count: number, [one, few, many]: PluralForms): string {
  switch (rules.select(count)) {
    case 'one':
      return one;
    case 'few':
      return few;
    case 'many':
      return many;
    default:
      // Fractions: «1,5 матча» use the genitive singular, same as `few`.
      return few;
  }
}
