import { TabsTrigger } from "@oe/ui/shadcn/tabs";
import { cn } from "@oe/ui/utils/cn";
import { memo } from "react";
import type React from "react";

interface TLaunchpadNavMenuItem {
  value: string;
  label: (color: string) => React.ReactNode;
  disabled?: boolean;
}
interface ClientNavMenuItemProps {
  nav: TLaunchpadNavMenuItem;
}

const iconStyle =
  "text-neutral-600 group-data-[state=active]:text-primary group-hover:text-primary";

const navLinkStyles = {
  base: `
    drop-shadow-none
    relative
    flex
    gap-spacing-sm
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

const ClientNavMenuItem = memo(({ nav }: ClientNavMenuItemProps) => {
  return (
    <TabsTrigger
      disabled
      className={cn(navLinkStyles.base, navLinkStyles.hover)}
      value={nav.value}
    >
      {nav.label(iconStyle)}
    </TabsTrigger>
  );
});

ClientNavMenuItem.displayName = "ClientNavMenuItem";
export default ClientNavMenuItem;
