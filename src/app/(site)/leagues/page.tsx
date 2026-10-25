import { redirect } from 'next/navigation';

// «Лиги» opens a league right away; later — the last one the visitor viewed.
export default function LeaguesPage() {
  redirect('/leagues/pl');
}
