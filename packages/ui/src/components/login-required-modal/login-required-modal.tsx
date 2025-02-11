'use client';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { Link, usePathname } from '#common/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#shadcn/alert-dialog';
import { useLoginRequiredStore } from './_store';

export const LoginWarningModal = () => {
  const t = useTranslations('loginRequiredModal');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextPath = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;

  const { isOpen, hasCancel, setLoginRequiredModal } = useLoginRequiredStore();

  const handleRedirectLogin = () => {
    // router.push(`${AUTH_ROUTES.login}?next=${nextPath}`);
    setLoginRequiredModal(false);
  };

  const handleRedirectSignUp = () => {
    // e.preventDefault();
    // router.push(`${AUTH_ROUTES.signUp}?next=${nextPath}`);

    setLoginRequiredModal(false);
  };

  const handleOpenChange = (open: boolean) => {
    setLoginRequiredModal(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertTriangle className="mb-4 h-12 w-12 animate-pulse text-yellow-500" />
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('desc')}
            <Link
              href={`${AUTH_ROUTES.signUp}?next=${nextPath}`}
              onClick={handleRedirectSignUp}
              className="ml-1 p-0 text-primary hover:underline"
            >
              {t('signupLinkText')}
            </Link>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {hasCancel && (
            <AlertDialogCancel onClick={() => setLoginRequiredModal(false)}>{t('cancel')}</AlertDialogCancel>
          )}
          <AlertDialogAction asChild>
            <Link
              href={`${AUTH_ROUTES.login}?next=${nextPath}`}
              onClick={handleRedirectLogin}
              variant="default"
              className="hover:no-underline"
            >
              {t('button')}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
