import { CourseDetailLayout } from "@oe/dashboard";
import type { ReactNode } from "react";

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CourseDetailLayout>{children}</CourseDetailLayout>
    </>
  );
}
