'use client';

import type { IProtectedRoutes } from '@oe/core/utils/routes';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { Breadcrumb } from '#components/breadcrumb';
import type { IBreadcrumbItem } from '#components/breadcrumb';
import { cn } from '#utils/cn';

import { createContext, useContext, useEffect, useState } from 'react';

// Tạo context
interface DashboardHeaderCardContextType {
  breadcrumbs: IBreadcrumbItem[];
  setBreadcrumbs: Dispatch<SetStateAction<IBreadcrumbItem[]>>;
}

const DashboardHeaderCardContext = createContext<DashboardHeaderCardContextType | undefined>(undefined);

// Hook để sử dụng context
export function useDashboardHeaderCard() {
  const context = useContext(DashboardHeaderCardContext);
  if (!context) {
    throw new Error('useDashboardHeaderCard must be used within a DashboardHeaderCardProvider');
  }
  return context;
}

// Cập nhật component DashboardHeaderCard
export function DashboardHeaderCard({
  children,
  breadcrumbs: initialBreadcrumbs = [],
  dashboard,
  className,
}: {
  children?: ReactNode;
  breadcrumbs?: IBreadcrumbItem[];
  dashboard?: IProtectedRoutes;
  className?: string;
}) {
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);

  useEffect(() => {
    if (initialBreadcrumbs.length > 0) {
      setBreadcrumbs(initialBreadcrumbs);
    }
  }, [initialBreadcrumbs]);

  return (
    <DashboardHeaderCardContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      <div className={cn('mb-4 rounded-b bg-background px-4 py-2', className)}>
        {breadcrumbs?.length > 0 && <Breadcrumb items={breadcrumbs} dashboard={dashboard} />}
        {children}
      </div>
    </DashboardHeaderCardContext.Provider>
  );
}

interface UpdateBreadcrumbProps {
  index: number;
  label: string;
}

function UpdateBreadcrumb({ index, label }: UpdateBreadcrumbProps) {
  const { setBreadcrumbs } = useDashboardHeaderCard();

  useEffect(() => {
    setBreadcrumbs(prev => {
      const newBreadcrumbs = [...prev];
      newBreadcrumbs[index] = { ...newBreadcrumbs[index], label };
      return newBreadcrumbs;
    });
  }, [label, index, setBreadcrumbs]);

  return null;
}

DashboardHeaderCard.UpdateBreadcrumb = UpdateBreadcrumb;
