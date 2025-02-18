import map from "@oe/assets/images/theme/map-3.png";
import { Image } from "@oe/ui/components/image";
import { cn } from "@oe/ui/utils/cn";
import type { SectionComponent } from "../../../_types/theme-page";

import { useTranslations } from "next-intl";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiPartnersCtaProps extends InfoSectionProps {}
const VbiPartnersCta: SectionComponent<"partners", "vbiCta"> = ({
  className,
}) => {
  const t = useTranslations("themePage.vbi.partners.vbiCta");

  return (
    <div className={cn("relative h-[500px] bg-muted md:[627px]", className)}>
      <div className="container relative h-full">
        <div className="flex h-full items-center justify-start px-4 py-14 md:p-8 lg:px-12">
          <InfoSection
            title={t("title")}
            titleSub={t("titleSub")}
            button={undefined}
            className="z-10 mb-6 max-w-[400px] lg:mb-0 lg:w-1/2"
          />
        </div>
        <div className="absolute top-0 right-0 hidden h-full w-full md:block md:w-2/3">
          <Image
            src={map?.src}
            alt="map"
            className="h-full w-full object-contain"
            fill
            noContainer
          />
        </div>
      </div>
    </div>
  );
};

export default VbiPartnersCta;
