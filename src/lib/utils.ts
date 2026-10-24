import { createCn } from 'cn/config';

/**
 * Joins class names and resolves Tailwind conflicts (`clsx` + `tailwind-merge`).
 *
 * The merge engine doesn't know our type scale from globals.css: without this
 * it reads `text-caption` as a text color and drops it next to
 * `text-muted-foreground`. Keep the list in sync with the `--text-*` tokens.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'score-xl',
            'display',
            'h1',
            'h2',
            'h3',
            'score',
            'body',
            'body-sm',
            'caption',
            'micro',
          ],
        },
      ],
    },
  },
});
