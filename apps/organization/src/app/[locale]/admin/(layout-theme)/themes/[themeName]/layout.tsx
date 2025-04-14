import { ThemeLayout } from "@oe/themes";
import type { ReactNode } from "react";

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <ThemeLayout>
      {children}
      {modal}
    </ThemeLayout>
  );
}
