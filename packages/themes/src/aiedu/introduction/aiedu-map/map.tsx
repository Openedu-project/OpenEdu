import { type FileType, Image, cn } from "@oe/ui";

import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";

import { Title, type TitleProps } from "../../_components/title";

import { AieduButton, type AieduButtonProps } from "../../_components/button";
import { AieduLayoutSection } from "../../_components/layout-section";

export interface AieduIntroductionMapProps extends TitleProps {
  image?: FileType;
  button?: AieduButtonProps;
}

const AieduIntroductionMap: SectionComponent<"introduction", "aieduMap"> = ({
  props,
  className,
}) => {
  const t = useTranslations("themePage.aiedu.introduction.aieduMap");

  return (
    <AieduLayoutSection className={cn("relative z-1 flex", className)}>
      <div className="w-full space-y-8 md:w-2/3 lg:w-1/2">
        <Title
          title={t("title")}
          description={t("description")}
          className="text-start"
        />
        <AieduButton text={t("button.text")} link={props?.button?.link} />
      </div>

      <div className="-z-10 absolute right-0 hidden md:block md:w-full lg:w-1/2">
        <Image
          alt="image"
          src={props?.image?.url}
          width={props?.image?.width ?? 1280}
          height={props?.image?.height ?? 306}
          className="h-full w-full rounded-lg object-contain"
        />
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionMap };
