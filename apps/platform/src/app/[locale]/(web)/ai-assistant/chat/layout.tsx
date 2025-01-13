import { AIChatLayout } from '@oe/ui/common/layout/ai-layout';

import type { ReactNode } from 'react';

export default function AILayout({ children }: { children: ReactNode }) {
  return <AIChatLayout>{children}</AIChatLayout>;
}
