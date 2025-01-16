import { ChevronDown } from "lucide-react";
import { Button } from "#shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#shadcn/dropdown-menu";

import { getOrgByDomainService } from "@oe/api/services/organizations";
import type { IUser } from "@oe/api/types/user";
import { getCookie } from "@oe/core/utils/cookie";
import { getTranslations } from "next-intl/server";
import { LogoutButton } from "#common/auth/logout-button";
import { Link } from "#common/navigation";
import { UserAvatar } from "#components/user-avatar";
import { MENU_ITEMS } from "./constants";

export async function UserMenu({ me }: { me: IUser }) {
  const domain =
    (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? "";

  const [t, orgData] = await Promise.all([
    getTranslations("userMenu"),
    getOrgByDomainService(undefined, {
      domain,
    }),
  ]);

  const userRolesForOrg = me.roles
    .filter((role) => role.org_id === orgData?.id)
    .map((role) => role.role_id);

  const hasAccess = (requiredRoles: string[]) =>
    requiredRoles.some((role) => userRolesForOrg.includes(role));

  const visibleMenuItems = MENU_ITEMS.filter((item) =>
    hasAccess(item.requiredRoles)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <UserAvatar
            src={me?.avatar ?? ""}
            name={
              me?.display_name?.length > 0 ? me?.display_name : me?.username
            }
          />
          <span>
            {me?.display_name?.length > 0 ? me?.display_name : me?.username}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {visibleMenuItems.map(({ href, key, icon: Icon }) => (
          <DropdownMenuItem key={key}>
            <Link
              href={href}
              className="flex h-auto w-full items-center justify-start p-1 text-foreground"
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{t(key)}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
