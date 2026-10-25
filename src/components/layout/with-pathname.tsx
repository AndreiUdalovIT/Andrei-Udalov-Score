'use client';

import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

/**
 * Feeds the current path to a navigation view, with a highlight-free fallback.
 *
 * With Cache Components, `usePathname` suspends on routes whose dynamic params
 * are unknown at build time (`/leagues/[code]`, `/matches/[id]`…), and the build
 * fails without a `<Suspense>` around it. The fallback renders the same view with
 * `pathname: null` — the links without the active highlight — so the static
 * shell still contains the whole navigation. Static routes resolve the path at
 * build time and never show the fallback.
 */
export function withPathname<P extends object>(
  View: (props: P & { pathname: string | null }) => ReactNode,
) {
  function WithActivePath(props: P) {
    return <View {...props} pathname={usePathname()} />;
  }

  return function NavWithPathname(props: P) {
    return (
      <Suspense fallback={<View {...props} pathname={null} />}>
        <WithActivePath {...props} />
      </Suspense>
    );
  };
}
