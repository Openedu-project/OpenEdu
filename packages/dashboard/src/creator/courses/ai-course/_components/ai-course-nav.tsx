'use client';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Link, usePathname } from '@oe/ui/common/navigation';
import { NavigationMenu, NavigationMenuList } from '@oe/ui/shadcn/navigation-menu';
import { ScrollArea, ScrollBar } from '@oe/ui/shadcn/scroll-area';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type TCourseNavMenu = 'course-outline' | 'general-info';

interface TCourseNavMenuItem {
  value: TCourseNavMenu;
  labelKey: string;
  href: string;
}

const AICourseNavMenu = ({ className }: { className?: string }) => {
  const tCourseMenu = useTranslations('courses.aiCourse');
  const { id } = useParams();
  const pathname = usePathname();

  const navLabel: TCourseNavMenuItem[] = [
    {
      value: 'course-outline',
      labelKey: 'courseOutline',
      href: buildUrl({ endpoint: CREATOR_ROUTES.aiCourseDetail, params: { id: id } }),
    },
    {
      value: 'general-info',
      labelKey: 'generalInfo',

      href: buildUrl({ endpoint: CREATOR_ROUTES.aiGeneralInfo, params: { id: id } }),
    },
  ];

  const activePath = pathname.includes(navLabel[1]?.value ?? '') ? navLabel[1] : navLabel[0];

  const { course } = useGetCourseById((id as string) ?? '');

  return (
    <NavigationMenu className={cn('!flex-none max-w-screen', className)}>
      <ScrollArea className="whitespace-nowrap rounded-xl bg-background p-2 pb-0">
        <NavigationMenuList
          className={cn(
            'flex w-full justify-center gap-2 rounded-none bg-transparent pb-2',
            !course?.ai_course && 'pointer-events-none'
          )}
        >
          {navLabel.map(nav => (
            <Link
              className={cn(
                'rounded-xl bg-background',
                activePath?.value === nav.value ? 'border border-primary text-primary' : 'text-foreground'
              )}
              href={nav.href}
              key={nav.value}
            >
              {tCourseMenu(nav.labelKey)}
            </Link>
          ))}
        </NavigationMenuList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </NavigationMenu>
  );
};

AICourseNavMenu.displayName = 'AICourseNavMenu';

export { AICourseNavMenu, type TCourseNavMenu, type TCourseNavMenuItem };
