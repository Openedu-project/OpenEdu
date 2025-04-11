import { AILayout } from "@oe/ui";

import type { ReactNode } from "react";
import OpeneduLayout from "../../(web)/layout";

export default function AIAssistantLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OpeneduLayout hasFooter={false}>
      <AILayout>{children}</AILayout>
    </OpeneduLayout>
  );
}
