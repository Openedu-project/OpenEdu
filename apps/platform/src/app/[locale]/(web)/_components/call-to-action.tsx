import BannerJouney from "@oe/assets/images/openedu-homepage/banner-journey.png";
import { PLATFORM_ROUTES } from "@oe/core/utils/routes";
import { Link } from "@oe/ui/common/navigation";
import { Image } from "@oe/ui/components/image";
import { Button } from "@oe/ui/shadcn/button";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("homePageLayout.ctaSection");

  return (
    <div className="flex flex-col items-center gap-8 pb-5 lg:flex-row lg:pb-10">
      <div className="relative w-full overflow-hidden rounded-[40px] bg-[linear-gradient(148.02deg,#FFFFFF_21.53%,rgba(242,241,255,0.5)_49.58%)] p-4 backdrop-blur-[2px] md:p-12 lg:w-1/2">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 max-w-[80%]">
          {t("title")}
        </h2>
        <p className="mcaption-regular16 lg:mcaption-regular24 max-w-xl">
          {t("description")}
        </p>

        <Link
          href={PLATFORM_ROUTES.courses}
          className="mt-8 w-full justify-start p-0"
        >
          <Button className="mbutton-bold16 w-full sm:w-fit">
            {t("buttons.start")}
          </Button>
        </Link>
      </div>
      <div className="relative w-full lg:w-1/2">
        <div className="relative mx-auto h-full w-full max-w-[600px]">
          <div className="relative h-full w-full">
            <Image
              src={BannerJouney.src}
              alt="CTA banner"
              width={554}
              height={380}
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
