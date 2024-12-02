'use client';

import type { IProtectedRoutes } from '@oe/core/utils/routes';
import { HomeIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { Link, usePathname } from '#common/navigation';
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

export interface IBreadcrumbItem {
  label: string;
  disabled?: boolean;
}

interface BreadcrumbProps {
  items?: IBreadcrumbItem[];
  dashboard?: IProtectedRoutes;
}

export function Breadcrumb({ items = [], dashboard }: BreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderBreadcrumbItems = () => {
    const maxVisibleItems = isMobile ? 3 : 4;

    if (pathSegments.length <= maxVisibleItems) {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="p-0 font-medium text-foreground/50"
                activeClassName="border-0"
                href={dashboard ? `/${dashboard}` : '/'}
              >
                <HomeIcon className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.length > 0 && <BreadcrumbSeparator />}
          {pathSegments.slice(1).map((segment, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Fragment key={index}>
              <BreadcrumbItem className={cn('shrink-0 overflow-hidden', index === pathSegments.length - 2 && 'shrink')}>
                {index === pathSegments.length - 2 ? (
                  <BreadcrumbPage className="truncate font-medium text-primary">
                    {items[index]?.label || segment}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className={cn(
                        'p-0 font-medium text-foreground/50',
                        items[index]?.disabled && 'pointer-events-none'
                      )}
                      activeClassName="border-0"
                      href={`/${pathSegments.slice(0, index + 2).join('/')}`}
                    >
                      {items[index]?.label || segment}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== pathSegments.length - 2 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </>
      );
    }

    const visibleItems = isMobile
      ? [
          { index: -1, label: <HomeIcon className="h-4 w-4" />, href: '/' },
          ...pathSegments.slice(-2).map((segment, index) => ({
            index: pathSegments.length - 2 + index - 1,
            label: items[pathSegments.length - 2 + index - 1]?.label || segment,
            href: `/${pathSegments.slice(0, pathSegments.length - 2 + index + 1).join('/')}`,
          })),
        ]
      : [
          { index: -1, label: <HomeIcon className="h-4 w-4" />, href: '/' },
          ...pathSegments.slice(-3).map((segment, index) => ({
            index: pathSegments.length - 3 + index - 1,
            label: items[pathSegments.length - 3 + index - 1]?.label || segment,
            href: `/${pathSegments.slice(0, pathSegments.length - 3 + index + 1).join('/')}`,
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
                  <Link className="p-0 font-medium text-foreground/50" activeClassName="border-0" href={item.href}>
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== visibleItems.length - 1 && (
              <>
                <BreadcrumbSeparator />
                {index === 0 && pathSegments.length > maxVisibleItems && (
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {pathSegments.slice(1, -maxVisibleItems + 1).map((segment, dropdownIndex) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <DropdownMenuItem key={dropdownIndex}>
                            <BreadcrumbLink
                              asChild
                              className={items[dropdownIndex]?.disabled ? 'pointer-events-none' : ''}
                            >
                              <Link
                                className="p-0 font-medium text-foreground/50"
                                activeClassName="border-0"
                                href={`/${pathSegments.slice(0, dropdownIndex + 2).join('/')}`}
                              >
                                {items[dropdownIndex]?.label || segment}
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
