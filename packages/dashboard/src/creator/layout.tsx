import { CREATOR_ROUTES, DYNAMIC_FORMS_ROUTES } from '@oe/core/utils/routes';
import { DashboardLayout } from '@oe/ui/common/layout';
import { BookOpen, FileText, House, LayoutTemplate, ReceiptText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const tDashboard = useTranslations('dashboard');
  return (
    <DashboardLayout
      sidebarItems={[
        {
          id: 'dashboard',
          label: tDashboard('dashboard'),
          icon: <House className="h-5 w-5" />,
          href: CREATOR_ROUTES.dashboard,
          isRoot: true,
        },
        {
          id: 'courses',
          label: tDashboard('courses.title'),
          icon: <BookOpen className="h-5 w-5" />,
          href: CREATOR_ROUTES.courses,
        },
        {
          id: 'forms',
          label: tDashboard('forms.title'),
          icon: <FileText className="h-5 w-5" />,
          items: [
            {
              id: 'form-templates',
              label: tDashboard('forms.formTemplates'),
              icon: <LayoutTemplate className="h-5 w-5" />,
              href: `${CREATOR_ROUTES.dashboard}${DYNAMIC_FORMS_ROUTES.formTemplates}`,
            },
            {
              id: 'form-list',
              label: tDashboard('forms.formList'),
              icon: <ReceiptText className="h-5 w-5" />,
              href: `${CREATOR_ROUTES.dashboard}${DYNAMIC_FORMS_ROUTES.formList}`,
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
