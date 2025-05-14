import { getSystemConfigServer, systemConfigKeys } from '@oe/api';
import { getCookie } from '@oe/core';
import type { LanguageCode } from '@oe/i18n';
import { SEOMetadata } from '@oe/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export type IBuilderData = {
  [locale in LanguageCode]?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsMetadata' });

  return SEOMetadata({
    title: t('title'),
  });
}

export default async function TermsOfServicePage() {
  const [data, currentLang] = await Promise.all([
    await getSystemConfigServer<IBuilderData>({
      key: systemConfigKeys.termPage,
    }),
    ((await getCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY)) as LanguageCode) ?? 'en',
  ]);

  const builderData = data?.[0]?.value?.[currentLang as LanguageCode] ?? '';

  return (
    <div
      className="mcaption-regular16 rich-text container py-6"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: builderData as string | TrustedHTML }}
    />
  );
}
