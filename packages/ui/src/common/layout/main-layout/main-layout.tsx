import OpeneduLogo from '@oe/assets/images/logo-openedu.png';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import type { ReactNode } from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { LoginWarningModal } from '#components/login-required-modal';
import { cn } from '#utils/cn';
import { Footer } from '../footer';
import { Header } from '../header';
import type { ISidebarItem } from '../sidebar';

export function MainLayout({
  children,
  sidebarItems,
}: {
  children: ReactNode;
  sidebarItems?: ISidebarItem[];
}) {
  return (
    <>
      <Header sidebarItems={sidebarItems}>
        <Link
          href={PLATFORM_ROUTES.homepage}
          className="p-0 hover:bg-transparent"
          variant="ghost"
          activeClassName="border-0"
        >
          <Image
            src={OpeneduLogo.src}
            alt="OpenEdu"
            width={172}
            height={40}
            className="w-[115px] min-w-[115px] md:w-[172px]"
          />
        </Link>

        <ul className="ml-6 hidden gap-3 text-primary-foreground md:flex">
          {sidebarItems?.map((item) => (
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
      </Header>
      {children}
      <LoginWarningModal />
      <Footer />
    </>
  );
}
