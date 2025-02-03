import { getThemeConfigServer } from '@oe/api/services/theme';
import { MainLayout } from '@oe/ui/common/layout';
import type { NavigationLink } from '@oe/ui/common/layout/footer';
import type { ISidebarItem } from '@oe/ui/common/layout/sidebar';
import type { FileType } from '@oe/ui/components/uploader';
import { getTranslations } from 'next-intl/server';

import type { ReactNode } from 'react';

export default async function OpeneduLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [tTheme, themeSystem] = await Promise.all([getTranslations('themePage'), getThemeConfigServer()]);

  const themeName = themeSystem?.[0]?.value?.activedTheme || 'vbi';

  if (!themeSystem?.[0]?.value) {
    return null;
  }

  const headerProps = themeSystem?.[0]?.value?.availableThemes?.[themeName]?.pages?.auth?.config?.header?.props;
  const footerProps = themeSystem?.[0]?.value?.availableThemes?.[themeName]?.pages?.auth?.config?.footer?.props;

  const sidebarItems = (headerProps?.sidebarItems as ISidebarItem[])?.map((item, index) => ({
    id: item.id,
    label: tTheme(`${themeName}.auth.header.sidebarItems.sidebarItems-${index}.label`),
    href: item?.href ?? '#',
    isHighlight: item?.isHighlight,
  }));

  const footerConfig = {
    logo: footerProps?.logo as FileType,
    description: tTheme(`${themeName}.auth.footer.description`),
    navigationItems: footerProps?.navigationItems
      ? Object.fromEntries(
          Object.entries(footerProps.navigationItems).map(([key, value]) => [
            key,
            {
              label: tTheme(`${themeName}.auth.footer.navigationItems.${key}.label`),
              colSpan: value?.colSpan,
              items:
                value?.items?.map((item: NavigationLink, index: number) => ({
                  href: item.href,
                  label: tTheme(`${themeName}.auth.footer.navigationItems.${key}.items.items-${index}.label`),
                  icon: item?.icon,
                })) ?? [],
            },
          ])
        )
      : {},
  };

  return (
    <MainLayout sidebarItems={sidebarItems} logo={headerProps?.logo as FileType} footerProps={footerConfig}>
      {children}
    </MainLayout>
  );
}
