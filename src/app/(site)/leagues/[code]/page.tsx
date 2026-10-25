import type { Metadata } from 'next';
import { Trophy } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Лига' };

export default function LeaguePage() {
  return <ComingSoon title="Лига" icon={Trophy} stage={3} />;
}
