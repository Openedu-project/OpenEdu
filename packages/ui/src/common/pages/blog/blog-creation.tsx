import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getBlogDraftContent } from '@oe/api/services/blog';
import { getI18nConfigServer } from '@oe/api/services/i18n';
import BannerBg from '@oe/assets/images/blog-creation-bg.png';
import WhaleError from '@oe/assets/images/whale/whale-error.png';
import { getCookies } from '@oe/core/utils/cookie';
import { AUTH_ROUTES, BLOG_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { pickCharacters } from '@oe/core/utils/string';
import { BlogForm, type IFormAction } from '@oe/ui/components/blog';
import { Image } from '@oe/ui/components/image';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Breadcrumb } from '#components/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';
import { cn } from '#utils/cn';

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
  const [tError, tBlogNavigation, tBlogForm, i18nConfigData, blogData, me, cookies] = await Promise.all([
    getTranslations('errors'),
    getTranslations('blogNavigation'),
    getTranslations('blogForm'),
    getI18nConfigServer(),
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
      path: generateRoute(BLOG_ROUTES.authorBlog, { username: me.username }),
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
      <div className={cn('relative mb-6 min-h-[120px] w-full p-6', className)}>
        <Image
          src={BannerBg.src}
          alt="creation-banner"
          noContainer
          fill
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          style={{ objectFit: 'cover' }}
          className="h-full w-full rounded-xl"
        />
        <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row">
          <Avatar className="h-[80px] w-[80px] flex-inline">
            <AvatarImage src={me.avatar ?? ''} alt={me.username} />
            <AvatarFallback>
              {pickCharacters(me.display_name?.length > 0 ? me.display_name : me.username)}
            </AvatarFallback>
          </Avatar>
          <p className="giant-iheading-bold20 lg:giant-iheading-bold40 z-10 text-foreground">
            {tBlogForm.rich('ownerBlog', {
              name: me.display_name?.length > 0 ? me.display_name : me.username,
            })}
          </p>
        </div>
      </div>
      <Breadcrumb items={breakcrumbItems} />
      <BlogForm
        className={cn('p-4', className)}
        blogType="personal"
        aiButton={aiButton}
        locales={i18nConfigData?.[0]?.value?.locales}
        data={blogData}
        action={action}
      />
    </div>
  );
}
