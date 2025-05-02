import { cn } from "@oe/ui";

import { Image } from "@oe/ui";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";

import AIGlobalBg from "@oe/assets/images/theme/aiedu/global.png";
import { Title, type TitleProps } from "../../_components/title";

import { AieduLayoutSection } from "../../_components/layout-section";
import {
  TrendCard,
  type TrendCardProps,
  type TrendColorType,
} from "../../_components/trend-card";

export interface AieduIntroductionTrendProps extends TitleProps {
  feature1?: TrendCardProps;
  feature2?: TrendCardProps;
  feature3?: TrendCardProps;
}

const AieduIntroductionTrend: SectionComponent<
  "introduction",
  "aieduTrend"
> = ({ props, className }) => {
  const t = useTranslations("themePage.aiedu.introduction.aieduTrend");

  const features = [
    {
      color: props?.feature1?.color || "secondary",
      title: t("feature1.title"),
      highlight: t("feature1.highlight"),
      desc: t("feature1.desc"),
    },
    {
      color: props?.feature2?.color || "warning",
      title: t("feature2.title"),
      highlight: t("feature2.highlight"),
      desc: t("feature2.desc"),
    },
    {
      color: props?.feature3?.color || "info",
      title: t("feature3.title"),
      highlight: t("feature3.highlight"),
      desc: t("feature3.desc"),
    },
  ];

  return (
    <AieduLayoutSection
      className={cn("relative z-1 space-y-8 py-0 md:py-0 lg:py-0", className)}
      background="bg-gradient-to-b from-info/20 from-50% to-white to-98%"
    >
      <div className="-z-1 absolute h-full w-full">
        <Image
          src={AIGlobalBg.src}
          alt="global background"
          height={AIGlobalBg?.height ?? 480}
          width={AIGlobalBg?.width ?? 1280}
          // quality={100}
          className="h-full w-full object-cover"
        />
      </div>

      <Title
        title={t("title")}
        className="mx-auto max-w-3xl pt-12 text-center md:pt-16 lg:pt-20"
      />
      <div className="space-y-4 pb-12 lg:flex lg:items-center lg:gap-8 lg:space-y-0 lg:pb-16 lg:pb-20">
        {features?.map((feature, index) => (
          <TrendCard
            key={index.toString()}
            color={feature?.color as TrendColorType}
            title={feature?.title}
            desc={feature?.desc}
            highlight={feature?.highlight}
          />
        ))}
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionTrend };
