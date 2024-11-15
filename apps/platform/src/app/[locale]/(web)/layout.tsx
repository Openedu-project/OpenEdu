import { MainLayout } from '@oe/ui/common/layout';

import type { ReactNode } from 'react';

export default function OpeneduLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
