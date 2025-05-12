'use client';
import { useGetOrganizationByDomain } from '@oe/api';
import type { IUser } from '@oe/api';
import { ProfileCircle } from '@oe/assets';
import { buildUrl } from '@oe/core';
import { PLATFORM_ROUTES } from '@oe/core';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { LogoutButton } from '#common/auth/logout-button';
import { Link } from '#common/navigation';
import { UserAvatar } from '#components/user-avatar';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { MENU_ITEMS } from './constants';

export function UserMenu({ me }: { me: IUser }) {
  const { organizationByDomain } = useGetOrganizationByDomain();
  const t = useTranslations('userMenu');

  const userRolesForOrg = me.roles.filter(role => role.org_id === organizationByDomain?.id).map(role => role.role_id);

  const hasAccess = (requiredRoles: string[]) => requiredRoles.some(role => userRolesForOrg.includes(role));

  const visibleMenuItems = MENU_ITEMS(me).filter(item => hasAccess(item.requiredRoles));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <UserAvatar src={me?.avatar ?? ''} name={me?.display_name?.length > 0 ? me?.display_name : me?.username} />
          <span className="hidden max-w-[100px] truncate md:inline-block">
            {me?.display_name?.length > 0 ? me?.display_name : me?.username}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem key="myProfile" className="p-0">
          <Link
            href={buildUrl({
              endpoint: PLATFORM_ROUTES.userProfile,
              params: { username: me.username },
            })}
            className="flex h-auto w-full items-center justify-start px-2 py-1.5 text-foreground"
          >
            <ProfileCircle className="mr-2 h-4 w-4" />
            <span>{t('myProfile')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-[1px] bg-border" />
        {visibleMenuItems.map(({ href, key, icon: Icon, hasSepratePage }) => (
          <Fragment key={key}>
            <DropdownMenuItem className="p-0">
              <Link href={href} className="flex h-auto w-full items-center justify-start px-2 py-1.5 text-foreground">
                <Icon className="mr-2 h-4 w-4" />
                <span>{t(key)}</span>
              </Link>
            </DropdownMenuItem>
            {hasSepratePage && <DropdownMenuSeparator className="my-1 h-[1px] bg-border" />}
          </Fragment>
        ))}

        <DropdownMenuItem asChild key="logout">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
