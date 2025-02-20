import map from "@oe/assets/images/theme/map.png";
import { Image } from "@oe/ui/components/image";
import { cn } from "@oe/ui/utils/cn";
import type { SectionComponent } from "../../../_types/theme-page";

import type { FileType } from "@oe/ui/components/uploader";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiHomepageMapProps extends InfoSectionProps {
  image?: FileType;
}

const VbiHomepageMap: SectionComponent<"homepage", "vbiMap"> = ({
  className,
  t,
}) => {
  if (!t) {
    return null;
  }

  return (
    <div
      className={cn("relative h-[500px] bg-foreground lg:[672px]", className)}
    >
      <div className="container mx-auto flex h-full items-center justify-start px-4 py-14 md:p-8 lg:px-12">
        <InfoSection
          title={t("title")}
          titleSub={t("titleSub")}
          button={undefined}
          className="z-10 mb-6 lg:mb-0 lg:w-1/2"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          src={map?.src}
          alt="map"
          className="h-full w-full object-cover"
          fill
          noContainer
        />
      </div>
    </div>
  );
};

export default VbiHomepageMap;
