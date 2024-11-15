import type { ReactNode } from 'react';

import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { Footer } from '../footer';
import { Header } from '../header';
import type { SidebarItem } from '../sidebar';

export function MainLayout({ children, sidebarItems }: { children: ReactNode; sidebarItems?: SidebarItem[] }) {
  return (
    <>
      <Header sidebarItems={sidebarItems}>
        <HeaderLogo className="w-[115px] md:w-[172px]" />
      </Header>
      {children}
      <Footer />
    </>
  );
}
