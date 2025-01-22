'use client';

import type { ICategoryTree } from '@oe/api/types/categories';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '#shadcn/navigation-menu';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import { CategoryMenu, CategoryNavMenu } from './category-nav';
import { SearchBlog } from './search';

export function BlogHeader({
  categoryData,
}: {
  categoryData: ICategoryTree[];
}) {
  const t = useTranslations('blogHeader');

  return (
    <div className="flex flex-col flex-wrap gap-4 bg-primary/5 p-2 pb-0 sm:flex-row">
      <NavigationMenu>
        <NavigationMenuItem className="list-none">
          <div className="border-transparent border-b pb-1 hover:border-primary">
            <NavigationMenuTrigger
              className={cn(
                'giant-iheading-semibold14 rounded border border-transparent bg-transparent p-1 px-2 text-foreground/75',
                'hover:border-primary hover:bg-primary/10 hover:text-primary',
                'focus:bg-transparent data-[active]:bg-transparent'
              )}
            >
              <Menu className="mr-2 h-4 w-4" />
              {t('allCategories')}
            </NavigationMenuTrigger>
          </div>
          <NavigationMenuContent>
            <ScrollArea className="h-[400px] max-h-[100vh-100px] w-full min-w-[300px] md:w-[calc(100vw-150px)]">
              <ul className="grid w-full grid-cols-1 gap-10 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryData?.map(category => (
                  <CategoryMenu key={category.id} category={category} />
                ))}
              </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
      <CategoryNavMenu className="hidden md:flex" categories={categoryData} />
      <div className="mb-3 grow">
        <SearchBlog />
      </div>
    </div>
  );
}
