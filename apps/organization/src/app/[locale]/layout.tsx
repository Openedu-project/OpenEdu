import type { Metadata } from 'next';
// import localFont from 'next/font/local';

import { fonts, getMetadata } from '@oe/themes';
import { Provider } from '@oe/ui/common/providers';
import { Toaster } from '@oe/ui/shadcn/sonner';
import { getLocale, getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import { getThemeConfigServer } from '@oe/api/services/theme';
import { WebViewHandler } from '@oe/ui/components/webview-handler';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export async function generateMetadata(): Promise<Metadata> {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return getMetadata(themeSystem?.[0]?.value);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [locale, messages, themeSystem] = await Promise.all([getLocale(), getMessages(), getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme ?? 'academia';

  if (!themeSystem?.[0]?.value) {
    return null;
  }

  const fontVariables = Object.values(fonts)
    .map(font => font.variable)
    .join(' ');

  return (
    <html lang={locale ?? 'en'} suppressHydrationWarning className={fontVariables}>
      <body className="scrollbar font-primary antialiased">
        <Provider
          messages={messages ?? {}}
          locale={locale}
          theme={themeSystem?.[0]?.value?.availableThemes?.[themeName]}
        >
          <WebViewHandler />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
