import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { DashboardLayout } from '@oe/ui/common/layout';
import {
  Book,
  BookOpen,
  BookUp,
  File,
  Globe,
  House,
  Mail,
  Network,
  Palette,
  Settings,
  Settings2,
  User,
  UserCog,
  Users,
} from 'lucide-react';
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
              label: tDashboard('courses.courses'),
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
        {
          id: 'site-settings',
          label: tDashboard('siteSettings.siteSettings'),
          icon: <Settings className="h-5 w-5" />,
          items: [
            {
              id: 'general',
              label: tDashboard('siteSettings.general'),
              icon: <Settings2 className="h-5 w-5" />,
              href: ADMIN_ROUTES.generalSettings,
            },
            {
              id: 'emails',
              label: tDashboard('siteSettings.email'),
              icon: <Mail className="h-5 w-5" />,
              href: ADMIN_ROUTES.emailSettings,
            },
            {
              id: 'languages',
              label: tDashboard('siteSettings.languages'),
              icon: <Globe className="h-5 w-5" />,
              href: ADMIN_ROUTES.languageSettings,
            },
            {
              id: 'pages',
              label: tDashboard('siteSettings.pages'),
              icon: <File className="h-5 w-5" />,
              href: ADMIN_ROUTES.pagesSettings,
            },
            {
              id: 'themes',
              label: tDashboard('siteSettings.themes'),
              icon: <Palette className="h-5 w-5" />,
              href: ADMIN_ROUTES.themesSettings,
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
