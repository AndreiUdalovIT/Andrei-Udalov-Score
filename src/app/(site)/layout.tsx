import { Header } from '@/components/layout/header';

// Shell shared by every site page. `/dev/kit` lives outside the `(site)` group,
// so the showcase stays without a header; the group name never reaches the URL.
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      <main id="content" className="mx-auto w-full max-w-7xl flex-1 px-4 lg:px-8">
        {children}
      </main>
    </>
  );
}
