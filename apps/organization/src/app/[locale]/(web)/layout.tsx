import { getThemeConfigServer } from "@oe/api";
import type { FileType, FooterProps } from "@oe/ui";
import { MainLayout } from "@oe/ui";
import type { NavigationLink } from "@oe/ui";
import type { ISidebarItem } from "@oe/ui";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

export default async function OpeneduLayout({
  children,
  hasFooter,
}: {
  children: ReactNode;
  hasFooter?: boolean;
}) {
  const [tTheme, themeSystem] = await Promise.all([
    getTranslations("themePage"),
    getThemeConfigServer(),
  ]);

  const themeName = themeSystem?.[0]?.value?.activedTheme || "vbi";

  if (!themeSystem?.[0]?.value) {
    return <MainLayout>{children}</MainLayout>;
  }

  const headerProps =
    themeSystem?.[0]?.value?.availableThemes?.[themeName]?.pages?.auth?.config
      ?.header?.props;
  const footerProps = themeSystem?.[0]?.value?.availableThemes?.[themeName]
    ?.pages?.auth?.config?.footer?.props as FooterProps;

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
              colSpan: value?.colSpan ?? 2,
              items:
                value?.items?.map((item: NavigationLink, index: number) => ({
                  id: item?.id,
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
    className: "bg-primary text-foreground",
    variant: "org",
  };

  return (
    <MainLayout
      sidebarItems={sidebarItems}
      logo={headerProps?.logo as FileType}
      footerProps={footerConfig}
      hasFooter={hasFooter}
    >
      {children}
    </MainLayout>
  );
}
