import { AIChatLayout } from "@oe/ui";

import type { ReactNode } from "react";

export default function AILayout({ children }: { children: ReactNode }) {
  return (
    <AIChatLayout agent="ai_search" className="h-full">
      {children}
    </AIChatLayout>
  );
}
