import { fonts } from "@oe/core";
import "@oe/config/tailwindcss/global.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getI18nConfig } from "@oe/api";
import Favicon from "@oe/assets/images/favicon.png";
// import { DEFAULT_LOCALE } from "@oe/i18n";
import { Provider, Toaster } from "@oe/ui";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | OpenEdu",
    default: "OpenEdu",
  },
  icons: {
    icon: Favicon.src,
  },
};

// export async function generateStaticParams() {
//   const i18nConfig = await getI18nConfig();
//   return (i18nConfig?.locales ?? [DEFAULT_LOCALE])?.map((locale) => ({
//     locale,
//   }));
// }

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const [{ locale }, i18nConfig] = await Promise.all([params, getI18nConfig()]);

  console.log(
    "=======================i18nConfig===================",
    i18nConfig,
    locale
  );

  // if (!hasLocale(i18nConfig?.locales ?? [], locale)) {
  //   redirect({ href: "/", locale: DEFAULT_LOCALE });
  // }

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
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","qpk1sozolu");`}
        </Script>
      </head>
      <body className="scrollbar font-primary antialiased">
        <Provider>
          {/* <WebViewHandler /> */}
          {children}
          <Toaster />
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-NEDV7937ZQ" />
    </html>
  );
}

// export default withLocale(RootLayout);
