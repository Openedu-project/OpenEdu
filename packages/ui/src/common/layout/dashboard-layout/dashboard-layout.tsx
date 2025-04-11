import OpeneduLogo from '@oe/assets/images/logo-openedu.png';
import { PLATFORM_ROUTES } from '@oe/core';
import type { ReactNode } from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { cn } from '#utils/cn';
import { Header } from '../header';
import { type ISidebarItem, LayoutSidebar } from '../sidebar';

export function DashboardLayout({
  children,
  sidebarItems,
  className,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
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
          <div className="w-[115px] min-w-[115px] md:w-[172px]">
            <Image src={OpeneduLogo.src} alt="OpenEdu" width={172} height={40} priority />
          </div>
        </Link>
      </Header>
      <main className="flex flex-1 overflow-hidden bg-muted">
        {sidebarItems && <LayoutSidebar items={sidebarItems} maxDepth={2} className="hidden md:flex" />}
        <div className={cn('scrollbar flex w-full flex-col overflow-y-auto', className)}>{children}</div>
      </main>
    </div>
  );
}
