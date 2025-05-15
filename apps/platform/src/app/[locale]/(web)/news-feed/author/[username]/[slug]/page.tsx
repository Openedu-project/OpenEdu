import { getBlogContent, getUserProfileService } from "@oe/api";
import { BlogDetailsPage, SEOMetadata } from "@oe/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; slug: string; locale: string }>;
}): Promise<Metadata> {
  const { username, slug, locale } = await params;
  const [author, newsfeed, t] = await Promise.all([
    getUserProfileService(undefined, { id: username }),
    getBlogContent(undefined, { slug, type: "personal" }),
    getTranslations({ locale, namespace: "newsfeedMetadata" }),
  ]);

  const authorName =
    author?.display_name && author?.display_name?.length > 0
      ? author?.display_name
      : author?.username ?? "";

  return SEOMetadata({
    title: `${newsfeed?.title} | ${t("byAuthor", { name: authorName })}`,
    description: newsfeed?.description,
    keywords: ["news-feed", "blog", "community", "author"],
    ogImage: {
      url: newsfeed?.banner?.url ?? "",
      alt: newsfeed?.banner?.name,
    },
  });
}

export default async function PersonalBlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return <BlogDetailsPage slug={slug} type="personal" />;
}
