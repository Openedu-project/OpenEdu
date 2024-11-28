import { Header } from '@oe/ui/common/layout/header';
import type { ReactNode } from 'react';
import ThemeHeaderContent from './_components/theme-header-content';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header className="fixed top-0 z-50 h-16 supports-[backdrop-filter]:bg-background" isHideAuthMenu>
        <ThemeHeaderContent />
      </Header>

      <div className="flex flex-1 pt-14">
        <div className="fixed top-14 bottom-0 left-0">aside</div>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
