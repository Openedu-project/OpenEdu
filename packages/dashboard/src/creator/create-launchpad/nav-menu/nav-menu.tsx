import type { ILaunchpadTabsType } from "@oe/api/types/launchpad";
import {
  Funding,
  GeneralInfor,
  OwnerAndCollabs,
  Payment,
  Voting,
} from "@oe/assets/icons/launchpad-menu-tabs";
import { FormTabsList } from "@oe/ui/components/form-wrapper";
import { ScrollArea, ScrollBar } from "@oe/ui/shadcn/scroll-area";
import { useTranslations } from "next-intl";
import type React from "react";
import { useMemo } from "react";
import ClientNavMenuItem from "./client-nav-menu-item";

interface TLaunchpadTabItem {
  value: ILaunchpadTabsType;
  label: (color: string) => React.ReactNode;
  disabled?: boolean;
}

const LaunchpadNavMenu = () => {
  const tLaunchpadMenu = useTranslations("creatorSettingLaunchpad.menu");

  const navLabel: TLaunchpadTabItem[] = useMemo(
    () => [
      {
        value: "general-information",
        label: (className = "text-neutral-600") => (
          <div className="flex items-center gap-1">
            <GeneralInfor className={className} />
            <span>{tLaunchpadMenu("generalInfo")}</span>
          </div>
        ),
        disabled: true,
      },
      {
        value: "funding-goal",
        label: (className = "text-neutral-600") => (
          <div className="flex items-center gap-1">
            <Funding className={className} />
            <span>{tLaunchpadMenu("fundingGoal")}</span>
          </div>
        ),
        disabled: true,
      },
      {
        value: "voting-plan",
        label: (className = "text-neutral-600") => (
          <div className="flex items-center gap-1">
            <Voting className={className} />
            <span>{tLaunchpadMenu("votingPlan")}</span>
          </div>
        ),
        disabled: true,
      },
      {
        value: "owner-and-collaborators",
        label: (className = "text-neutral-600") => (
          <div className="flex items-center gap-1">
            <OwnerAndCollabs className={className} />
            <span>{tLaunchpadMenu("ownerAndCollabs")}</span>
          </div>
        ),
        disabled: true,
      },
      {
        value: "payment-method",
        label: (className = "text-neutral-600") => (
          <div className="flex items-center gap-1">
            <Payment className={className} />
            <span>{tLaunchpadMenu("paymentMethod")}</span>
          </div>
        ),
        disabled: true,
      },
    ],
    [tLaunchpadMenu]
  );

  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap rounded-b-radius-m bg-white">
        <FormTabsList className="flex h-fit w-full justify-start gap-spacing-sm rounded-none bg-transparent bg-white pb-3">
          {navLabel.map((nav) => (
            <ClientNavMenuItem key={nav.value} nav={nav} />
          ))}
        </FormTabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

LaunchpadNavMenu.displayName = "LaunchpadNavMenu";

export { LaunchpadNavMenu, type TLaunchpadTabItem };
