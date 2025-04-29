import { type FileType, cn } from "@oe/ui";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";
import { AieduLayoutSection } from "../../_components/layout-section";
import { StatsCard, type StatsCardProps } from "../../_components/stats-card";
import { Title, type TitleProps } from "../../_components/title";

export interface AieduIntroductionBenefitProps extends TitleProps {
  image?: FileType;
  benefit1: StatsCardProps;
  benefit2: StatsCardProps;
  benefit3: StatsCardProps;
  benefit4: StatsCardProps;
}

const AieduIntroductionBenefit: SectionComponent<
  "introduction",
  "aieduBenefit"
> = ({ props, className }) => {
  const t = useTranslations("themePage.aiedu.introduction.aieduBenefit");
  const benefits = [
    {
      percentage: props?.benefit1?.percentage,
      description: t("benefit1.description"),
    },
    {
      percentage: props?.benefit2?.percentage,
      description: t("benefit2.description"),
    },
    {
      percentage: props?.benefit3?.percentage,
      description: t("benefit3.description"),
    },
    {
      percentage: props?.benefit4?.percentage,
      description: t("benefit4.description"),
    },
  ];

  return (
    <AieduLayoutSection className={cn("space-y-8", className)}>
      <Title title={t("title")} className="mx-auto max-w-3xl text-center" />
      <div className="space-y-6">
        {benefits?.map((b, index) => (
          <StatsCard
            key={index.toString()}
            className={
              index % 2
                ? "sm:ml-8 md:ml-16 lg:ml-20"
                : "sm:mr-8 md:mr-16 lg:mr-20"
            }
            percentage={b?.percentage ?? 0}
            description={b?.description}
          />
        ))}
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionBenefit };
