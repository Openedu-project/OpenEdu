import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import type { IBlogFormType } from '@oe/api/schemas/blogSchema';
import type { ICategoryTree } from '@oe/api/types/categories';
import { useTranslations } from 'next-intl';
import { SelectTree } from '#components/select-tree';
import { BlogField, BlogFieldSkeleton } from './blog-field';

export function CategoryField() {
  const tBlogs = useTranslations('blogForm');
  const { categoriesTree, categoriesTreeIsLoading } = useCategoriesTree({ active: true, type: 'blog' });

  if (categoriesTreeIsLoading) {
    return <BlogFieldSkeleton title={tBlogs('category')} />;
  }

  if (!categoriesTree) {
    return null;
  }

  return (
    <BlogField name="category_ids" title={tBlogs('category')}>
      <SelectTree<ICategoryTree, NonNullable<IBlogFormType['category_ids']>[number]>
        data={categoriesTree}
        placeholder={tBlogs('selectCategories')}
        searchPlaceholder={tBlogs('searchCategories')}
        getLabel={node => node.name}
        getValue={node => ({ id: node.id, name: node.name })}
        checkable
      />
    </BlogField>
  );
}
