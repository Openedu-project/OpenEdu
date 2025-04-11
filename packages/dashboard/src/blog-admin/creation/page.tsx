import { getBlogDraftContent } from '@oe/api';
import WhaleError from '@oe/assets/images/whale/whale-error.png';
import { BLOG_ADMIN_ROUTES } from '@oe/core';
import { BlogForm, type IFormAction } from '@oe/ui';
import { Breadcrumb } from '@oe/ui';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { getTranslations } from 'next-intl/server';
import { OrgAvatar } from '../_components/org-avatar';

interface ICreationProps {
  className?: string;
  action: IFormAction;
  aiButton?: boolean;
  id?: string;
  prevUrl?: string;
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

export async function OrgBlogCreation({ className, aiButton, id, action, prevUrl }: ICreationProps) {
  const [tError, tBlogNavigation, blogData] = await Promise.all([
    getTranslations('errors'),
    getTranslations('blogNavigation'),
    getBlogContent(id),
  ]);

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
      label: tBlogNavigation(prevUrl?.includes(BLOG_ADMIN_ROUTES.orgBlogMgt) ? 'blogManagement' : 'myBlog'),
      path: prevUrl ?? BLOG_ADMIN_ROUTES.myBlog,
    },
    {
      label: tBlogNavigation(action === 'create' ? 'blogCreation' : 'blogEditer'),
    },
  ];

  return (
    <div className="bg-background p-4">
      <OrgAvatar />

      <Breadcrumb items={breakcrumbItems} />

      <BlogForm className={cn('p-4', className)} blogType="org" aiButton={aiButton} data={blogData} action={action} />
    </div>
  );
}
