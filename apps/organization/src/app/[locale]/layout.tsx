import type { Metadata } from "next";
// import localFont from 'next/font/local';

import { fonts, getMetadata } from "@oe/themes";
import { Provider } from "@oe/ui/common/providers";
import { Toaster } from "@oe/ui/shadcn/sonner";
import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";

import { getThemeConfigServer } from "@oe/api/services/theme";
import { ThemeProvider } from "@oe/themes/common/provider/theme-provider";
import { LogRocketHandler } from "@oe/ui/components/logrocket-handler";
import { WebViewHandler } from "@oe/ui/components/webview-handler";
import Script from "next/script";
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
  const [locale, messages, themeSystem] = await Promise.all([
    getLocale(),
    getMessages(),
    getThemeConfigServer(),
  ]);
  const themeName = themeSystem?.[0]?.value?.activedTheme ?? "vbi";

  const fontVariables = Object.values(fonts)
    .map((font) => font.variable)
    .join(" ");

  return (
    <html
      lang={locale ?? "en"}
      suppressHydrationWarning
      className={fontVariables}
    >
      <header>
        <Script id="microsoft-clarity">
          {` (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "qpk1sozolu"); `}
        </Script>
      </header>
      <body className="scrollbar font-primary antialiased">
        <Provider messages={messages ?? {}} locale={locale}>
          <LogRocketHandler />

          <WebViewHandler />

          <ThemeProvider
            theme={themeSystem?.[0]?.value?.availableThemes?.[themeName]}
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
