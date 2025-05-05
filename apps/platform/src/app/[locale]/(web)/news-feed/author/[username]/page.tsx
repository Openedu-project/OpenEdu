import { getUserProfileService } from '@oe/api';
import { generateSEO } from '@oe/core';
import { AuthorPage } from '@oe/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string, locale: string }>;
}): Promise<Metadata> {
  const { username, locale } = await params;
  const [author, t] = await Promise.all([
      getUserProfileService(undefined, { id: username }),
      getTranslations({ locale, namespace: "newsfeedMetadata" }),
    ]);

  const title = author?.display_name && author?.display_name?.length > 0 ? author?.display_name : author?.username ?? '';

  return generateSEO({
    title: t('authorArticles', { name: title }),
    description: author?.headline,
    keywords: ['news-feed', 'blog', 'community', 'author', 'articles'],
    openGraph: {
      images: [
        {
          url: author?.avatar ?? '',
          alt: author?.username,
        },
      ],
    },
    twitter: {
      image: author?.avatar,
    },
  });
}

export default function BlogAuthorPage({
  params,
}: {
  params: { username: string };
}) {
  return <AuthorPage params={params} />;
}
