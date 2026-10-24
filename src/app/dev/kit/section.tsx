import type { ReactNode } from 'react';

export function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-h2">{title}</h2>
        {note && <p className="text-caption text-muted-foreground">{note}</p>}
      </div>
      <div className="rounded-lg border border-border bg-card p-5">{children}</div>
    </section>
  );
}

/** A labelled row of examples inside a section. */
export function Demo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
