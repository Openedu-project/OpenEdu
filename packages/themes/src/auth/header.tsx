'use client';

import { HeaderLogo } from '@oe/assets';
import { PLATFORM_ROUTES } from '@oe/core';
import type { FileType } from '@oe/ui';
import type { ISidebarItem } from '@oe/ui';
import { Link } from '@oe/ui';
import { Image } from '@oe/ui';
import { HeaderClient } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type { SectionComponent } from '../_types/theme-page';

export interface ThemeHeaderProps {
  logo?: FileType;
  sidebarItems?: ISidebarItem[];
}

const ThemeHeader: SectionComponent<'auth', 'header'> = ({ props }) => {
  const { themeName } = useParams();
  const t = useTranslations(`themePage.${themeName}.auth.header`);
  return (
    <HeaderClient sidebarItems={props?.sidebarItems} isHideAuthMenu>
      <Link
        href={PLATFORM_ROUTES.homepage}
        className="p-0 hover:bg-transparent"
        variant="ghost"
        activeClassName="border-0"
      >
        {props?.logo?.url ? (
          <Image src={props?.logo?.url} alt="logo" height={props?.logo?.height} width={props?.logo?.width} />
        ) : (
          <HeaderLogo className="w-[115px] md:w-[172px]" />
        )}
      </Link>
      <ul className="ml-6 hidden gap-3 text-primary-foreground md:flex">
        {props?.sidebarItems?.map((item: ISidebarItem, index: number) => (
          <li key={item.id}>
            <Link
              href={item.href ?? ''}
              className={cn(
                'mcaption-semibold14 lg:mcaption-semibold16 p-2 hover:bg-transparent hover:p-2 hover:text-primary-foreground hover:underline',
                item.isHighlight && 'bg-gradient-to-b from-turquoise-500 to-violet-500'
              )}
              variant="ghost"
              activeClassName="border-0"
            >
              {t(`sidebarItems.sidebarItems-${index}.label`) ?? item.label}
            </Link>
          </li>
        ))}
      </ul>
    </HeaderClient>
  );
};

export { ThemeHeader };
