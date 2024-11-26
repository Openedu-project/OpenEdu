'use client';

import { useAcceptUserInvitation } from '@oe/api/hooks/useUser';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { decodedToken } from '@oe/core/utils/decoded-token';
import { AUTH_ROUTES } from '@oe/core/utils/routes';

export default function AcceptUserInvitationContent() {
  const t = useTranslations('acceptUserInvite');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { triggerAcceptUserInvitation } = useAcceptUserInvitation();

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

    triggerAcceptUserInvitation({ token: decodedResult.token })
      .then(res => {
        if (res.require_set_password) {
          const redirectUrl = `${window.location.origin}/organization-blog/my-blog`;
          router.replace(`${AUTH_ROUTES.setPassword}?token=${res.token}&redirect_url=${redirectUrl}&new_user=true`);
        } else {
          // TODO
          // router.push(`${blogRoutes.myOrgBlog()}`);
        }
      })
      .catch(error => {
        console.error('Error accepting user invitation:', error);
      });
  }, [router, triggerAcceptUserInvitation, token]);

  return (
    <div className="flex flex-col">
      <p className="mcaption-regular16 mb-4">{t('desc')}</p>
      <p className="mcaption-regular16">{t('redirectMess')}</p>
    </div>
  );
}
