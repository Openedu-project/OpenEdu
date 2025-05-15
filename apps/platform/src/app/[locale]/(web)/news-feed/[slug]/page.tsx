import { getBlogContent } from "@oe/api";
import { BlogDetailsPage, SEOMetadata } from "@oe/ui";
import type { Metadata } from "next";
// export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogContent = await getBlogContent(undefined, { slug, type: "org" });

  return SEOMetadata({
    title: blogContent?.title,
    description: blogContent?.description,
    keywords: ["news-feed", "blog"],
    ogImage: {
      url: blogContent?.banner?.url ?? "",
      alt: blogContent?.banner?.name,
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
