'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAcceptInvitation } from '@oe/api/hooks/useCreator';
import { decodedToken } from '@oe/core/utils/decoded-token';
import { AUTH_ROUTES, CREATOR_ROUTES } from '@oe/core/utils/routes';
import { useRouter } from '@oe/ui/common/navigation';

export default function AcceptInvitationContent() {
  const t = useTranslations('acceptCreatorInvite');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { triggerAcceptInvitation } = useAcceptInvitation();

  useEffect(() => {
    if (!token) {
      console.error('No token provided');
      return;
    }

    const decodedResult = decodedToken(token);

    if (!decodedResult?.token) {
      console.error('Invalid or missing token in decoded result');
      return;
    }

    triggerAcceptInvitation({ token: decodedResult.token })
      .then(res => {
        if (res.require_set_password) {
          const redirectUrl = new URL('/admin', window.location.origin).toString();
          router.replace(`${AUTH_ROUTES.setPassword}?token=${res.token}&redirect_url=${redirectUrl}&new_user=true`);
        } else {
          router.push(CREATOR_ROUTES.dashboard);
        }
      })
      .catch(error => {
        console.error('Error accepting invitation:', error);
      });
  }, [router, triggerAcceptInvitation, token]);

  return (
    <div className="flex flex-col ">
      <p className="mcaption-regular16 mb-4">{t('desc')}</p>
      <p className="mcaption-regular16">{t('redirectMess')}</p>
    </div>
  );
}
