import type { ReactNode } from "react";
import { LanguageSwitcher } from "#common/language-switcher";
import { Link } from "#common/navigation";
import { cn } from "#utils/cn";
import { AuthMenu } from "../auth-menu";
import { type ISidebarItem, LayoutSidebar } from "../sidebar";

export function Header({
  sidebarItems,
  subSidebarItems = [],
  pathnamesNoSidebar,
  className,
  children,
  isHideAuthMenu = false,
  isLoggedIn = false,
}: {
  sidebarItems?: ISidebarItem[];
  subSidebarItems?: ISidebarItem[];
  pathnamesNoSidebar?: string[];
  className?: string;
  isHideAuthMenu?: boolean;
  isLoggedIn?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={cn("sticky top-0 left-0 z-50 ", className)}>
      <div className="hidden gap-2 bg-[#1A1A1A] lg:flex">
        {subSidebarItems?.length > 0 &&
          subSidebarItems?.map((item) => (
            <Link
              href={item.href ?? "#"}
              key={item.id}
              className="mcaption-regular16 mx-4 my-1 p-0 text-white"
            >
              {item.label}
            </Link>
          ))}
      </div>

      <div className="flex h-14 w-full shrink-0 items-center gap-1 border-border/40 bg-primary px-3 py-3 shadow md:px-6">
        {sidebarItems && (
          <LayoutSidebar
            items={sidebarItems}
            maxDepth={2}
            pathnamesNoSidebar={pathnamesNoSidebar}
            className="w-full flex-1"
            isDrawer
            isLoggedIn={isLoggedIn}
          />
        )}
        {children}
        {!isHideAuthMenu && <AuthMenu />}
        <LanguageSwitcher className="md:ml-2" />
      </div>
    </header>
  );
}
