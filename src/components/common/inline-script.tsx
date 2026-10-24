/**
 * A script that runs while the HTML is parsed, before the first paint.
 * On client renders it becomes inert `text/plain`: React warns about
 * rendering `<script>` there, and the browser would not execute it anyway.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Serializes a value into a script safely: `<` can't close the tag. */
export function toScriptLiteral(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
