'use client';
import { AUTH_ROUTES } from '@oe/core';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { Link } from '#common/navigation';

export function AuthButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextPath = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;
  const tAuth = useTranslations('auth.btn');

  return (
    <>
      <Link
        href={`${AUTH_ROUTES.login}?next=${nextPath}`}
        variant="secondary"
        size="xs"
        className="px-1 text-xs md:px-3 md:text-sm"
      >
        {tAuth('login')}
      </Link>
      <Link
        href={`${AUTH_ROUTES.signUp}?next=${nextPath}`}
        variant="default"
        size="xs"
        className="px-1 text-xs md:px-3 md:text-sm"
      >
        {tAuth('signUp')}
      </Link>
    </>
  );
}
