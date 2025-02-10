import SectionsLayout from "@oe/dashboard/creator/courses/course-detail/outline/sections/layout";
import type { ReactNode } from "react";

export default function SectionPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SectionsLayout>{children}</SectionsLayout>;
}
