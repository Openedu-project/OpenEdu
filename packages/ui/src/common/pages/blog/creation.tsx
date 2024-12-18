import { getBlogDraftContent } from '@oe/api/services/blog';
import { getCategoriesTreeService } from '@oe/api/services/categories';
import { getHashtagService } from '@oe/api/services/hashtag';
import { getI18nConfigServer } from '@oe/api/services/i18n';
import type { IBlog } from '@oe/api/types/blog';
import { BlogForm, type BlogType, type IFormAction } from '@oe/ui/components/blog';
import { cn } from '#utils/cn';

interface ICreationProps {
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

const getBlogEditContent = async (id?: string) => {
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

export default async function BlogCreationPage({ className, blogType, aiButton, id, action }: ICreationProps) {
  const [hashtags, categories, i18nConfigData, blogData] = await Promise.all([
    getHastTag(blogType === 'org'),
    getCategories(blogType === 'org'),
    getI18nConfigServer(),
    getBlogEditContent(id),
  ]);

  if (id && blogData instanceof Error) {
    return <p className="p-4 text-center text-[#FA0013]">{blogData.message}</p>;
  }

  return (
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
  );
}
