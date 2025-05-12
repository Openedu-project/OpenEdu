'use client';

import { CREATOR_ROUTES, buildUrl } from '@oe/core';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@oe/ui';
import { ScrollArea, ScrollBar } from '@oe/ui';
import { Link } from '@oe/ui';
import { BookOpen, DollarSign, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

export type TAffiliateNavMenu = 'information' | 'course' | 'commission' | 'referrers';

export interface TAffiliateNavMenuItem {
  value: TAffiliateNavMenu;
  label: (color: string) => React.ReactNode;
  href: string;
}

const ClientNavMenuItem = React.memo(({ nav }: { nav: TAffiliateNavMenuItem }) => {
  const pathname = usePathname();

  const isActive = pathname.includes(nav.value);

  return (
    <NavigationMenuItem>
      <Link href={nav.href} passHref legacyBehavior>
        <NavigationMenuLink
          className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all duration-200 ${
            isActive ? 'border border-primary bg-primary/10 text-primary' : 'text-gray-600 hover:bg-primary/5'
          }
          `}
        >
          {nav.label(isActive ? 'var(--primary)' : '#6e6e6e')}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
});

ClientNavMenuItem.displayName = 'ClientNavMenuItem';

export const AffiliateCampaignNavMenu = ({ id }: { id: string }) => {
  const tAffiliateMenu = useTranslations('dashboard.affiliateCampaign.menu');

  const navLabel: TAffiliateNavMenuItem[] = [
    {
      value: 'course',
      label: (color = '#6e6e6e') => (
        <>
          <BookOpen size={18} color={color} />
          <span>{tAffiliateMenu('course')}</span>
        </>
      ),
      href: buildUrl({
        endpoint: CREATOR_ROUTES.campaignDetailCourses,
        params: { id },
      }),
    },
    {
      value: 'commission',
      label: (color = '#6e6e6e') => (
        <>
          <DollarSign size={18} color={color} />
          <span>{tAffiliateMenu('commission')}</span>
        </>
      ),
      href: buildUrl({
        endpoint: CREATOR_ROUTES.campaignDetailCommissions,
        params: { id },
      }),
    },
    {
      value: 'referrers',
      label: (color = '#6e6e6e') => (
        <>
          <Users size={18} color={color} />
          <span>{tAffiliateMenu('referrers')}</span>
        </>
      ),
      href: buildUrl({
        endpoint: CREATOR_ROUTES.campaignDetailReferrers,
        params: { id },
      }),
    },
  ];

  return (
    <NavigationMenu>
      <ScrollArea className="w-full whitespace-nowrap rounded-b-radius-m bg-white">
        <NavigationMenuList className="flex w-full gap-3 rounded-nonejustify-start bg-transparent bg-white pb-3">
          {navLabel.map(nav => (
            <ClientNavMenuItem key={nav.value} nav={nav} />
          ))}
        </NavigationMenuList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </NavigationMenu>
  );
};
