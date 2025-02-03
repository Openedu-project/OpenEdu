import type { ReactNode } from 'react';

import { HeaderLogo } from '@oe/assets/icons/header-logo';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';
import { Footer, type FooterProps } from '../footer';
import { HeaderClient } from '../header';
import type { ISidebarItem } from '../sidebar';

export function MainLayoutClient({
  children,
  sidebarItems,
  footerProps,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
  footerProps?: FooterProps;
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
        <ul className="ml-6 hidden gap-3 text-primary-foreground md:flex">
          {sidebarItems?.map(item => (
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
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </HeaderClient>
      {children}
      <Footer
        logo={footerProps?.logo}
        description={footerProps?.description}
        navigationItems={footerProps?.navigationItems}
      />
    </>
  );
}
