import { Header } from '@oe/ui/common/layout/header';

import { SidebarProvider, SidebarTrigger } from '@oe/ui/shadcn/sidebar';

import type { ReactNode } from 'react';
import ThemeHeaderContent from './_components/theme-header-content';
import ThemeSidebar from './_components/theme-sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header className="fixed top-0 z-50 h-16 supports-[backdrop-filter]:bg-background" isHideAuthMenu>
        <ThemeHeaderContent />
      </Header>

      <SidebarProvider>
        <ThemeSidebar />

        <main className="mt-2">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
