import HeroBanner from "@oe/assets/images/openedu-homepage/hero-banner/hero-banner.png";
import LogoOpenEdu from "@oe/assets/images/openedu-homepage/hero-banner/logo-openedu-blue.png";
import { PLATFORM_ROUTES } from "@oe/core";
import { Button } from "@oe/ui";
import { Link } from "@oe/ui";
import { Image } from "@oe/ui";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PartnerSection } from "./partners";

// Mark as server component
export async function HeroSection() {
  // Move this to server-side
  const t = await getTranslations("homePageLayout.heroBannerSection");

  return (
    <section className="container mx-auto flex h-[calc(100vh-var(--header-small-height))] flex-col px-0 py-4 pb-10 md:h-[calc(100vh-var(--header-height))] md:px-4 lg:py-10">
      <div className="flex grow flex-col items-center gap-4 sm:justify-center md:gap-8 lg:flex-row">
        <div className="relative w-full rounded-lg px-2 lg:w-1/3 lg:px-4">
          <div className="relative z-10 ">
            <div className="mb-2 flex">
              <div className="mt-6 flex max-w-[210px] md:max-w-auto">
                <Image
                  src={LogoOpenEdu.src}
                  alt={t("logo.alt")}
                  width={280}
                  height={42}
                  className="object-contain"
                />
              </div>
            </div>

            <h1 className="mb-4 flex items-center gap-2">
              <span className="giant-iheading-bold16 sm:giant-iheading-bold20 md:giant-iheading-bold24 text-primary">
                {t("tagline.learning")}
              </span>
              <span className="giant-iheading-bold16 sm:giant-iheading-bold20 md:giant-iheading-bold24">
                .
              </span>
              <span className="giant-iheading-bold16 sm:giant-iheading-bold20 md:giant-iheading-bold24 text-[#09BEC9]">
                {t("tagline.sharing")}
              </span>
              <span className="giant-iheading-bold16 sm:giant-iheading-bold20 md:giant-iheading-bold24">
                .
              </span>
              <span className="giant-iheading-bold16 sm:giant-iheading-bold20 md:giant-iheading-bold24 text-[#FD68F2]">
                {t("tagline.growing")}
              </span>
              <span className="giant-iheading-bold16 sm:giant-iheading-bold20 md:giant-iheading-bold24">
                .
              </span>
            </h1>

            <div className="mb-6">
              <h2 className="mcaption-regular16 lg:mcaption-regular20">
                {t.rich("headline", {
                  highlight: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h2>
            </div>
            <Link
              href={PLATFORM_ROUTES.courses}
              className="w-full justify-start p-0"
            >
              <Button className="mbutton-bold16 w-full sm:w-fit">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative w-full lg:w-2/3">
          <div className="relative mx-auto w-full max-w-[800px]">
            <Image
              src={HeroBanner.src}
              alt={t("hero.banner.alt")}
              width={1080}
              height={573}
              priority
              className="relative z-10 object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
            />
          </div>
        </div>
      </div>

      <Suspense>
        <PartnerSection />
      </Suspense>
    </section>
  );
}
