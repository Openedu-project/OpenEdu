'use client';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { Link } from '#common/navigation';
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

export const LoginRequiredModal = () => {
  const t = useTranslations('loginRequiredModal');
  const tGeneral = useTranslations('general');
  const { isOpen, hasCancel, setLoginRequiredModal } = useLoginRequiredStore();
  const router = useRouter();

  const handleRedirectLogin = () => {
    router.push(AUTH_ROUTES.login);
    setLoginRequiredModal(false);
  };

  const handleRedirectSignUp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(AUTH_ROUTES.signUp);
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
              href={AUTH_ROUTES.signUp}
              onClick={handleRedirectSignUp}
              className="h-auto p-1 text-content-primary-light-600"
            >
              {t('signupLinkText')}
            </Link>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {hasCancel && (
            <AlertDialogCancel onClick={() => setLoginRequiredModal(false)}>{tGeneral('cancel')}</AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleRedirectLogin}>{t('button')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
