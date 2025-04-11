import { LessonsLayout } from "@oe/dashboard";
import type { ReactNode } from "react";

export default function LessonPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LessonsLayout>{children}</LessonsLayout>;
}
