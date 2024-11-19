import type { ReactNode } from 'react';
import { Breadcrumb } from '#components/breadcrumb';
import type { IBreadcrumbItem } from '#components/breadcrumb';
import { cn } from '#utils/cn';

export function DashboardHeaderCard({
  children,
  breadcrumbs = [],
  className,
}: { children?: ReactNode; breadcrumbs?: IBreadcrumbItem[]; className?: string }) {
  return (
    <div className={cn('mb-4 rounded-b bg-background p-4', className)}>
      <Breadcrumb items={breadcrumbs} />
      {children}
    </div>
  );
}
