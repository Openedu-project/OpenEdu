import { getSystemConfigServer } from "@oe/api";
import { systemConfigKeys } from "@oe/api";
import { getCookie } from "@oe/core";
import type { LanguageCode } from "@oe/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Term And Condition",
};
export type IBuilderData = {
  [locale in LanguageCode]?: string;
};
export default async function TermAndConditionPage() {
  const [data, currentLang] = await Promise.all([
    await getSystemConfigServer<IBuilderData>({
      key: systemConfigKeys.termPage,
    }),
    ((await getCookie(
      process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY
    )) as LanguageCode) ?? "en",
  ]);

  const builderData = data?.[0]?.value?.[currentLang as LanguageCode] ?? '';

  console.log(data, "data");

  console.log(builderData, "builderData");

  return (
    <div
      className="mcaption-regular16 tiptap container py-6"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: builderData as string | TrustedHTML }}
    />
  );
}
