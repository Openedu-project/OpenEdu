import { MainLayoutClient } from "@oe/ui/common/layout";
import type { NavigationLink } from "@oe/ui/common/layout/footer";
import type { ISidebarItem } from "@oe/ui/common/layout/sidebar";
import type { FileType } from "@oe/ui/components/uploader";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { ThemeDefinition, ThemeName } from "../../../_types";

interface ThemeLayoutProps {
  themeDefinition?: ThemeDefinition;
  themeName: ThemeName;
  children: ReactNode;
}
const ThemeLayout = ({
  themeDefinition,
  themeName,
  children,
}: ThemeLayoutProps) => {
  const tTheme = useTranslations("themePage");
  const headerProps = themeDefinition?.pages?.auth?.config?.header?.props;
  const footerProps = themeDefinition?.pages?.auth?.config?.footer?.props;

  const sidebarItems = (headerProps?.sidebarItems as ISidebarItem[])?.map(
    (item, index) => ({
      id: item.id,
      label: tTheme(
        `${themeName}.auth.header.sidebarItems.sidebarItems-${index}.label`
      ),
      href: item?.href ?? "#",
      isHighlight: item?.isHighlight,
    })
  );

  const footerConfig = {
    logo: footerProps?.logo as FileType,
    description: tTheme(`${themeName}.auth.footer.description`),
    navigationItems: footerProps?.navigationItems
      ? Object.fromEntries(
          Object.entries(footerProps.navigationItems).map(([key, value]) => [
            key,
            {
              label: tTheme(
                `${themeName}.auth.footer.navigationItems.${key}.label`
              ),
              colSpan: value?.colSpan,
              items:
                value?.items?.map((item: NavigationLink, index: number) => ({
                  href: item.href,
                  label: tTheme(
                    `${themeName}.auth.footer.navigationItems.${key}.items.items-${index}.label`
                  ),
                  icon: item?.icon,
                })) ?? [],
            },
          ])
        )
      : {},
  };

  return (
    <MainLayoutClient
      sidebarItems={sidebarItems}
      logo={headerProps?.logo as FileType}
      footerProps={footerConfig}
    >
      {children}
    </MainLayoutClient>
  );
};

export default ThemeLayout;
