import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getCookies } from '@oe/core/utils/cookie';
import { AUTH_ROUTES, BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import type { IBreadcrumbItem } from '#components/breadcrumb';
import MyBlogManagement from '../../../components/blog/my-blog-management';

export default async function PersonalBlogMgtPage() {
  const [tBlogs, me, cookies] = await Promise.all([
    getTranslations('blogManagement'),
    getMeServiceWithoutError(),
    getCookies(),
  ]);

  if (!me) {
    redirect(
      `${AUTH_ROUTES.login}?next=/${cookies?.[process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY] ?? 'en'}${BLOG_ROUTES.blogManagement}`
    );
  }

  const navItems: IBreadcrumbItem[] = [
    {
      label: tBlogs('myBlog'),
      path: buildUrl({ endpoint: BLOG_ROUTES.authorBlog, params: { username: me.username } }),
    },
    {
      label: tBlogs('blogManagement'),
    },
  ];
  return <MyBlogManagement type="personal" canUnpublish breadcrumbs={navItems} />;
}
