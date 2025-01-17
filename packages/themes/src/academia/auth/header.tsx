'use client';

import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { HeaderClient } from '@oe/ui/common/layout/header';
import type { ISidebarItem } from '@oe/ui/common/layout/sidebar';
import { Link } from '@oe/ui/common/navigation';
import type { SectionComponent } from '../../_types/theme-page';

export interface VbiHeaderProps {
  sidebarItems?: ISidebarItem[];
}

const VbiHeader: SectionComponent<'auth', 'header'> = ({ props }) => {
  return (
    <HeaderClient sidebarItems={props?.sidebarItems}>
      <Link
        href={PLATFORM_ROUTES.homepage}
        className="p-0 hover:bg-transparent"
        variant="ghost"
        activeClassName="border-0"
      >
        <HeaderLogo className="w-[115px] md:w-[172px]" />
      </Link>
    </HeaderClient>
  );
};
export default VbiHeader;
