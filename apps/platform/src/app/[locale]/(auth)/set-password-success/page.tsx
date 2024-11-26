import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import AuthCard from '../_components/auth-card';

export const metadata: Metadata = {
  title: 'Set Password Successfull',
};

export default function SetPasswordSuccessfull() {
  const t = useTranslations('setPasswordSuccess');

  return (
    <AuthCard title={t('title')}>
      <div className="flex flex-col">
        <h3 className="mcaption-regular16 text-text-content-neutral-color-content-neutral-light600">
          {t('congratTitle')}
        </h3>
        <Link href={AUTH_ROUTES.login} className="mt-[32px] max-w-[120px]">
          {t('login')}
        </Link>
      </div>
    </AuthCard>
  );
}
