'use client';

import { API_ENDPOINT } from '@oe/api';
import { logoutAction } from '@oe/api';
import { resetAllStores } from '@oe/core';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mutate } from 'swr';
import { Button } from '#shadcn/button';
import { toast } from '#shadcn/sonner';

export function LogoutButton() {
  const tToast = useTranslations('toast');
  const tAuth = useTranslations('auth');
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const nextPath = searchParams.get("next") ?? "/";

  const handleLogout = async () => {
    try {
      await logoutAction();
      await Promise.all([mutate(API_ENDPOINT.USERS_ME), mutate(() => true, undefined, { revalidate: false })]);
      resetAllStores();
      toast.success(tToast('logoutSuccess'));
      // router.replace(nextPath);
      // router.refresh();
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
