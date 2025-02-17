import { Header } from "@oe/ui/common/layout/header";

import { SidebarProvider, SidebarTrigger } from "@oe/ui/shadcn/sidebar";

import ThemeHeaderContent from "@oe/themes/_components/theme-header/theme-header-content";
import type { ReactNode } from "react";
import OutlineThemeSidebar from "./outline-theme-sidebar";

export default function ThemeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-mute">
      <Header
        className="fixed top-0 z-50 h-[var(--header-height)] w-full supports-[backdrop-filter]:bg-background"
        isHideAuthMenu
      >
        <ThemeHeaderContent configKey={undefined} />
      </Header>

      <SidebarProvider className="p-0">
        <OutlineThemeSidebar />
        <main className="mt-[var(--header-height)] w-full overflow-hidden rounded-lg bg-background p-4 ">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
