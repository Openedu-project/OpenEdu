import { getI18nConfig, getThemeConfigServer } from "@oe/api";
import { fonts } from "@oe/core";
import { DEFAULT_LOCALE, DEFAULT_LOCALES, redirect } from "@oe/i18n";
import { ThemeProvider, getMetadata } from "@oe/themes";
import { Provider } from "@oe/ui";
import { Toaster } from "@oe/ui";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
// import { WebViewHandler } from "@oe/ui";
import { getLocale } from "next-intl/server";
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

export async function generateMetadata(): Promise<Metadata> {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return getMetadata(themeSystem?.[0]?.value);
}

// export async function generateStaticParams() {
//   const i18nConfig = await getI18nConfig();
//   return (i18nConfig?.locales ?? [DEFAULT_LOCALE])?.map((locale) => ({
//     locale,
//   }));
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [locale, themeSystem, i18nConfig] = await Promise.all([
    getLocale(),
    getThemeConfigServer(),
    getI18nConfig(),
  ]);
  const themeName = themeSystem?.[0]?.value?.activedTheme ?? "vbi";

  if (!hasLocale(i18nConfig?.locales ?? DEFAULT_LOCALES, locale)) {
    redirect({ href: "/", locale: DEFAULT_LOCALE });
  }

  // setRequestLocale(locale);

  // console.log("-------------------messages", messages, locale, themeSystem);

  const fontVariables = Object.values(fonts)
    .map((font) => font.variable)
    .join(" ");

  return (
    <html
      lang={locale ?? "en"}
      suppressHydrationWarning
      className={fontVariables}
    >
      <body className="scrollbar font-primary antialiased">
        <NextIntlClientProvider>
          <Provider>
            {/* <WebViewHandler /> */}

            <ThemeProvider
              theme={themeSystem?.[0]?.value?.availableThemes?.[themeName]}
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </Provider>
        </NextIntlClientProvider>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {` (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "qpk1sozolu"); `}
        </Script>
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-C0EQH698Y5"
        />
        <Script id="google-analytics-script" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
 
  gtag('config', 'G-C0EQH698Y5');`}
        </Script>
      </body>
      {/* <GoogleAnalytics gaId="G-C0EQH698Y5" /> */}
    </html>
  );
}
