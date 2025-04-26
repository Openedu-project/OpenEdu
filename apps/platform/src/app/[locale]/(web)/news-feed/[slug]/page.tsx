import { getBlogContent } from '@oe/api';
import { generateSEO } from '@oe/core';
import { BlogDetailsPage } from '@oe/ui';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogContent = await getBlogContent(undefined, { slug, type: 'org' });
  
  return generateSEO({
    title: blogContent?.title,
    description: blogContent?.description,
    keywords: ["news-feed", "blog"],
    openGraph: {
      images: [
        {
          url: blogContent?.banner?.url ?? "",
          alt: blogContent?.banner?.name,
        },
      ],
    },
    twitter: {
      image: blogContent?.banner?.url,
    },
  });
}

export default async function OrgBlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return <BlogDetailsPage slug={slug} type="org" />;
}
