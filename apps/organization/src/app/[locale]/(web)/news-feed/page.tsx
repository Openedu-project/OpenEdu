import { BlogDefaultPage, SEOMetadata } from '@oe/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'newsfeedMetadata' });

  return SEOMetadata({
    title: t('newsFeed'),
    keywords: ['news-feed', 'blog', 'community'],
  });
}

export default function BlogPage() {
  return <BlogDefaultPage isOpenEdu={false} />;
}
