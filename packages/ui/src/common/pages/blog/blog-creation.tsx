import { getBlogDraftContent } from '@oe/api/services/blog';
import { getCategoriesTreeService } from '@oe/api/services/categories';
import { getHashtagService } from '@oe/api/services/hashtag';
import { getI18nConfigServer } from '@oe/api/services/i18n';
import type { IBlog } from '@oe/api/types/blog';
import BannerBg from '@oe/assets/images/blog-creation-bg.png';
import { pickCharacters } from '@oe/core/utils/string';
import { BlogForm, type BlogType, type IFormAction } from '@oe/ui/components/blog';
import { Image } from '@oe/ui/components/image';
import { getTranslations } from 'next-intl/server';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';
import { cn } from '#utils/cn';

interface ICreationProps {
  blogOwner: { name: string; avatar?: string };
  className?: string;
  blogType: BlogType;
  action?: IFormAction;
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

    return await getBlogDraftContent(undefined, { id });
  } catch (error) {
    console.error(error);

    return error;
  }
};

export default async function BlogCreationPage({
  className,
  blogType,
  aiButton,
  id,
  action,
  blogOwner,
}: ICreationProps) {
  const [tBlogs, hashtags, categories, i18nConfigData, blogData] = await Promise.all([
    getTranslations('blogForm'),
    getHastTag(blogType === 'org'),
    getCategories(blogType === 'org'),
    getI18nConfigServer(),
    getBlogContent(id),
  ]);

  if (id && blogData instanceof Error) {
    return <p className="p-4 text-center text-[#FA0013]">{blogData.message}</p>;
  }

  return (
    <div className="p-4">
      <div className={cn('relative mb-6 min-h-[120px] w-full p-6', className)}>
        <Image
          src={BannerBg.src}
          alt="creation-banner"
          priority
          quality={100}
          fill
          backgroundImage
          sizes="(max-width: 768px) 100vw, 70vw"
          style={{ objectFit: 'cover' }}
          className="static z-[-1] h-full w-full rounded-xl"
          containerHeight="auto"
        />
        <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row">
          <Avatar className="h-[80px] w-[80px] flex-inline">
            <AvatarImage src={blogOwner.avatar ?? ''} alt={blogOwner.name} />
            <AvatarFallback>{pickCharacters(blogOwner.name)}</AvatarFallback>
          </Avatar>
          <p className="giant-iheading-bold20 lg:giant-iheading-bold40 text-foreground">
            {tBlogs.rich('ownerBlog', {
              name: blogOwner.name,
            })}
          </p>
        </div>
      </div>

      <BlogForm
        className={cn('p-4', className)}
        blogType={blogType}
        aiButton={aiButton}
        hashtags={hashtags}
        categories={categories}
        locales={i18nConfigData?.[0]?.value?.locales}
        data={blogData as IBlog}
        action={action}
      />
    </div>
  );
}
