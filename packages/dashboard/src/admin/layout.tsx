import { getPermissionMyAccessService } from '@oe/api/services/permissions';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { checkSidebarPermissions } from '@oe/core/utils/sidebar-menu';
import { DashboardLayout } from '@oe/ui/common/layout';
import {
  Book,
  BookOpen,
  BookUp,
  Building,
  File,
  FileLock,
  GitPullRequest,
  GitPullRequestCreateArrow,
  Globe,
  House,
  Mail,
  Network,
  Palette,
  PencilLine,
  Settings,
  Settings2,
  StickyNote,
  User,
  UserCheck2Icon,
  UserCog,
  UserPenIcon,
  UserRoundPlusIcon,
  Users,
  Users2Icon,
} from 'lucide-react';
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
        id: 'organization-management',
        label: tDashboard('organizations.title'),
        icon: <GitPullRequest className="h-5 w-5" />,
        items: [
          {
            id: 'organization-request',
            label: tDashboard('organizations.requests'),
            icon: <GitPullRequestCreateArrow className="h-5 w-5" />,
            href: ADMIN_ROUTES.organizationRequests,
          },
          {
            id: 'organization-list',
            label: tDashboard('organizations.organizations'),
            icon: <Building className="h-5 w-5" />,
            href: ADMIN_ROUTES.organizationManagement,
          },
        ],
      },
      {
        id: 'creator-management',
        label: tDashboard('creators.title'),
        icon: <UserPenIcon className="h-5 w-5" />,
        items: [
          {
            id: 'creators',
            label: tDashboard('creators.creators'),
            icon: <Users2Icon className="h-5 w-5" />,
            href: ADMIN_ROUTES.creatorManagementCreators,
          },
          {
            id: 'creators-request',
            label: tDashboard('creators.requests'),
            icon: <UserCheck2Icon className="h-5 w-5" />,
            href: ADMIN_ROUTES.creatorManagementRequests,
          },
          {
            id: 'creators-invitation',
            label: tDashboard('creators.invitations'),
            icon: <UserRoundPlusIcon className="h-5 w-5" />,
            href: ADMIN_ROUTES.creatorManagementInvitations,
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
      {
        id: 'permission-setting',
        label: tDashboard('permissionSettings.title'),
        icon: <FileLock className="h-5 w-5" />,
        items: [
          {
            id: 'permission-action',
            label: tDashboard('permissionSettings.action'),
            icon: <PencilLine className="h-5 w-5" />,
            href: ADMIN_ROUTES.permissionActionSettings,
          },
          {
            id: 'permission-pages',
            label: tDashboard('permissionSettings.pages'),
            icon: <StickyNote className="h-5 w-5" />,
            href: ADMIN_ROUTES.permissionPageSettings,
          },
          {
            id: 'permission-role',
            label: tDashboard('permissionSettings.role'),
            icon: <UserCog className="h-5 w-5" />,
            href: ADMIN_ROUTES.permissionRoleSettings,
          },
        ],
      },
    ],
    permissions ?? []
  );
  return (
    <DashboardLayout className="p-4 pt-0" sidebarItems={filteredMenu}>
      {children}
    </DashboardLayout>
  );
}
