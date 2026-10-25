import type { Metadata } from 'next';
import { Swords } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Матч' };

export default function MatchPage() {
  return <ComingSoon title="Матч" icon={Swords} stage={3} />;
}
