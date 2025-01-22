'use client';

import type { ICategoryTree } from '@oe/api/types/categories';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Link } from '#common/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '#shadcn/navigation-menu';
import { Separator } from '#shadcn/separator';
import { cn } from '#utils/cn';

interface ICategoryMenu {
  category: ICategoryTree;
  level?: number;
}
export const CategoryMenu = ({ category, level = 1 }: ICategoryMenu) => (
  <div className="flex flex-col gap-2 " style={{ paddingLeft: 30 * (level - 1) }}>
    <Link
      className="giant-iheading-semibold14 flex justify-start gap-2 whitespace-normal p-2 text-primary uppercase hover:bg-primary/10 hover:no-underline"
      href={buildUrl({
        endpoint: BLOG_ROUTES.blogCategory,
        params: { id: category.id },
        queryParams: { n: category.name },
      })}
    >
      <Separator className="w-0.5 bg-primary" orientation="vertical" />
      <span>{category.name}</span>
    </Link>
    {category.child?.some(sub => sub.child && sub.child.length > 0) ? (
      category.child.map(sub => <CategoryMenu key={sub.id} category={sub} level={level + 1} />)
    ) : (
      <div className="flex flex-col" style={{ paddingLeft: 30 * (level > 1 ? level - 1 : 1) }}>
        {category.child?.map(sub => (
          <Link
            key={sub.id}
            className="giant-iheading-semibold14 justify-start whitespace-normal rounded p-2 text-foreground hover:bg-primary/10 hover:no-underline"
            href={buildUrl({
              endpoint: BLOG_ROUTES.blogCategory,
              params: { id: category.id },
              queryParams: { n: category.name, has_child: sub.child && sub.child.length > 0 },
            })}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    )}
  </div>
);

interface ICategoryNavMenu {
  categories?: ICategoryTree[];
  className?: string;
}
export function CategoryNavMenu({ categories, className }: ICategoryNavMenu) {
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
                    'focus:bg-transparent data-[active]:bg-transparent'
                  )}
                >
                  <p className="max-w-28 truncate">{category.name} </p>
                </NavigationMenuTrigger>
              </div>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px]">
                  <CategoryMenu category={category} />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    )
  );
}
