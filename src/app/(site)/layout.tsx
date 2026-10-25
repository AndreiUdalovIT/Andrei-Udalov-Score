import { SiteShell } from '@/components/layout/site-shell';

// Shell shared by every site page. `/dev/kit` lives outside the `(site)` group,
// so the showcase stays without a header; the group name never reaches the URL.
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return <SiteShell>{children}</SiteShell>;
}
