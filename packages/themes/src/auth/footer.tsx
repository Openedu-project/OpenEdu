'use client';
import { Footer, type FooterProps } from '@oe/ui/common/layout/footer';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type { SectionComponent } from '../_types/theme-page';

export interface ThemeFooterProps extends FooterProps {}

const ThemeFooter: SectionComponent<'auth', 'footer'> = ({ props }) => {
  const { themeName } = useParams();
  const t = useTranslations(`themePage.${themeName}.auth.footer`);

  const navItems = props?.navigationItems
    ? Object.fromEntries(
        Object.entries(props.navigationItems).map(([key, value]) => [
          key,
          {
            label: t(`navigationItems.${key}.label`),
            colSpan: value?.colSpan,
            items:
              value?.items?.map((item, index) => ({
                href: item.href,
                label: t(`navigationItems.${key}.items.items-${index}.label`),
                icon: item?.icon,
              })) ?? [],
          },
        ])
      )
    : {};

  return <Footer logo={props?.logo} description={props?.description} navigationItems={navItems} />;
};

export default ThemeFooter;
