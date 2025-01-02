import type { IProtectedRoutes } from '@oe/core/utils/routes';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import type { ReactNode } from 'react';
import { cn } from '#utils/cn';

export function DashboardMainPageLayout({
  children,
  breadcrumbs,
  title,
  header,
  dashboard,
  className,
  mainClassName,
}: {
  children: ReactNode;
  breadcrumbs?: { label: string; disabled?: boolean }[];
  title?: ReactNode;
  header?: ReactNode;
  dashboard?: IProtectedRoutes;
  className?: string;
  mainClassName?: string;
}) {
  return (
    <>
      <DashboardHeaderCard breadcrumbs={breadcrumbs} dashboard={dashboard} className={className}>
        {header ? header : <h1 className="mb-4 text-2xl">{title}</h1>}
      </DashboardHeaderCard>
      <div className="flex-1 overflow-hidden rounded bg-background p-4">
        <div className={cn('scrollbar h-full overflow-auto', mainClassName)}>{children}</div>
      </div>
    </>
  );
}
