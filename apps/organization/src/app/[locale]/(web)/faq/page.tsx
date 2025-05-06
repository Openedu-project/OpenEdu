import { getSystemConfigServer, systemConfigKeys } from '@oe/api';
import { getCookie } from '@oe/core';
import type { LanguageCode } from '@oe/i18n';

export type IBuilderData = {
  [locale in LanguageCode]?: string;
};

export default async function FAQPage() {
  const [data, currentLang] = await Promise.all([
    await getSystemConfigServer<IBuilderData>({
      key: systemConfigKeys.faqPage,
    }),
    ((await getCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY)) as LanguageCode) ?? 'en',
  ]);

  const builderData = data?.[0]?.value?.[currentLang as LanguageCode] ?? '';

  return (
    <div
      className="mcaption-regular16 tiptap container py-6"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: builderData as string | TrustedHTML }}
    />
  );
}
