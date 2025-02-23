"use client";
import OpeneduLogo from "@oe/assets/images/logo-openedu.png";
import OpeneduLogoMobile from "@oe/assets/images/openedu-homepage/logo-openedu-mobile.png";
import { PLATFORM_ROUTES } from "@oe/core/utils/routes";
import { Image } from "#components/image";
import type { FileType } from "#components/uploader";

import { Link } from "#common/navigation";
import { useIsMobile } from "#shadcn/use-mobile";

const Logo = ({ logo }: { logo?: FileType }) => {
  const mobile = useIsMobile();

  return (
    <Link
      href={PLATFORM_ROUTES.homepage}
      className="w-[57px] min-w-[57px] p-0 hover:bg-transparent md:w-[172px]"
      variant="ghost"
      activeClassName="border-0"
    >
      <Image
        src={logo?.url ? logo?.url : (mobile ? OpeneduLogoMobile?.src : OpeneduLogo?.src)}
        alt="OpenEdu"
        width={logo?.width ?? mobile ? 57 : 172}
        height={logo?.height ?? 40}
        className="!h-8 object-contain"
        priority
      />
    </Link>
  );
};

Logo.displayName = "Logo";
export { Logo };
