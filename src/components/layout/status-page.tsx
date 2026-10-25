import type { ReactNode } from 'react';

type StatusPageProps = {
  /** «404», «500» — the big number above the title. */
  code: string;
  title: string;
  text: ReactNode;
  /** Buttons: stacked full width on phones, in a row from 1024px. */
  actions: ReactNode;
  /** Small mono line at the bottom, e.g. «код ошибки …». */
  footnote?: ReactNode;
  /** `alert` when something broke, `status` when the page just isn't there. */
  role: 'alert' | 'status';
};

/** Whole-page state from the «Системные» board: 404 and runtime errors. */
export function StatusPage({
  code,
  title,
  text,
  actions,
  footnote,
  role,
}: StatusPageProps) {
  return (
    <div
      role={role}
      className="mx-auto flex min-h-130 max-w-130 flex-col items-center
        justify-center gap-3 pt-10 pb-12 text-center lg:min-h-140 lg:pt-18 lg:pb-24"
    >
      <span
        aria-hidden="true"
        className="text-[4.5rem] leading-none font-bold tracking-[-0.04em]
          text-primary/85 lg:text-[7rem]"
      >
        {code}
      </span>
      <h1
        className="mt-2 text-[1.375rem]/7 font-semibold tracking-[-0.01em]
          text-balance lg:text-[1.75rem]/9"
      >
        {title}
      </h1>
      <p className="max-w-110 text-[0.9375rem]/5.5 text-pretty text-muted-foreground">
        {text}
      </p>
      <div className="mt-3 flex w-full flex-col gap-2 lg:w-auto lg:flex-row">
        {actions}
      </div>
      {footnote && (
        <p className="mt-3 font-mono text-caption text-muted-foreground">
          {footnote}
        </p>
      )}
    </div>
  );
}
