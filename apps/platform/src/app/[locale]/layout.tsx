import { fonts } from "@oe/themes";

import "@oe/core/global.css";
import type { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";
import Favicon from "@oe/assets/images/favicon.png";
import { Provider } from "@oe/ui/common/providers";
import { LogRocketHandler } from "@oe/ui/components/logrocket-handler";
import { WebViewHandler } from "@oe/ui/components/webview-handler";
import { Toaster } from "@oe/ui/shadcn/sonner";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";
import type { ReactNode } from "react";

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

export const metadata: Metadata = {
  title: "OpenEdu",
  icons: {
    icon: Favicon.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  const fontVariables = Object.values(fonts)
    .map((font) => font.variable)
    .join(" ");

  return (
    <html
      lang={locale ?? "en"}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <Script id="microsoft-clarity">
          {` (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "qpk1sozolu"); `}
        </Script>
      </head>
      <body className="scrollbar font-primary antialiased">
        <Provider messages={messages ?? {}} locale={locale}>
          <LogRocketHandler />
          <WebViewHandler />
          {children}
          <Toaster />
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-NEDV7937ZQ" />
    </html>
  );
}
