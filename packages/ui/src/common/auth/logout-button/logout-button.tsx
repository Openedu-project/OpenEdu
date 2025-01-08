'use client';

import { LogOut } from 'lucide-react';
import { mutate } from 'swr';
import { logoutAction } from '../_action/logout-action';

import { resetAllStores } from '@oe/core/store';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { toast } from '#shadcn/sonner';

export function LogoutButton() {
  const tToast = useTranslations('toast');
  const tAuth = useTranslations('auth');

  const handleLogout = async () => {
    resetAllStores();
    toast.success(tToast('logoutSuccess'));
    await mutate(() => true, undefined, { revalidate: false });
    await logoutAction();
  };

  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-8 w-full justify-start rounded-sm px-2 py-1.5"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>{tAuth('logout')}</span>
    </Button>
  );
}
