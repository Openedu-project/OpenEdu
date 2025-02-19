import { AILayout } from '@oe/ui/common/layout/ai-layout';

import type { ReactNode } from 'react';
import OpeneduLayout from '../../(web)/layout';

export default function AIAssistantLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OpeneduLayout hasFooter={false}>
      <AILayout className="lg:h-[calc(100dvh-var(--header-with-sub-item-height))]">{children}</AILayout>
    </OpeneduLayout>
  );
}
