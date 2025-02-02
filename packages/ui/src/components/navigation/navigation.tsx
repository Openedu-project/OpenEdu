'use client';

import { ScrollArea, ScrollBar } from '@oe/ui/shadcn/scroll-area';
import { usePathname } from 'next/navigation';
import type { JSX } from 'react';
import type React from 'react';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';

interface INavItem {
  title: string;
  href: string;
  icon?: JSX.Element;
}

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'medium' | 'large';
  data: INavItem[];
  classNameScrollArea?: string;
}

export function Navigation({ className, data, size = 'medium', classNameScrollArea, ...props }: NavProps) {
  const pathname = usePathname();

  const getMatchScore = (itemHref: string) => {
    const cleanPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const cleanItemHref = itemHref.startsWith('/') ? itemHref.slice(1) : itemHref;

    const pathnameSegments = cleanPathname.split('/');
    const itemSegments = cleanItemHref.split('/');

    const lastPathSegment = pathnameSegments[pathnameSegments.length - 1];
    const lastItemSegment = itemSegments[itemSegments.length - 1];

    return lastPathSegment === lastItemSegment ? itemSegments.length : 0;
  };

  const activeItem = data?.reduce((best, current) => {
    const currentScore = getMatchScore(current.href);
    const bestScore = getMatchScore(best?.href ?? '#');

    return currentScore > bestScore ? current : best;
  }, data[0]);

  return (
    <div className="relative w-full">
      <ScrollArea className={cn('max-w-full', classNameScrollArea)}>
        <div className={cn('flex items-center', className)} {...props}>
          {data.map(item => {
            // const isActive = pathname?.includes(item.href) || (index === 0 && pathname === '/');
            const isActive = item.href === activeItem?.href;

            return (
              <div
                key={item.href}
                className={cn(
                  isActive && size === 'medium' && 'border-primary border-b',
                  size === 'medium' ? 'mr-3 pb-4' : 'mr-6 flex-1',
                  'last:mr-0'
                )}
              >
                <Link
                  href={item?.href ?? '#'}
                  className={cn(
                    'mbutton-semibold16 flex h-auto items-center justify-center gap-2 rounded-2 px-2 py-2 text-center transition-colors hover:text-primary',
                    isActive
                      ? '!text-primary border border-primary bg-muted font-medium [&>svg>path]:fill-primary'
                      : '!text-[#2c2c2c] border-none',
                    size === 'large' && 'flex-col'
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
