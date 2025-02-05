import { AILayout } from '@oe/ui/common/layout/ai-layout';

import type { ReactNode } from 'react';

export default function AIAssistantLayout({ children }: { children: ReactNode }) {
  return <AILayout className="lg:h-[calc(100vh-var(--header-with-sub-item-height))]">{children}</AILayout>;
}
