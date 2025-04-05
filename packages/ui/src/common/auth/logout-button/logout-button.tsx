'use client';

import { LogOut } from 'lucide-react';
import { mutate } from 'swr';

import { setCookiesService } from '@oe/api/services/cookies';
import { resetAllStores } from '@oe/core/store';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '#shadcn/button';
import { toast } from '#shadcn/sonner';

export function LogoutButton() {
  const tToast = useTranslations('toast');
  const tAuth = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/';

  const handleLogout = async () => {
    try {
      resetAllStores();
      toast.success(tToast('logoutSuccess'));
      await mutate(() => true, undefined, { revalidate: false });
      await setCookiesService(typeof window !== 'undefined' ? window.location.origin : '', [
        {
          key: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY,
          value: '',
          options: {
            maxAge: 0,
          },
        },
        {
          key: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY,
          value: '',
          options: {
            maxAge: 0,
          },
        },
      ]);
      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(tToast('logoutError'));
    }
  };

  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-8 w-full justify-start rounded-xs px-2 py-1.5"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>{tAuth('logout')}</span>
    </Button>
  );
}
