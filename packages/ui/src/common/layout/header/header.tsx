import { type ReactNode, Suspense } from 'react';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';
import { AuthMenu } from '../auth-menu';
import { type ISidebarItem, Sidebar } from '../sidebar';

export function Header({
  sidebarItems,
  pathnamesNoSidebar,
  className,
  children,
  isHideAuthMenu = false,
}: {
  sidebarItems?: ISidebarItem[];
  pathnamesNoSidebar?: string[];
  className?: string;
  isHideAuthMenu?: boolean;
  children?: ReactNode;
}) {
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
      {!isHideAuthMenu && (
        <Suspense fallback={<Skeleton className="h-10 w-10" />}>
          <AuthMenu />
        </Suspense>
      )}
    </header>
  );
}
