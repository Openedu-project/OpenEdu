'use client';
import { useCategoriesTree } from '@oe/api';
import type { ICategoryTree } from '@oe/api';
import { CategoryAllMenu, CategoryNavMenu } from './category-nav';
import { SearchBlog } from './search';

export function BlogHeader({
  activeId,
  categoryData,
}: {
  activeId?: string;
  categoryData?: ICategoryTree[];
}) {
  const { categoriesTree } = useCategoriesTree({ active: true, type: 'blog' }, categoryData);

  return (
    <div className="flex flex-col flex-wrap justify-between gap-4 bg-primary/5 p-2 pr-4 pb-0 sm:flex-row">
      <CategoryAllMenu categories={categoriesTree ?? []} activeId={activeId} />
      <CategoryNavMenu className="hidden md:flex" categories={categoriesTree ?? []} activeId={activeId} />
      <div className="mb-3 grow lg:max-w-xl">
        <SearchBlog />
      </div>
    </div>
  );
}
