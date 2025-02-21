import { isLogin } from "@oe/api/utils/auth";
import type { ReactNode } from "react";
import { Link } from "#common/navigation";
import { LoginWarningModal } from "#components/login-required-modal";
import type { FileType } from "#components/uploader";
import { cn } from "#utils/cn";
import { Footer, type FooterProps } from "../footer";
import { Header } from "../header";
import type { ISidebarItem } from "../sidebar";
import { Logo } from "./logo";

export async function MainLayout({
  children,
  sidebarItems,
  footerProps,
  logo,
  subSidebarItems,
  hasFooter = true,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
  subSidebarItems?: ISidebarItem[];
  footerProps?: FooterProps;
  logo?: FileType;
  hasFooter?: boolean;
}) {
  const isLoggedIn = await isLogin();

  return (
    <>
      <Header
        sidebarItems={sidebarItems}
        subSidebarItems={subSidebarItems}
        isLoggedIn={isLoggedIn}
      >
        <Logo logo={logo} />
        <ul className="ml-6 hidden gap-3 text-primary-foreground md:flex">
          {sidebarItems?.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href ?? ""}
                disabled={item.isLoginRequired && !isLoggedIn}
                className={cn(
                  "mcaption-semibold14 lg:mcaption-semibold16 p-2 hover:bg-transparent hover:p-2 hover:text-primary-foreground hover:underline",
                  item.isHighlight &&
                    "bg-gradient-to-b from-turquoise-500 to-violet-500"
                )}
                variant="ghost"
                activeClassName="border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Header>
      {children}
      <LoginWarningModal />
      {hasFooter && (
        <Footer
          logo={footerProps?.logo}
          description={footerProps?.description}
          navigationItems={footerProps?.navigationItems}
          className={footerProps?.className}
          variant={footerProps?.variant}
        />
      )}
    </>
  );
}
