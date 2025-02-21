'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '#shadcn/tabs';
import { cn } from '#utils/cn';

const navLinkStyles = {
  base: `
    drop-shadow-none
    relative
    flex-1
    cursor-pointer
    p-2
    h-[36px]
    text-neutral-600
    items-center
    rounded-lg
    border
    border-transparent
    transition-all
    duration-200
    shadow-0
    group
    !opacity-100
    text-base
    font-semibold

    data-[state=active]:!bg-bg-primary
    data-[state=active]:!text-primary
    data-[state=active]:!border-[1px]
    data-[state=active]:!border-primary
    data-[state=active]:after:content-['']
    data-[state=active]:after:h-[1px]
    data-[state=active]:after:absolute
    data-[state=active]:after:bottom-[-13px]
    data-[state=active]:after:left-0
    data-[state=active]:after:w-full
    data-[state=active]:after:bg-primary
  `,
  hover: `
    hover:bg-bg-primary
    hover:text-primary
    hover:!border-[1px]
    hover:!border-border-primary
    hover:after:content-['']
    hover:after:h-[1px]
    hover:after:absolute
    hover:after:bottom-[-13px]
    hover:after:left-0
    hover:after:w-full
    hover:after:bg-border-primary
  `,
} as const;

export default function MyLaunchpadTab() {
  const t = useTranslations('myLaunchpadList');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || 'pledged';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.set('page', '1');
      return params.toString();
    },
    [searchParams]
  );

  const handleTabChange = (value: string) => {
    router.push(`${pathname}?${createQueryString('tab', value)}`, {
      scroll: false,
    });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-6 flex w-full max-w-md gap-2">
        <TabsTrigger value="pledged" className={cn(navLinkStyles.base, navLinkStyles.hover)}>
          {t('pledging')}
        </TabsTrigger>
        <TabsTrigger value="voting" className={cn(navLinkStyles.base, navLinkStyles.hover)}>
          {t('voting')}
        </TabsTrigger>
        <TabsTrigger value="got_revenue" className={cn(navLinkStyles.base, navLinkStyles.hover)}>
          {t('success')}
        </TabsTrigger>
        <TabsTrigger value="got_refunded" className={cn(navLinkStyles.base, navLinkStyles.hover)}>
          {t('failed')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
