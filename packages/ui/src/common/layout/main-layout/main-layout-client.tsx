import type { ReactNode } from 'react';

import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '#common/navigation';
import { Footer } from '../footer';
import { HeaderClient } from '../header';
import type { ISidebarItem } from '../sidebar';

export function MainLayoutClient({
  children,
  sidebarItems,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
}) {
  return (
    <>
      <HeaderClient sidebarItems={sidebarItems}>
        <Link
          href={PLATFORM_ROUTES.homepage}
          className="p-0 hover:bg-transparent"
          variant="ghost"
          activeClassName="border-0"
        >
          <HeaderLogo className="w-[115px] md:w-[172px]" />
        </Link>
      </HeaderClient>
      {children}
      <Footer />
    </>
  );
}
