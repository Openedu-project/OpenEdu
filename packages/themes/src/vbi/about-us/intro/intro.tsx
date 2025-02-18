import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";

export interface VbiAboutUsIntroProps {
  name?: string;
  slogan?: string;
  image?: FileType;
}

const VbiAboutUsIntro: SectionComponent<"about-us", "vbiIntro"> = ({
  props,
  className,
}) => {
  const t = useTranslations("themePage.vbi.about-us.vbiIntro");

  return (
    <div
      className={cn(
        "container relative space-y-4 py-8 md:space-y-8 md:py-12",
        className
      )}
    >
      <h2 className="giant-iheading-bold16 md:giant-iheading-bold24 mb-4 whitespace-pre-wrap text-center">
        {t("name")}
      </h2>
      <h1 className="giant-iheading-bold24 md:giant-iDisplay-bold36 lg:giant-iDisplay-bold48 mb-5 text-center">
        {t("slogan")}
      </h1>

      <Image
        alt="banner"
        src={props?.image?.url}
        className="h-full w-full rounded-lg object-contain"
        height={props?.image?.height}
        width={props?.image?.width}
      />
    </div>
  );
};

export default VbiAboutUsIntro;
