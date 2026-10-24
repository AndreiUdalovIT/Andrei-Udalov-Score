'use client';

import { useId } from 'react';

import { InlineScript, toScriptLiteral } from './inline-script';

const LOCALE = 'ru-RU';

type LocalTimeProps = {
  /** ISO timestamp, e.g. `2026-10-24T16:30:00Z`. */
  value: string;
  options: Intl.DateTimeFormatOptions;
  className?: string;
};

/**
 * A timestamp in the visitor's time zone. The server renders it in its own zone,
 * then an inline script rewrites the text before the first paint — no flash and
 * no hydration error. Client-side navigations format it in the browser directly.
 */
export function LocalTime({ value, options, className }: LocalTimeProps) {
  const id = useId();
  const text = new Date(value).toLocaleString(LOCALE, options);

  return (
    <>
      <time id={id} dateTime={value} className={className} suppressHydrationWarning>
        {text}
      </time>
      <InlineScript
        html={`{var n=document.getElementById(${toScriptLiteral(id)});if(n)n.textContent=new Date(${toScriptLiteral(value)}).toLocaleString(${toScriptLiteral(LOCALE)},${toScriptLiteral(options)})}`}
      />
    </>
  );
}
