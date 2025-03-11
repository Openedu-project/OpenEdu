import type { ReactNode } from "react";

import OpeneduLogo from "@oe/assets/images/logo-openedu.png";

import { Link } from "#common/navigation";
import { Image } from "#components/image";
import type { FileType } from "#components/uploader";
import { cn } from "#utils/cn";
import { Footer, type FooterProps } from "../footer";
import { HeaderClient } from "../header";
import type { ISidebarItem } from "../sidebar";

export function MainLayoutClient({
  children,
  sidebarItems,
  footerProps,
  logo,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
  footerProps?: FooterProps;
  logo?: FileType;
}) {
  return (
    <>
      <HeaderClient sidebarItems={sidebarItems}>
        <Link
          href="#"
          className="w-[115px] min-w-[115px] p-0 hover:bg-transparent md:w-[172px]"
          variant="ghost"
          activeClassName="border-0"
        >
          <Image
            src={logo?.url ?? OpeneduLogo.src}
            alt="OpenEdu"
            width={logo?.width ?? 172}
            height={logo?.height ?? 40}
            className="!h-8 object-contain"
            priority
          />
        </Link>
        <ul className="ml-6 hidden gap-3 text-primary-foreground md:flex">
          {sidebarItems?.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href ?? ""}
                className={cn(
                  "mcaption-semibold14 lg:mcaption-semibold16 p-2 hover:bg-transparent hover:p-2 hover:text-primary-foreground hover:underline",
                  item.isHighlight &&
                    "bg-gradient-to-b from-[#2CDEE9] to-violet-500"
                )}
                variant="ghost"
                activeClassName="border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </HeaderClient>
      {children}
      <Footer
        logo={footerProps?.logo}
        description={footerProps?.description}
        navigationItems={footerProps?.navigationItems}
        className={footerProps?.className}
        variant={footerProps?.variant}
      />
    </>
  );
}
