import type { IProtectedRoutes } from '@oe/core/utils/routes';
import type { ReactNode } from 'react';
import { Breadcrumb } from '#components/breadcrumb';
import type { IBreadcrumbItem } from '#components/breadcrumb';
import { cn } from '#utils/cn';

export function DashboardHeaderCard({
  children,
  breadcrumbs = [],
  dashboard,
  className,
}: { children?: ReactNode; breadcrumbs?: IBreadcrumbItem[]; dashboard?: IProtectedRoutes; className?: string }) {
  return (
    <div className={cn('mb-4 rounded-b bg-background px-4 py-2', className)}>
      <Breadcrumb items={breadcrumbs} dashboard={dashboard} />
      {children}
    </div>
  );
}
