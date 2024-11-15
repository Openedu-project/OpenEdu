import type { ReactNode } from 'react';
import { cn } from '#utils/cn';
import { AuthMenu } from '../auth-menu';
import { Sidebar, type SidebarItem } from '../sidebar';

export function Header({
  sidebarItems,
  pathnamesNoSidebar,
  className,
  children,
}: { sidebarItems?: SidebarItem[]; pathnamesNoSidebar?: string[]; className?: string; children?: ReactNode }) {
  return (
    <header
      className={cn(
        'sticky top-0 left-0 z-50 flex h-14 w-full flex-shrink-0 items-center border-border/40 bg-background/95 px-3 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6',
        className
      )}
    >
      {sidebarItems && (
        <Sidebar
          items={sidebarItems}
          maxDepth={2}
          pathnamesNoSidebar={pathnamesNoSidebar}
          className="w-full flex-1"
          isDrawer
        />
      )}
      {children}
      <AuthMenu />
    </header>
  );
}
