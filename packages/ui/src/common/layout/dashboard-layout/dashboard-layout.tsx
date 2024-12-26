import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import type { ReactNode } from 'react';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';
import { Header } from '../header';
import { Sidebar, type SidebarItem } from '../sidebar';

export function DashboardLayout({
  children,
  sidebarItems,
  className,
}: {
  children: ReactNode;
  sidebarItems?: SidebarItem[];
  className?: string;
}) {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header sidebarItems={sidebarItems}>
        <Link
          href={PLATFORM_ROUTES.homepage}
          className="p-0 hover:bg-transparent"
          variant="ghost"
          activeClassName="border-0"
        >
          <HeaderLogo className="w-[115px] md:w-[172px]" />
        </Link>
      </Header>
      <main className="flex flex-1 overflow-hidden bg-muted">
        {sidebarItems && <Sidebar items={sidebarItems} maxDepth={2} className="hidden md:flex" />}
        <div className={cn('scrollbar flex w-full flex-col overflow-y-auto', className)}>{children}</div>
      </main>
    </div>
  );
}
