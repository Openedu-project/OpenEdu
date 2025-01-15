'use client';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '#common/navigation';

export function AuthButtons() {
  const pathname = usePathname();
  const tAuth = useTranslations('auth');

  return (
    <>
      <Link href={`${AUTH_ROUTES.login}?next=${pathname}`} variant="secondary">
        {tAuth('signin.title')}
      </Link>
      <Link href={`${AUTH_ROUTES.signUp}?next=${pathname}`} variant="default">
        {tAuth('signup.title')}
      </Link>
    </>
  );
}
