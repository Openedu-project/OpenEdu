import { AIAssistantPage, SEOMetadata } from '@oe/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiAgentMetadata' });

  return SEOMetadata({
    title: { absolute: t('title') },
    description: t('description'),
    keywords: ['AI', 'AI Agent', 'agent'],
  });
}

export default function AIAgent() {
  return <AIAssistantPage />;
}
