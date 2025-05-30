'use client';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Link, usePathname } from '@oe/ui/common/navigation';
import { NavigationMenu, NavigationMenuList } from '@oe/ui/shadcn/navigation-menu';
import { ScrollArea, ScrollBar } from '@oe/ui/shadcn/scroll-area';
import { useSocketStore } from '@oe/ui/store/socket';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const GENERAL_INFO_VALUE = CREATOR_ROUTES.aiGeneralInfo.split('/').at(-1);

type TCourseNavMenu = 'course-outline' | typeof GENERAL_INFO_VALUE;

interface TCourseNavMenuItem {
  value: TCourseNavMenu;
  labelKey: string;
  href: string;
}

const AICourseNavMenu = ({ className }: { className?: string }) => {
  const tCourseMenu = useTranslations('course.aiCourse');
  const { id } = useParams();
  const pathname = usePathname();
  const { AICourseStatusData } = useSocketStore();
  const [canChangeTab, setCanChangeTab] = useState(Boolean(id));

  const navLabel: TCourseNavMenuItem[] = [
    {
      value: 'course-outline',
      labelKey: 'courseOutline',
      href: buildUrl({
        endpoint: CREATOR_ROUTES.aiCourseDetail,
        params: { id: id },
      }),
    },
    {
      value: GENERAL_INFO_VALUE,
      labelKey: 'generalInfo',

      href: buildUrl({
        endpoint: CREATOR_ROUTES.aiGeneralInfo,
        params: { id: id },
      }),
    },
  ];

  const activeValue = useMemo(
    () => (pathname.includes(GENERAL_INFO_VALUE ?? '') ? GENERAL_INFO_VALUE : 'course-outline'),
    [pathname]
  );

  const { course } = useGetCourseById((id as string) ?? '');

  useEffect(() => {
    if (course) {
      setCanChangeTab(true);
    }
  }, [course]);

  useEffect(() => {
    if (
      !canChangeTab &&
      AICourseStatusData &&
      AICourseStatusData.data?.course_id === id &&
      AICourseStatusData.data?.general_info_status === 'completed'
    ) {
      setCanChangeTab(true);
    }
  }, [AICourseStatusData, id, canChangeTab]);

  return (
    <NavigationMenu className={cn('!flex-none max-w-screen', className)}>
      <ScrollArea className="whitespace-nowrap rounded-xl bg-background p-2 pb-0">
        <NavigationMenuList
          className={cn(
            'flex w-full justify-center gap-2 rounded-none bg-transparent pb-2',
            !canChangeTab && 'pointer-events-none'
          )}
        >
          {navLabel.map(nav => (
            <Link
              className={cn(
                'rounded-xl bg-background',
                nav.value === activeValue
                  ? 'pointer-events-none border border-primary text-primary'
                  : 'bg-background text-foreground hover:bg-primary/5 hover:no-underline'
              )}
              activeClassName=""
              size="xs"
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
