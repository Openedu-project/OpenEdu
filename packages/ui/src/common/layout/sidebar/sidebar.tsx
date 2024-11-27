'use client';

import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { ChevronDown, ChevronLeftCircle, ChevronRight, ChevronRightCircle, Menu } from 'lucide-react';
import { type FC, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Link, usePathname } from '#common/navigation';
import { Button } from '#shadcn/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#shadcn/sheet';
import { cn } from '#utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  items?: SidebarItem[];
  icon?: ReactNode;
  isRoot?: boolean;
}

interface SidebarItemProps {
  item: SidebarItem;
  depth: number;
  maxDepth: number;
  pathname: string;
  isCollapsed: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  maxDepth?: number;
  pathnamesNoSidebar?: string[];
  className?: string;
  isDrawer?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ item, depth, maxDepth, pathname, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0 && depth < maxDepth;
  const contentRef = useRef<HTMLDivElement>(null);

  const isAncestorActive = useMemo(() => {
    if (!hasChildren) {
      return false;
    }

    const checkActive = (items: SidebarItem[]): boolean => {
      return items.some(subItem => {
        const isCurrentActive = subItem.isRoot ? subItem.href === pathname : pathname.includes(subItem.href as string);

        if (isCurrentActive) {
          return true;
        }

        if (subItem.items && subItem.items.length > 0) {
          return checkActive(subItem.items);
        }

        return false;
      });
    };
    return checkActive(item.items || []);
  }, [hasChildren, item.items, pathname]);

  useEffect(() => {
    if (isAncestorActive) {
      setIsOpen(true);
    }
  }, [isAncestorActive]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  const handleItemClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const ButtonContent = () => (
    <>
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!isCollapsed && item.label && <span className="truncate">{item.label}</span>}
      {!isCollapsed &&
        hasChildren &&
        (isOpen ? (
          <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
        ) : (
          <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
        ))}
    </>
  );

  return (
    <li>
      {item.href ? (
        <Link
          href={item.href}
          variant="ghost"
          className={cn(
            'w-full justify-start gap-4 px-2 font-normal hover:text-primary',
            isCollapsed && 'justify-center'
          )}
          exact={item.isRoot}
          style={{
            paddingLeft: isCollapsed ? '0.5rem' : `${depth * 1 + 0.5}rem`,
          }}
        >
          <ButtonContent />
          {isCollapsed && item.label && (
            <div className="absolute left-full ml-2 hidden rounded-md bg-secondary px-2 py-1 group-hover:block">
              {item.label}
            </div>
          )}
        </Link>
      ) : (
        <Button
          variant="ghost"
          className={cn(
            'group relative flex w-full justify-start gap-4 px-2 font-normal hover:text-primary',
            isAncestorActive && 'text-primary',
            isCollapsed && 'justify-center'
          )}
          style={{
            paddingLeft: isCollapsed ? '0.5rem' : `${depth * 1 + 0.5}rem`,
          }}
          onClick={handleItemClick}
        >
          <ButtonContent />
          {isCollapsed && item.label && (
            <div className="absolute left-full ml-2 hidden rounded-md bg-secondary px-2 py-1 group-hover:block">
              {item.label}
            </div>
          )}
        </Button>
      )}

      {hasChildren && !isCollapsed && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: 0 }}
        >
          <ul className="mt-2 space-y-2">
            {item.items?.map(subItem => (
              <SidebarItem
                key={subItem.id}
                item={subItem}
                depth={depth + 1}
                maxDepth={maxDepth}
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export const Sidebar: FC<SidebarProps> = ({ items, maxDepth = 2, pathnamesNoSidebar = [], className, isDrawer }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
<<<<<<< HEAD

  const noSidebar = pathnamesNoSidebar?.some(path => pathname.includes(path));
=======
  const noSidebar = pathnamesNoSidebar.includes(pathname);
>>>>>>> 497b945 (feat: add collapse sidebar fe#2)

  if (noSidebar) {
    return null;
  }

  const renderSidebar = () => (
    <aside
      className={cn(
        'scrollbar relative flex flex-col justify-around border-r bg-background transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {items.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              depth={0}
              maxDepth={maxDepth}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>

      {/* Collapse button at bottom */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex h-8 w-full items-center justify-center hover:bg-accent"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRightCircle className="h-5 w-5" /> : <ChevronLeftCircle className="h-5 w-5" />}
        </Button>
      </div>
    </aside>
  );

  return isDrawer ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex h-dvh flex-col gap-0 overflow-hidden p-0">
        <SheetHeader className="sticky h-14 space-y-0 border-b">
          <SheetTitle className="mb-0 flex items-center p-4">
            <HeaderLogo className="w-[115px] md:w-[172px]" />
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
