'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

export default function SocketProvider() {
  const { dataMe: me, mutateMe } = useGetMe();
  const pathName = usePathname();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    router.refresh();
  }, [mutateMe, pathName, router]);

  useEffect(() => {
    if (me) {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY as string);
      setAccessToken(typeof token === 'string' ? token : '');
    } else {
      setAccessToken('');
    }
  }, [me]);

  useSocket(accessToken);

  return null;
}
