'use client';

import type { ICategoryTree } from '@oe/api/types/categories';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '#shadcn/navigation-menu';
import { ScrollArea } from '#shadcn/scroll-area';
import { Separator } from '#shadcn/separator';
import { cn } from '#utils/cn';

interface ICategoryMenu {
  category: ICategoryTree;
  level?: number;
  activeId?: string;
}
export const CategoryMenu = ({ category, level = 1, activeId }: ICategoryMenu) => {
  return (
    <div className="flex flex-col gap-2 " style={{ paddingLeft: 30 * (level - 1) }}>
      <Link
        className={cn(
          'giant-iheading-semibold14 flex justify-start gap-2 whitespace-normal p-2 text-primary hover:no-underline',
          activeId === category.id ? 'cursor-default bg-primary text-primary-foreground' : 'hover:bg-primary/10'
        )}
        href={buildUrl({
          endpoint: BLOG_ROUTES.blogCategory,
          params: { id: `${category.id} ${category.name}` },
        })}
      >
        <Separator className="w-0.5 bg-primary" orientation="vertical" />
        <span>{category.name}</span>
      </Link>
      {category.child?.some(sub => sub.child && sub.child.length > 0) ? (
        category.child.map(sub => <CategoryMenu key={sub.id} category={sub} level={level + 1} activeId={activeId} />)
      ) : (
        <div className="flex flex-col" style={{ paddingLeft: 30 * (level > 1 ? level - 1 : 1) }}>
          {category.child?.map(sub => (
            <Link
              key={sub.id}
              className={cn(
                'giant-iheading-semibold14 justify-start whitespace-normal rounded p-2 text-foreground hover:no-underline',
                activeId === sub.id ? 'cursor-default bg-primary text-primary-foreground' : 'hover:bg-primary/10'
              )}
              href={buildUrl({
                endpoint: BLOG_ROUTES.blogCategory,
                params: { id: `${category.id} ${category.name}` },
              })}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface ICategoryMenuProps {
  categories?: ICategoryTree[];
  className?: string;
  activeId?: string;
}
export function CategoryNavMenu({ categories, className, activeId }: ICategoryMenuProps) {
  return (
    categories && (
      <NavigationMenu className={cn('basis-full', className)}>
        <NavigationMenuList className="gap-3">
          {categories.slice(0, 5).map((category, index) => (
            <NavigationMenuItem key={category.id}>
              <div className={cn('pb-1 hover:border-primary hover:border-b', index === 4 && 'hidden lg:block')}>
                <NavigationMenuTrigger
                  className={cn(
                    'giant-iheading-semibold14 rounded-radius-sm bg-transparent p-1 px-4 text-foreground/75 ',
                    'hover:border hover:border-primary hover:bg-primary/10 hover:text-primary',
                    'focus:bg-transparent data-[active]:bg-transparent',
                    activeId === category.id && '!bg-primary !text-primary-foreground'
                  )}
                >
                  <p className="max-w-28 truncate">{category.name} </p>
                </NavigationMenuTrigger>
              </div>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px]">
                  <CategoryMenu category={category} activeId={activeId} />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    )
  );
}

export function CategoryAllMenu({ categories, className, activeId }: ICategoryMenuProps) {
  const t = useTranslations('blogHeader');

  return (
    <NavigationMenu className={className}>
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
              {categories?.map(category => (
                <CategoryMenu key={category.id} category={category} activeId={activeId} />
              ))}
            </ul>
          </ScrollArea>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
