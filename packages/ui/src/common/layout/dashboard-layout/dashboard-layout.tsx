import { HeaderLogo } from '@oe/assets/icons/header-logo';
import type { ReactNode } from 'react';
import { Header } from '../header';
import { Sidebar, type SidebarItem } from '../sidebar';

export function DashboardLayout({
  children,
  sidebarItems,
  pathnamesNoSidebar = [],
}: {
  children: ReactNode;
  sidebarItems?: SidebarItem[];
  pathnamesNoSidebar?: string[];
}) {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header sidebarItems={sidebarItems} pathnamesNoSidebar={pathnamesNoSidebar}>
        <HeaderLogo className="w-[115px] md:w-[172px]" />
      </Header>
      <main className="flex flex-1 overflow-hidden bg-muted">
        {sidebarItems && (
          <Sidebar
            items={sidebarItems}
            maxDepth={2}
            pathnamesNoSidebar={pathnamesNoSidebar}
            className="hidden md:flex"
          />
        )}
        <div className="scrollbar flex w-full flex-col overflow-y-auto p-4 pt-0">{children}</div>
      </main>
    </div>
  );
}
