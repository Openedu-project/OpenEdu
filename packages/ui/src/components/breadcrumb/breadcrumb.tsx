'use client';

import type { IProtectedRoutes } from '@oe/core';
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
  ShadcnBreadcrumb,
} from '#shadcn/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';

export interface IBreadcrumbItem {
  label: string;
  disabled?: boolean;
  path?: string;
}

interface BreadcrumbProps {
  items?: IBreadcrumbItem[];
  dashboard?: IProtectedRoutes;
  className?: string;
}

export function Breadcrumb({ items = [], dashboard, className }: BreadcrumbProps) {
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

    if (items.length <= maxVisibleItems) {
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
          {items.length > 0 && <BreadcrumbSeparator />}
          {items.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Fragment key={index}>
              <BreadcrumbItem className={cn('shrink-0 overflow-hidden', index === pathSegments.length - 2 && 'shrink')}>
                {index === items.length - 1 ? (
                  <BreadcrumbPage className="truncate font-medium text-primary">
                    {item?.label || pathSegments[index + 1]}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className={cn(
                        'p-0 font-medium text-foreground/50',
                        items[index]?.disabled && 'pointer-events-none'
                      )}
                      activeClassName="border-0"
                      href={item.path ?? `/${pathSegments.slice(0, index + 2).join('/')}`}
                    >
                      {item?.label || pathSegments[index + 1]}
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
          ...items.slice(-2).map((item, index) => ({
            index: index,
            label: item.label,
            href: item.path ?? `/${pathSegments.slice(0, pathSegments.length - 2 + index + 1).join('/')}`,
          })),
        ]
      : [
          { index: -1, label: <HomeIcon className="h-4 w-4" />, href: '/' },
          ...items.slice(-3).map((item, index) => ({
            index: index,
            label: item.label,
            href: item.path ?? `/${pathSegments.slice(0, pathSegments.length - 3 + index + 1).join('/')}`,
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
                {index === 0 && items.length > maxVisibleItems && (
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {items.slice(0, -maxVisibleItems + 1).map((item, dropdownIndex) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <DropdownMenuItem key={dropdownIndex}>
                            <BreadcrumbLink asChild className={item?.disabled ? 'pointer-events-none' : ''}>
                              <Link
                                className="p-0 font-medium text-foreground/50"
                                activeClassName="border-0"
                                href={`/${pathSegments.slice(0, dropdownIndex + 2).join('/')}`}
                              >
                                {item.label}
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
    <ShadcnBreadcrumb>
      <BreadcrumbList className={cn('flex-nowrap', className)}>{renderBreadcrumbItems()}</BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
