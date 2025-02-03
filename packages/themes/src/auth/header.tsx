'use client';

import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { HeaderClient } from '@oe/ui/common/layout/header';
import type { ISidebarItem } from '@oe/ui/common/layout/sidebar';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { cn } from '@oe/ui/utils/cn';
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
                item.isHighlight && 'bg-gradient-to-b from-[#2CDEE9] to-[#7B5AFF]'
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
export default ThemeHeader;
