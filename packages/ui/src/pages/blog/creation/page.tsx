import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getBlogDraftContent } from '@oe/api/services/blog';
import WhaleError from '@oe/assets/images/whale/whale-error.png';
import { getCookies } from '@oe/core/utils/cookie';
import { AUTH_ROUTES, BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Image } from '@oe/ui/components/image';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { BlogForm, type IFormAction } from '#components/blog';
import { Breadcrumb } from '#components/breadcrumb';
import { cn } from '#utils/cn';
import { AuthorAvatar } from '../_components/author-avatar';

interface ICreationProps {
  className?: string;
  action: IFormAction;
  aiButton?: boolean;
  id?: string;
}

const getBlogContent = async (id?: string) => {
  try {
    if (!id) {
      return undefined;
    }
    const res = await getBlogDraftContent(undefined, { id });
    return res;
  } catch (error) {
    console.error(error);

    return error as Error;
  }
};

export default async function BlogCreationPage({ className, aiButton, id, action }: ICreationProps) {
  const [tError, tBlogNavigation, blogData, me, cookies] = await Promise.all([
    getTranslations('errors'),
    getTranslations('blogNavigation'),
    getBlogContent(id),
    getMeServiceWithoutError(),
    getCookies(),
  ]);

  if (!me) {
    redirect(
      `${AUTH_ROUTES.login}?next=/${cookies?.[process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY] ?? 'en'}${BLOG_ROUTES.createBlog}`
    );
  }
  if (blogData instanceof Error) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <Image src={WhaleError.src} alt="error" priority quality={100} className="rounded-full" aspectRatio="1:1" />
        <p className="giant-iheading-semibold18 text-foreground">{tError('unknown.title')}</p>
        <p className="text-sm">{tError('unknown.description')}</p>
      </div>
    );
  }

  const breakcrumbItems = [
    {
      label: tBlogNavigation('myBlog'),
      path: buildUrl({ endpoint: BLOG_ROUTES.authorBlog, params: { username: me.username } }),
    },
    {
      label: tBlogNavigation('blogManagement'),
      path: BLOG_ROUTES.blogManagement,
    },
    {
      label: tBlogNavigation(action === 'create' ? 'blogCreation' : 'blogEditer'),
    },
  ];

  return (
    <div className="bg-background p-4">
      <AuthorAvatar name={me.display_name?.length > 0 ? me.display_name : me.username} avatar={me.avatar ?? ''} />
      <Breadcrumb items={breakcrumbItems} />
      <BlogForm
        className={cn('p-4', className)}
        blogType="personal"
        aiButton={aiButton}
        data={blogData}
        action={action}
      />
    </div>
  );
}
