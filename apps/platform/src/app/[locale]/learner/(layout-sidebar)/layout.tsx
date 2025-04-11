import { LearnerLayout } from "@oe/dashboard";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <LearnerLayout>{children}</LearnerLayout>;
}
