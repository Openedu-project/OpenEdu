// 'use client';

import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import type { ReactNode } from 'react';
import { cn } from '#utils/cn';

interface CourseLinkWrapperProps {
  children: ReactNode;
  slug: string;
  domain?: string;
  className?: string;
}

export function CourseLinkWrapper({ children, slug, domain, className }: CourseLinkWrapperProps) {
  const courseUrl = PLATFORM_ROUTES.courseDetail.replace(':slug', slug);
  const isExternalDomain = typeof window !== 'undefined' && domain && domain !== window.location.hostname;

  if (isExternalDomain) {
    return (
      <Link
        href={courseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('h-full w-full p-0 hover:no-underline', className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={courseUrl} className={cn('h-full w-full p-0 hover:no-underline', className)}>
      {children}
    </Link>
  );
}
