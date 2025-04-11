import { getPermissionMyAccessService } from '@oe/api';
import { ADMIN_ROUTES } from '@oe/core';
import { checkSidebarPermissions } from '@oe/core';
import { DashboardLayout } from '@oe/ui';
import {
  Book,
  BookOpen,
  BookUp,
  Building,
  GitPullRequest,
  GitPullRequestCreateArrow,
  House,
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

export async function AdminOrgLayout({ children }: { children: ReactNode }) {
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
            href: ADMIN_ROUTES.coursesManagement,
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
        label: tDashboard('creators.title'),
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
