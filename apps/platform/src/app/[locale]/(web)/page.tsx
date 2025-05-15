import { AIBanner, SEOMetadata } from "@oe/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "./_components/hero-banner";
import { LazySections } from "./_components/lazy-sections";

// export const experimental_ppr = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homepageMetadata" });

  return SEOMetadata({
    title: { absolute: t("title") },
    description: t("description"),
    keywords: ["e-learning", "blockchain", "launchpad", "AI", "education"],
  });
}

export default function Home() {
  // const { locale } = await params;
  // setRequestLocale(locale);
  return (
    <div className="container mx-auto flex max-w-[1440px] flex-col gap-[60px] px-4 py-0 md:px-6 lg:px-8">
      <AIBanner />
      <HeroSection />
      <LazySections />
    </div>
  );
}
