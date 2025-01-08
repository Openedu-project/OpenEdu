import type { ReactNode } from "react";

import { HeaderLogo } from "@oe/assets/icons/header-logo";
import { PLATFORM_ROUTES } from "@oe/core/utils/routes";
import { Link } from "#common/navigation";
import { LoginWarningModal } from "#components/login-required-modal";
import { Footer } from "../footer";
import { Header } from "../header";
import type { ISidebarItem } from "../sidebar";

export function MainLayout({
  children,
  sidebarItems,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
}) {
  return (
    <>
      <Header sidebarItems={sidebarItems}>
        <Link
          href={PLATFORM_ROUTES.homepage}
          className="p-0 hover:bg-transparent"
          variant="ghost"
          activeClassName="border-0"
        >
          <HeaderLogo className="w-[115px] md:w-[172px]" />
        </Link>
      </Header>
      {children}
      <LoginWarningModal />
      <Footer />
    </>
  );
}
