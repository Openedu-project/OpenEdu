import { getOrgByDomainService } from "@oe/api/services/organizations";
import type { IUser } from "@oe/api/types/user";
import { createAPIUrl } from "@oe/api/utils/fetch";
import ProfileCircle from "@oe/assets/icons/profile-circle";
import { getCookie } from "@oe/core/utils/cookie";
import { PLATFORM_ROUTES } from "@oe/core/utils/routes";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { LogoutButton } from "#common/auth/logout-button";
import { Link } from "#common/navigation";
import { UserAvatar } from "#components/user-avatar";
import { Button } from "#shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#shadcn/dropdown-menu";
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

  const visibleMenuItems = MENU_ITEMS(me).filter((item) =>
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
          <span className="hidden max-w-[100px] truncate md:inline-block">
            {me?.display_name?.length > 0 ? me?.display_name : me?.username}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem key="myProfile">
          <Link
            href={createAPIUrl({
              endpoint: PLATFORM_ROUTES.userProfile,
              params: { username: me.username },
            })}
            className="flex h-auto w-full items-center justify-start p-0 text-foreground"
          >
            <ProfileCircle className="mr-2 h-4 w-4" />
            <span>{t("myProfile")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mb-1 h-[1px] bg-neutral-100" />
        {visibleMenuItems.map(({ href, key, icon: Icon, hasSepratePage }) => (
          <Fragment key={key}>
            <DropdownMenuItem>
              <Link
                href={href}
                className="flex h-auto w-full items-center justify-start p-0 text-foreground"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{t(key)}</span>
              </Link>
            </DropdownMenuItem>
            {hasSepratePage && (
              <DropdownMenuSeparator className="mb-1 h-[1px] bg-neutral-100" />
            )}
          </Fragment>
        ))}

        <DropdownMenuItem asChild key="logout">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
