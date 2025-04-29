import { cn } from "@oe/ui";

import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";

import { Sparkle } from "lucide-react";
import { ExpertCard } from "../../_components/expert-card";
import { AieduLayoutSection } from "../../_components/layout-section";

const AieduIntroductionExpert: SectionComponent<
  "introduction",
  "aieduExpert"
> = ({ props, className }) => {
  const t = useTranslations("themePage.aiedu.introduction.aieduExpert");

  return (
    <AieduLayoutSection className={cn("space-y-6", className)}>
      {/* <Title title={t("title")} className="text-center" /> */}

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="h-[1.4px] w-4 translate-x-[1px] bg-primary md:w-8 lg:w-12" />
            <Sparkle className="text-primary" />
          </div>

          <h3 className="mb-0 text-center text-primary">{t("teacher")}</h3>

          <div className="flex items-center">
            <Sparkle className="translate-x-[1px] text-primary" />
            <div className="h-[1.4px] w-4 bg-primary md:w-8 lg:w-12" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {props?.teachers?.filter(Boolean)?.map((value, index) => (
            <ExpertCard
              key={`${value?.name}-${index}-teacher`}
              name={value?.name}
              role={value?.role}
              image={value?.image}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="h-[1.4px] w-4 translate-x-[1px] bg-primary md:w-8 lg:w-12" />
            <Sparkle className="text-primary" />
          </div>

          <h3 className="mb-0 text-center text-primary">{t("mentor")}</h3>

          <div className="flex items-center">
            <Sparkle className="translate-x-[1px] text-primary" />
            <div className="h-[1.4px] w-4 bg-primary md:w-8 lg:w-12" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {props?.mentors?.filter(Boolean)?.map((value, index) => (
            <ExpertCard
              key={`${value?.name}-${index}-mentor`}
              name={value?.name}
              role={value?.role}
              image={value?.image}
            />
          ))}
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionExpert };
