import { getThemeConfigServer } from "@oe/api";
import { getCourseOutlineService } from "@oe/api";
import { getMetadata } from "@oe/themes";
import { CourseDetailPage } from "@oe/ui";
import type { Metadata } from "next";

const extractText = (htmlString: string): string => {
  // Remove all HTML tags using regular expression
  const textOnly = htmlString.replaceAll(/<[^>]*>/g, "");

  return textOnly.slice(0, 160);
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metadata = await getCourseOutlineService(undefined, {
    id: params?.slug,
  });
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const settings = getMetadata(themeSystem?.[0]?.value);

  const title = metadata?.name
    ? `${metadata?.name}${
        settings?.title?.length > 0 ? ` | ${settings?.title}` : ""
      }`
    : settings?.title;

  const newMetadata = {
    title,
    description: extractText(metadata?.description ?? ""),
    ogTitle: title,
    ogDescription: extractText(metadata?.description ?? ""),
    ogImage: metadata?.thumbnail,
    openGraph: {
      title,
      description: extractText(metadata?.description ?? ""),
      images: metadata?.thumbnail?.url
        ? [
            {
              url: metadata?.thumbnail.url ?? "",
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      title,
      description: extractText(metadata?.description ?? ""),
      images: metadata?.thumbnail?.url ? [metadata?.thumbnail?.url] : [],
    },
  };

  const newSetting = {
    ...newMetadata,
  };

  return newSetting;
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div>
      <CourseDetailPage slug={slug} />
    </div>
  );
}
