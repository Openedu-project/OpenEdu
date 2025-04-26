import { BlogDefaultPage } from '@oe/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "News Feed",
  keywords: ["news-feed", "blog", "community"],
};

export default function BlogPage() {
  return <BlogDefaultPage isOpenEdu />;
}
