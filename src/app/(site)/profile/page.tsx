import type { Metadata } from 'next';
import { User } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Профиль' };

export default function ProfilePage() {
  return <ComingSoon title="Профиль" icon={User} stage={5} />;
}
