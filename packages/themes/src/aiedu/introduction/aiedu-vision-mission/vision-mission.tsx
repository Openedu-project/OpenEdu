import { type FileType, cn } from "@oe/ui";

import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";

import { Title, type TitleProps } from "../../_components/title";

import { AieduLayoutSection } from "../../_components/layout-section";
import { StatementCard } from "../../_components/statement-card";

export interface AieduIntroductionVisionMissionProps extends TitleProps {
  image?: FileType;
}

const AieduIntroductionVisionMission: SectionComponent<
  "introduction",
  "aieduVisionMission"
> = ({ className }) => {
  const t = useTranslations("themePage.aiedu.introduction.aieduVisionMission");

  return (
    <AieduLayoutSection
      className={cn("relative z-1 space-y-8", className)}
      background="bg-gradient-to-b from-primary from-50% to-white to-98%"
      // style={{
      //   backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1.2px, transparent 1.2px)',
      //   backgroundSize: '40px 40px',
      // }}
    >
      {/* Background pattern with + signs */}
      <div className="absolute inset-0 z-2 grid grid-cols-8 gap-8 md:grid-cols-16">
        {Array.from({ length: 128 }, (_, i) => (
          <div
            key={i.toString()}
            className="flex items-center justify-center text-background/70 text-md"
          >
            +
          </div>
        ))}
      </div>
      <Title title={t("title")} className="text-center" variant="secondary" />
      <div className="relative z-3 grid gap-8 md:grid-cols-2">
        <StatementCard
          icon="star"
          title={t("vision.title")}
          content={t("vision.content")}
        />
        <StatementCard
          icon="sun"
          title={t("mission.title")}
          content={t("mission.content")}
        />
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionVisionMission };
