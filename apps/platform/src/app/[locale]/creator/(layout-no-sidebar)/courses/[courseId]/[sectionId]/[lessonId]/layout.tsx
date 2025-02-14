import { LessonsLayout } from "@oe/dashboard/creator/courses/course-detail/outline/lessons/layout";
import type { ReactNode } from "react";

export default function LessonPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LessonsLayout>{children}</LessonsLayout>;
}
