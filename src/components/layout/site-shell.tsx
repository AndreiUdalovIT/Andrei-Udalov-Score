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
      <Header />
      <main id="content" className="mx-auto w-full max-w-7xl flex-1 px-4 lg:px-8">
        {children}
      </main>
      <Footer />
      <BottomTabBar />
    </>
  );
}
