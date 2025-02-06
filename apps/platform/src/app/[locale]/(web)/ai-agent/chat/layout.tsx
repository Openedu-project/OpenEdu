import { AIChatLayout } from '@oe/ui/common/layout/ai-layout';

import type { ReactNode } from 'react';

export default function AILayout({ children }: { children: ReactNode }) {
  return <AIChatLayout className="lg:h-[calc(100vh-var(--header-with-sub-item-height))]">{children}</AIChatLayout>;
}
