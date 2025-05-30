'use client';
import OpeneduLogo from '@oe/assets/images/logo-openedu-2.png';
import { ChevronLeftCircle, ChevronRightCircle, Menu } from 'lucide-react';
import { type FC, useState } from 'react';
import { usePathname } from '#common/navigation';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#shadcn/sheet';
import { cn } from '#utils/cn';
import { SidebarItem } from './sidebar-item';
import type { ISidebarProps } from './types';

export const Sidebar: FC<ISidebarProps> = ({
  items,
  maxDepth = 2,
  pathnamesNoSidebar = [],
  className,
  isDrawer,
  isLoggedIn,
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const noSidebar = pathnamesNoSidebar?.some(path => pathname.includes(path));

  if (noSidebar) {
    return null;
  }

  const renderSidebar = () => {
    return (
      <aside
        className={cn(
          'scrollbar relative flex flex-col justify-around overflow-auto border-r bg-background transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16 min-w-16' : 'w-64 min-w-64',
          className
        )}
      >
        <nav className="flex-1 p-2">
          <ul className="space-y-2">
            {items.map(item => {
              return (
                <SidebarItem
                  key={item.id}
                  item={item}
                  depth={0}
                  maxDepth={maxDepth}
                  pathname={pathname}
                  disabled={item.isLoginRequired && !isLoggedIn}
                  isCollapsed={isCollapsed}
                  onNavigate={isDrawer ? () => setOpen(false) : undefined}
                />
              );
            })}
          </ul>
        </nav>

        {/* Collapse button at bottom */}
        <div className="sticky bottom-0 border-t bg-background p-2">
          <Button
            variant="ghost"
            size="icon"
            className="flex h-8 w-full items-center justify-center hover:bg-accent"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setOpen(isCollapsed);
            }}
          >
            {isCollapsed ? <ChevronRightCircle className="h-5 w-5" /> : <ChevronLeftCircle className="h-5 w-5" />}
          </Button>
        </div>
      </aside>
    );
  };

  return isDrawer ? (
    <Sheet
      open={open}
      onOpenChange={open => {
        setOpen(open);
        setIsCollapsed(!open);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2 hover:bg-transparent hover:opacity-80 md:hidden">
          <Menu className="h-5 w-5 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex h-dvh flex-col gap-0 overflow-hidden p-0">
        <SheetHeader className="sticky h-14 space-y-0 border-b">
          <SheetTitle className="mb-0 flex items-center p-4">
            <div className="mr-auto w-[115px] md:w-[172px]">
              <Image src={OpeneduLogo.src} alt="OpenEdu" width={172} height={40} />
            </div>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        {renderSidebar()}
      </SheetContent>
    </Sheet>
  ) : (
    renderSidebar()
  );
};
