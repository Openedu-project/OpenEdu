import { AILayout } from '@oe/ui/common/layout/ai-layout';

import type { ReactNode } from 'react';

export default function AIAssistantLayout({ children }: { children: ReactNode }) {
  return <AILayout className="md:h-[calc(100vh-var(--header-sub-item-height))]">{children}</AILayout>;
}
