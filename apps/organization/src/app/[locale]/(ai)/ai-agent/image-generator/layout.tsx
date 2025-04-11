import { AIChatLayout } from "@oe/ui";

import type { ReactNode } from "react";

export default function AILayout({ children }: { children: ReactNode }) {
  return <AIChatLayout agent="ai_image_generate">{children}</AIChatLayout>;
}
