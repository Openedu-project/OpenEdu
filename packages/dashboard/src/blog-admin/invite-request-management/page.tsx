import { BLOG_ADMIN_ROUTES } from '@oe/core';
import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { BlogNavigateLink } from '../_components/blog-navigate-link';
import { InviteRequestTable } from '../_components/invite-request-table';
import type { IBlogUserRole } from '../_components/user-table';

export function InviteRequestManagementPage({
  userRole,
}: {
  userRole: IBlogUserRole;
}) {
  const tDashboard = useTranslations('dashboard.blog');
  const tBlogs = useTranslations('blogManagement.inviteRequest');
  return (
    <DashboardMainPageLayout
      dashboard="blog"
      breadcrumbs={[{ label: tDashboard('userMgt'), disabled: true }, { label: tDashboard('inviteMgt') }]}
      title={
        <>
          <h1 className="mb-2 text-2xl">{tDashboard('inviteMgt')}</h1>
          <div className="flex gap-4">
            <BlogNavigateLink
              active={userRole === 'org_writer'}
              label={tBlogs('writer')}
              href={BLOG_ADMIN_ROUTES.inviteMgt}
            />
            <BlogNavigateLink
              active={userRole === 'org_editor'}
              label={tBlogs('editor')}
              href={BLOG_ADMIN_ROUTES.inviteEditorMgt}
            />
          </div>
        </>
      }
      mainClassName="overflow-hidden"
    >
      <InviteRequestTable userRole={userRole} />
    </DashboardMainPageLayout>
  );
}
