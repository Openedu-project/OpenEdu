import Discord from "@oe/assets/icons/social-icon/discord";
import Facebook from "@oe/assets/icons/social-icon/facebook";
import Telegram from "@oe/assets/icons/social-icon/telegram";
import OpeneduLogo from "@oe/assets/images/logo-openedu-2.png";
import { useTranslations } from "next-intl";
import type React from "react";
import { Link } from "#common/navigation";
import { Image } from "#components/image";
import type { FileType } from "#components/uploader";
interface NavigationLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavigationItem {
  label?: string;
  colSpan?: number;
  items?: NavigationLink[];
}
export interface FooterProps {
  logo?: FileType;
  navigationItems?: Record<string, NavigationItem>;
  description?: string;
}

export function Footer({ logo, navigationItems, description }: FooterProps) {
  const t = useTranslations("footer");

  const openEduNavigationItem = {
    registration: {
      label: t("navigation.registration.title"),
      colSpan: 3,
      items: [
        {
          href: "/become-creator",
          label: t("navigation.registration.becomeEducators"),
        },
        {
          href: "/become-writer",
          label: t("navigation.registration.becomeLearners"),
        },
        {
          href: "/organization",
          label: t("navigation.registration.becomeOrganizations"),
        },
      ],
    },
    terms: {
      label: t("navigation.terms.title"),
      colSpan: 3,
      items: [
        { href: "/terms", label: t("navigation.terms.tnc") },
        { href: "/faq", label: t("navigation.terms.faq") },
      ],
    },
    social: {
      label: t("navigation.social.title"),
      colSpan: 2,
      items: [
        {
          href: "https://discord.com/invite/hWq4TXEDxW",
          icon: Discord,
          label: t("navigation.social.discord"),
        },
        {
          href: "https://t.me/+z2s3BWk8jZhkNzY1",
          icon: Telegram,
          label: t("navigation.social.telegram"),
        },
        {
          href: "https://www.facebook.com/openedu101",
          icon: Facebook,
          label: t("navigation.social.facebook"),
        },
      ],
    },
  };

  return (
    <footer className="w-full bg-[linear-gradient(255deg,_#B8F4F8_6.18%,_#EDE3FE_70.53%)] px-4 py-8 lg:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
          <div className="w-full lg:col-span-4">
            <Link
              href="/"
              className="mb-6 flex items-center gap-2 border-none p-0"
            >
              <div className="mr-auto w-[115px] md:w-[172px]">
                {logo ? (
                  <Image
                    src={logo.url}
                    alt="Logo"
                    align="start"
                    width={logo.width}
                    height={logo.height}
                    className="w-[115px] min-w-[115px] md:w-[172px]"
                  />
                ) : (
                  <Image
                    src={OpeneduLogo.src}
                    alt="OpenEdu"
                    align="start"
                    width={172}
                    height={40}
                    className="w-[115px] min-w-[115px] md:w-[172px]"
                  />
                )}{" "}
              </div>
            </Link>

            <div className="mcaption-regular16 max-w-sm">
              {description ||
                t.rich("description", {
                  emphasis: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                  break: () => <br />,
                })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-8">
            {Object.entries(navigationItems || openEduNavigationItem).map(
              ([key, section]) => (
                <div key={key} className={`lg:col-span-${section.colSpan}`}>
                  <h3 className="mbutton-semibold16 mb-4">{section.label}</h3>
                  <ul className="space-y-1">
                    {section.items.map((link: NavigationLink) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mcaption-regular16 p-0 text-[#464646] transition-colors hover:text-[#2B3674]"
                        >
                          {link.icon && <link.icon className="h-5 w-5 mr-2" />}
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
