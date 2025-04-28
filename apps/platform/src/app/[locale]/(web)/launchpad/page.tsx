import { generateSEO } from '@oe/core';
import { LaunchpadPage } from '@oe/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "launchpadMetadata" });

  return generateSEO({
    title: {absolute: t("title")},
    description: t("description"),
    keywords: ["launchpad", "revenue"],
  });
}

export default function () {
  return <LaunchpadPage />;
}
