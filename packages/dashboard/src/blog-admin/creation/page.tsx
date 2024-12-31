import { getBlogDraftContent } from '@oe/api/services/blog';
import { getCategoriesTreeService } from '@oe/api/services/categories';
import { getHashtagService } from '@oe/api/services/hashtag';
import { getI18nConfigServer } from '@oe/api/services/i18n';
import { getOrgByDomainService } from '@oe/api/services/organizations';
import BannerBg from '@oe/assets/images/blog-creation-bg.png';
import OpenEdu from '@oe/assets/images/openedu.png';
import WhaleError from '@oe/assets/images/whale/whale-error.png';
import { getCookie } from '@oe/core/utils/cookie';
import { BLOG_ADMIN_ROUTES } from '@oe/core/utils/routes';
import { BlogForm, type BlogType, type IFormAction } from '@oe/ui/components/blog';
import { BreadcrumbWithPath } from '@oe/ui/components/breadcrumb';
import { Image } from '@oe/ui/components/image';
import { cn } from '@oe/ui/utils/cn';
import { getTranslations } from 'next-intl/server';

interface ICreationProps {
  className?: string;
  blogType: BlogType;
  action: IFormAction;
  aiButton?: boolean;
  id?: string;
}

const getHastTag = async (shouldFetch: boolean) => {
  try {
    if (!shouldFetch) {
      return [];
    }

    const res = await getHashtagService();
    return res.results;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const getCategories = async (shouldFetch: boolean) => {
  try {
    if (!shouldFetch) {
      return [];
    }

    return await getCategoriesTreeService(undefined, { queryParams: { active: true, type: 'blog' } });
  } catch (error) {
    console.error(error);

    return [];
  }
};

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

export default async function OrgBlogCreation({ className, blogType, aiButton, id, action }: ICreationProps) {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';

  const [t, hashtags, categories, i18nConfigData, blogData, orgData] = await Promise.all([
    getTranslations(),
    getHastTag(blogType === 'org'),
    getCategories(blogType === 'org'),
    getI18nConfigServer(),
    getBlogContent(id),
    getOrgByDomainService(undefined, {
      domain,
    }),
  ]);

  if (blogData instanceof Error) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <Image src={WhaleError.src} alt="error" priority quality={100} className="rounded-full" aspectRatio="1:1" />
        <p className="giant-iheading-semibold18 text-foreground">{t('general.somethingWentWrong')}</p>
      </div>
    );
  }

  const breakcrumbItems = [
    {
      label: t('blogNavigation.myBlog'),
      path: BLOG_ADMIN_ROUTES.myBlog,
    },
    {
      label: t(action === 'create' ? 'blogNavigation.blogCreation' : 'blogNavigation.blogEditer'),
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
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className="h-full w-full rounded-xl"
        />
        <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row">
          <div>
            <Image
              src={orgData?.thumbnail?.url ?? OpenEdu.src}
              alt="creation-banner"
              priority
              quality={100}
              aspectRatio="1:1"
              fill
              style={{ objectFit: 'contain' }}
              className="h-[80px] w-[80px] rounded-full border bg-background"
              containerHeight="auto"
            />
          </div>
          <p className="giant-iheading-bold20 lg:giant-iheading-bold40 z-10 text-foreground">
            {t.rich('blogForm.ownerBlog', {
              name: orgData?.name ?? 'Organization',
            })}
          </p>
        </div>
      </div>

      <BreadcrumbWithPath items={breakcrumbItems} />

      <BlogForm
        className={cn('p-4', className)}
        blogType={blogType}
        aiButton={aiButton}
        hashtags={hashtags}
        categories={categories}
        locales={i18nConfigData?.[0]?.value?.locales}
        data={blogData}
        action={action}
      />
    </div>
  );
}
