/* eslint-disable prefer-destructuring */
// app/components/WebViewHandler.tsx
'use client';

import { Button } from '@oe/ui/shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const webViewPattern = /webview|wv|ip((?!.*safari)|(?=.*like safari))/i;
const telegramPattern = /telegram|tgweb/i;

const WebViewHandler = () => {
  const t = useTranslations('webview');
  const [isWebView, setIsWebView] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkIsWebView = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();

      return webViewPattern.test(userAgent) || telegramPattern.test(userAgent);
    };

    if (checkIsWebView()) {
      setIsWebView(true);
    }
  }, []);

  const openInBrowser = () => {
    const currentUrl = window.location.href;
    const { host, search } = window.location;
    const path = pathname;

    // Tạo mảng các URL cho các trình duyệt khác nhau
    const browserUrls = [
      currentUrl,
      `intent://${host}${path}${search}#Intent;scheme=https;package=com.android.chrome;end`,
      `x-safari-https://${host}${path}${search}`,
      `googlechrome://${host}${path}${search}`,
      `firefox://open-url?url=${encodeURIComponent(currentUrl)}`,
      `opera://open-url?url=${encodeURIComponent(currentUrl)}`,
      `samsunginternet://open-url?url=${encodeURIComponent(currentUrl)}`,
      `microsoft-edge://${host}${path}${search}`,
      `brave://${host}${path}${search}`,
    ];

    // Hàm thử mở từng trình duyệt
    const tryNextBrowser = (index = 0) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (index >= browserUrls.length) {
        // Nếu không có trình duyệt nào mở được, quay lại URL đầu tiên
        window.location.href = browserUrls[0] ?? '';
        return;
      }

      try {
        const url = browserUrls[index];
        if (url) {
          window.location.href = url;
          // Thử trình duyệt tiếp theo sau một khoảng thời gian
          setTimeout(() => tryNextBrowser(index + 1), 500);
        }
      } catch {
        // Nếu có lỗi, thử trình duyệt tiếp theo
        tryNextBrowser(index + 1);
      }
    };

    // Bắt đầu thử các trình duyệt
    tryNextBrowser();
  };

  if (!isWebView) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <Button variant="default" onClick={openInBrowser} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            {t('title')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebViewHandler;
