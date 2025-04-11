// import type { Metadata } from "next";
// import localFont from 'next/font/local';

// import { fonts } from "@oe/core";
import { Provider, Toaster, WebViewHandler } from "@oe/ui";
// import { Toaster } from "@oe/ui";
import { getLocale, getMessages } from "next-intl/server";
// import { ThemeProvider } from "@oe/themes";
// import { WebViewHandler } from "@oe/ui";
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

// export async function generateMetadata(): Promise<Metadata> {
//   const [themeSystem] = await Promise.all([getThemeConfigServer()]);

//   return getMetadata(themeSystem?.[0]?.value);
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);
  // const themeName = themeSystem?.[0]?.value?.activedTheme ?? "vbi";

  // console.log("-------------------messages", messages, locale, themeSystem);

  // const fontVariables = Object.values(fonts)
  //   .map((font) => font.variable)
  //   .join(" ");

  return (
    <html
      lang={locale ?? "en"}
      suppressHydrationWarning
      // className={fontVariables}
    >
      <head>
        <Script id="microsoft-clarity">
          {` (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "qpk1sozolu"); `}
        </Script>
      </head>
      <body className="scrollbar font-primary antialiased">
        <Provider messages={messages ?? {}} locale={locale}>
          <WebViewHandler />

          {/* <ThemeProvider
            theme={themeSystem?.[0]?.value?.availableThemes?.[themeName]}
          > */}
          {children}
          {/* </ThemeProvider> */}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
