import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Команда' };

export default function TeamPage() {
  return <ComingSoon title="Команда" icon={Shield} stage={4} />;
}
