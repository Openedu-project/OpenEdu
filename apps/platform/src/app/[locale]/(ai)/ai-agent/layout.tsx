import { AILayout } from "@oe/ui";

import type { ReactNode } from "react";
import OpeneduLayout from "../../(web)/layout";

export default function AIAssistantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <OpeneduLayout hasFooter={false} params={params}>
      <AILayout>{children}</AILayout>
    </OpeneduLayout>
  );
}
