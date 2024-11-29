import { getPermissionMyAccessService } from '@oe/api/services/permissions';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { checkSidebarPermissions } from '@oe/core/utils/sidebar-menu';
import { DashboardLayout } from '@oe/ui/common/layout';
import { Book, BookOpen, BookUp, House, Network, User, UserCog, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const [permissions, tDashboard] = await Promise.all([
    getPermissionMyAccessService('', { params: undefined }),
    getTranslations('dashboard'),
  ]);
  const filteredMenu = checkSidebarPermissions(
    [
      {
        id: 'dashboard',
        label: tDashboard('dashboard'),
        icon: <House className="h-5 w-5" />,
        href: ADMIN_ROUTES.dashboard,
        isRoot: true,
      },
      {
        id: 'course-management',
        label: tDashboard('courses.courseManagement'),
        icon: <Book className="h-5 w-5" />,
        items: [
          {
            id: 'courses',
            label: tDashboard('courses.title'),
            icon: <BookOpen className="h-5 w-5" />,
            href: ADMIN_ROUTES.courses,
          },
          {
            id: 'course-categories',
            label: tDashboard('courses.courseCategories'),
            icon: <Network className="h-5 w-5" />,
            href: ADMIN_ROUTES.courseCategories,
          },
          {
            id: 'courses-reviewing',
            label: tDashboard('courses.coursesReviewing'),
            icon: <BookUp className="h-5 w-5" />,
            href: ADMIN_ROUTES.coursesReviewing,
          },
        ],
      },
      {
        id: 'users',
        label: tDashboard('userManagement'),
        icon: <UserCog className="h-5 w-5" />,
        items: [
          {
            id: 'all-users',
            label: tDashboard('allUsers'),
            icon: <Users className="h-5 w-5" />,
            href: ADMIN_ROUTES.allUsers,
          },
          {
            id: 'users',
            label: tDashboard('users'),
            icon: <User className="h-5 w-5" />,
            href: ADMIN_ROUTES.allUsers,
          },
        ],
      },
      // {
      //   id: 'permission-setting',
      //   label: tDashboard('permissionSettings.title'),
      //   icon: <FileLock className="h-5 w-5" />,
      //   href: ADMIN_ROUTES.permissionRoleSettings,
      // },
    ],
    permissions ?? []
  );
  return (
    <DashboardLayout className="p-4 pt-0" sidebarItems={filteredMenu}>
      {children}
    </DashboardLayout>
  );
}
