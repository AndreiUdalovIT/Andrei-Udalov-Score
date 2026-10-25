import type { ReactNode } from 'react';

import { BottomTabBar } from './bottom-tab-bar';
import { Footer } from './footer';
import { Header } from './header';

/**
 * Header, content, footer and the mobile tab bar. Shared by the `(site)` layout
 * and the root 404 page, which renders outside that group.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* First stop for the keyboard: skips the header straight to the content.
          Padding sits under `focus:` too, since `not-sr-only` resets it. */}
      <a
        href="#content"
        className="sr-only z-50 rounded-md bg-primary font-semibold
          text-primary-foreground focus:not-sr-only focus:fixed focus:top-2
          focus:left-2 focus:px-4 focus:py-2"
      >
        Перейти к содержимому
      </a>
      <Header />
      {/* `tabIndex={-1}` lets the skip link move focus here, not just scroll. */}
      <main
        id="content"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl flex-1 px-4 outline-none lg:px-8"
      >
        {children}
      </main>
      <Footer />
      <BottomTabBar />
    </>
  );
}
