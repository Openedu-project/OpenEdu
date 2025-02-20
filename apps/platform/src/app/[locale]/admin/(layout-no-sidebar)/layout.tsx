import AdminLayoutNoSidebar from "@oe/dashboard/admin/layout-no-sidebar";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayoutNoSidebar>{children}</AdminLayoutNoSidebar>;
}
