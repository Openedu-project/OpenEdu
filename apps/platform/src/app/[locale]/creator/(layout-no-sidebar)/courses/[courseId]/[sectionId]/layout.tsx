import { SectionsLayout } from "@oe/dashboard";
import type { ReactNode } from "react";

export default function SectionPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SectionsLayout>{children}</SectionsLayout>;
}
