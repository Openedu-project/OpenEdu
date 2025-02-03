import { AILayout } from '@oe/ui/common/layout/ai-layout';

import type { ReactNode } from 'react';

export default function AIAssistantLayout({ children }: { children: ReactNode }) {
  return <AILayout>{children}</AILayout>;
}
