'use client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '#common/navigation';

export function AuthButtons() {
  const pathname = usePathname();
  const tAuth = useTranslations('auth');

  return (
    <>
      <Link href={`/login?next=${pathname}`} variant="ghost">
        {tAuth('login')}
      </Link>
      <Link href={`/signup?next=${pathname}`} variant="default">
        {tAuth('signUp')}
      </Link>
    </>
  );
}
