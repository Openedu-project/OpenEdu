import { getPermissionMyAccessService } from '@oe/api/services/permissions';
import { BLOG_ADMIN_ROUTES } from '@oe/core/utils/routes';
import { checkSidebarPermissions } from '@oe/core/utils/sidebar-menu';
import { DashboardLayout } from '@oe/ui/common/layout';
import {
  BookUpIcon,
  BookUser,
  BriefcaseBusiness,
  FolderKanban,
  Newspaper,
  Shapes,
  UserCheck,
  UserCog,
  UserPen,
  UserRoundPlusIcon,
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
        id: 'user-management',
        label: tDashboard('userManagement'),
        icon: <UserCog className="h-5 w-5" />,
        items: [
          {
            id: 'writer',
            label: tDashboard('blog.writerMgt'),
            icon: <UserPen className="h-5 w-5" />,
            href: BLOG_ADMIN_ROUTES.writerMgt,
          },
          {
            id: 'editor',
            label: tDashboard('blog.editorMgt'),
            icon: <UserCheck className="h-5 w-5" />,
            href: BLOG_ADMIN_ROUTES.editorMgt,
          },
          {
            id: 'invitation',
            label: tDashboard('blog.inviteMgt'),
            icon: <UserRoundPlusIcon className="h-5 w-5" />,
            href: BLOG_ADMIN_ROUTES.inviteMgt,
          },
        ],
      },
      {
        id: 'category',
        label: tDashboard('blog.category'),
        icon: <Shapes className="h-5 w-5" />,
        href: BLOG_ADMIN_ROUTES.blogCategory,
      },
      {
        id: 'blog-management',
        label: tDashboard('blog.title'),
        icon: <FolderKanban className="h-5 w-5" />,
        items: [
          {
            id: 'org-blog',
            label: tDashboard('blog.orgBlog'),
            icon: <BriefcaseBusiness className="h-5 w-5" />,
            href: BLOG_ADMIN_ROUTES.writerMgt,
          },
          {
            id: 'user-blog',
            label: tDashboard('blog.userBlog'),
            icon: <BookUser className="h-5 w-5" />,
            href: BLOG_ADMIN_ROUTES.editorMgt,
          },
          {
            id: 'blog-request',
            label: tDashboard('blog.publishRequest'),
            icon: <BookUpIcon className="h-5 w-5" />,
            href: BLOG_ADMIN_ROUTES.inviteMgt,
          },
        ],
      },
      {
        id: 'myBlog',
        label: tDashboard('blog.myBlog'),
        icon: <Newspaper className="h-5 w-5" />,
        href: BLOG_ADMIN_ROUTES.myBlog,
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
