import ThemeLayout from "@oe/themes/common/layout/theme-layout";
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
