'use client';

import type { SocialProvider } from '@oe/api';
import { GoogleIcon } from '@oe/assets';
import { getCookie } from '@oe/core';
import { isWebview } from '@oe/core';
import { AUTH_ROUTES } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '#shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '#shadcn/dialog';

const createHref = async (provider: SocialProvider) => {
  const referrer = await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY);
  const inviteRefCode = await getCookie(process.env.NEXT_PUBLIC_COOKIE_INVITE_REF_CODE);
  const url = new URL(process.env.NEXT_PUBLIC_APP_ORIGIN);

  url.pathname = AUTH_ROUTES.socialLogin;
  url.searchParams.set('provider', provider);
  if (referrer) {
    url.searchParams.set('referrer', referrer);
  }
  if (inviteRefCode) {
    url.searchParams.set('inviteRefCode', inviteRefCode);
  }
  url.searchParams.set('origin_url', window.location.href);

  return url.toString();
};

const regex = /^https?:\/\//;

export function AuthSocialButtons() {
  const tSocial = useTranslations('auth.social');
  const [showDialog, setShowDialog] = useState(false);

  const openInBrowser = () => {
    const currentUrl = window.location.href;
    const urlWithoutHttp = currentUrl.replace(regex, '');

    const browserUrls = [
      // Android Chrome/Samsung Browser
      `intent://${urlWithoutHttp}#Intent;scheme=https;package=com.android.chrome;end`,
      // iOS Safari
      `x-safari-https://${urlWithoutHttp}`,
      // Chrome
      `googlechrome://${urlWithoutHttp}`,
      `googlechromes://${urlWithoutHttp}`,
      // Firefox
      `firefox://open-url?url=${encodeURIComponent(currentUrl)}`,
      // Opera
      `opera://open-url?url=${encodeURIComponent(currentUrl)}`,
      // Samsung Internet
      `samsunginternet://open-url?url=${encodeURIComponent(currentUrl)}`,
      // Microsoft Edge
      `microsoft-edge://${urlWithoutHttp}`,
      `microsoft-edge-https://${urlWithoutHttp}`,
      // Brave
      `brave://${urlWithoutHttp}`,
    ];

    let opened = false;
    const tryOpenUrl = (url: string) => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      opened = true;
    };

    for (const url of browserUrls) {
      try {
        tryOpenUrl(url);
        setTimeout(() => {
          if (!document.hidden) {
            opened = false;
          }
        }, 100);
      } catch (e) {
        console.error('Cannot open browser:', e);
      }
    }

    setTimeout(() => {
      if (!opened) {
        setShowDialog(true);
      }
    }, 500);
  };

  const handleClick = async (provider: SocialProvider) => {
    if (isWebview()) {
      openInBrowser();
    } else {
      const href = await createHref(provider);
      window.location.href = href;
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(tSocial('copyUrlSuccess'));
  };

  return (
    <>
      <Button onClick={() => handleClick('google')} className="flex w-full items-center gap-2 p-0" variant="outline">
        <GoogleIcon width={20} height={20} />
        <span className="giant-iheading-regular16">{tSocial('signInWithGoogleButton')}</span>
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="w-full max-w-[90%]">
          <DialogHeader>
            <DialogTitle>{tSocial('dialogTitle')}</DialogTitle>
            <DialogDescription>{tSocial('dialogDescription')}</DialogDescription>
          </DialogHeader>
          <Button onClick={copyUrl}>{tSocial('copyUrlButton')}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
