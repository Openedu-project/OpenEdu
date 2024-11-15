'use client';

import { logoutAction } from '@oe/api/actions/auth';
import { LogOut } from 'lucide-react';
import { mutate } from 'swr';

import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { toast } from '#shadcn/sonner';

export function LogoutButton() {
  const tToast = useTranslations('toast');
  const tAuth = useTranslations('auth');

  const handleLogout = async () => {
    await Promise.all([logoutAction(), mutate(() => true, undefined, { revalidate: false })]);
    toast.success(tToast('logoutSuccess'));
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
