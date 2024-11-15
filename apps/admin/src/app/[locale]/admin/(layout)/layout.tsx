import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { DashboardLayout } from '@oe/ui/common/layout';
import { File, Globe, House, Mail, Settings, Settings2, User, UserCog, Users } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      sidebarItems={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: <House className="h-5 w-5" />,
          href: ADMIN_ROUTES.dashboard,
        },
        {
          id: 'users',
          label: 'Users management',
          icon: <UserCog className="h-5 w-5" />,
          items: [
            {
              id: 'all-users',
              label: 'All users',
              icon: <Users className="h-5 w-5" />,
              href: ADMIN_ROUTES.allUsers,
            },
            {
              id: 'users',
              label: 'Users',
              icon: <User className="h-5 w-5" />,
              href: ADMIN_ROUTES.allUsers,
            },
          ],
        },
        {
          id: 'site-settings',
          label: 'Site settings',
          icon: <Settings className="h-5 w-5" />,
          items: [
            {
              id: 'general',
              label: 'General',
              icon: <Settings2 className="h-5 w-5" />,
              href: ADMIN_ROUTES.generalSettings,
            },
            {
              id: 'emails',
              label: 'Emails',
              icon: <Mail className="h-5 w-5" />,
              href: ADMIN_ROUTES.emailSettings,
            },
            {
              id: 'languages',
              label: 'Languages',
              icon: <Globe className="h-5 w-5" />,
              href: ADMIN_ROUTES.languageSettings,
            },
            {
              id: 'pages',
              label: 'Pages',
              icon: <File className="h-5 w-5" />,
              href: ADMIN_ROUTES.pagesSettings,
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
