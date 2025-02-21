import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";
import {
  StatementCard,
  type StatementCardProps,
} from "../../_components/statement-card";

export interface VbiAboutUsGoalProps extends InfoSectionProps {
  mission: StatementCardProps;
  vision: StatementCardProps;
}

const VbiAboutUsGoal: SectionComponent<"about-us", "vbiGoal"> = ({
  className,
}) => {
  const t = useTranslations("themePage.vbi.about-us.vbiGoal");

  return (
    <div className={cn("bg-muted", className)}>
      <div className="container space-y-4 py-8 md:space-y-8 md:py-12">
        <InfoSection
          title={t("title")}
          titleSub={t("titleSub")}
          button={undefined}
          className="flex flex-col items-center text-center"
        />
        <div className="grid gap-8 md:grid-cols-2">
          <StatementCard
            icon="star"
            title={t("vision.title")}
            content={t("vision.content")}
          />
          <StatementCard
            icon="heart"
            title={t("mission.title")}
            content={t("mission.content")}
          />
        </div>
      </div>
    </div>
  );
};

export default VbiAboutUsGoal;
