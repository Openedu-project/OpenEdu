import type { ReactNode } from 'react';
import { Breadcrumb } from '#components/breadcrumb';
import type { IBreadcrumbItem } from '#components/breadcrumb';

export function DashboardHeaderCard({
  children,
  breadcrumbs = [],
}: { children?: ReactNode; breadcrumbs?: IBreadcrumbItem[] }) {
  return (
    <div className="mb-4 rounded-b bg-background p-4">
      <Breadcrumb items={breadcrumbs} />
      {children}
    </div>
  );
}
