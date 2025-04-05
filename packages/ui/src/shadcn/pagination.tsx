import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import type { ComponentProps } from 'react';
import { cn } from '#utils/cn';
import { type ButtonProps, buttonVariants } from './button';

function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="pagination"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...props} />;
}

function PaginationItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="pagination-item" className={cn('', className)} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  ComponentProps<'a'>;

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <a
      data-slot="pagination-link"
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'cursor-pointer',
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      size="default"
      className={cn('h-8 w-8 p-0', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      {/* <span>Previous</span> */}
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-next"
      aria-label="Go to next page"
      size="default"
      className={cn('h-8 w-8 p-0', className)}
      {...props}
    >
      {/* <span>Next</span> */}
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn('flex h-8 w-8 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      {/* <span className="sr-only">More pages</span> */}
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
