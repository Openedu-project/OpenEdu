'use client';
import { HomeIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from '#common/navigation';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as UIBreadcrumb,
} from '#shadcn/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';

export interface IBreadcrumbWithPathItem {
  label: string;
  disabled?: boolean;
  path?: string;
}

interface BreadcrumbProps {
  items?: IBreadcrumbWithPathItem[];
  homePath?: string;
}

export function BreadcrumbWithPath({ items = [], homePath }: BreadcrumbProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderBreadcrumbItems = () => {
    const maxVisibleItems = isMobile ? 3 : 4;
    if (items.length <= maxVisibleItems) {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="p-0 font-medium text-foreground/50"
                activeClassName="border-0"
                href={homePath ? `/${homePath}` : '/'}
              >
                <HomeIcon className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.length > 0 && <BreadcrumbSeparator />}
          {items.map((segment, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Fragment key={index}>
              <BreadcrumbItem className={cn('shrink-0 overflow-hidden', index === items.length - 2 && 'shrink')}>
                {index === items.length - 1 ? (
                  <BreadcrumbPage className="truncate font-medium text-primary">{segment.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className={cn('p-0 font-medium text-foreground/50', segment.disabled && 'pointer-events-none')}
                      activeClassName="border-0"
                      href={segment.path ?? '/'}
                    >
                      {segment.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </>
      );
    }

    const visibleItems = isMobile
      ? [
          { index: -1, label: <HomeIcon className="h-4 w-4" />, href: '/' },
          ...items.slice(-2).map((segment, index) => ({
            index: index,
            label: segment.label,
            href: segment.path,
          })),
        ]
      : [
          { index: -1, label: <HomeIcon className="h-4 w-4" />, href: '/' },
          ...items.slice(-3).map((segment, index) => ({
            index: index,
            label: segment.label,
            href: segment.path,
          })),
        ];

    return (
      <>
        {visibleItems.map((item, index) => (
          <Fragment key={item.index}>
            <BreadcrumbItem className="overflow-hidden">
              {index === visibleItems.length - 1 ? (
                <BreadcrumbPage className="truncate font-medium text-primary">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className={item.index >= 0 && items[item.index]?.disabled ? 'pointer-events-none' : ''}
                >
                  <Link
                    className="p-0 font-medium text-foreground/50"
                    activeClassName="border-0"
                    href={item.href ?? '/'}
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== visibleItems.length - 1 && (
              <>
                <BreadcrumbSeparator />
                {index === 0 && items.length > maxVisibleItems && (
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {items.slice(1, -maxVisibleItems + 1).map((segment, dropdownIndex) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <DropdownMenuItem key={dropdownIndex}>
                            <BreadcrumbLink
                              asChild
                              className={items[dropdownIndex]?.disabled ? 'pointer-events-none' : ''}
                            >
                              <Link
                                className="p-0 font-medium text-foreground/50"
                                activeClassName="border-0"
                                href={segment.path ?? '/'}
                              >
                                {segment.label}
                              </Link>
                            </BreadcrumbLink>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                )}
              </>
            )}
          </Fragment>
        ))}
      </>
    );
  };

  return (
    <UIBreadcrumb>
      <BreadcrumbList className="flex-nowrap">{renderBreadcrumbItems()}</BreadcrumbList>
    </UIBreadcrumb>
  );
}
