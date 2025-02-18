import { cn } from "@oe/ui/utils/cn";
import type { SectionComponent } from "../../../_types/theme-page";
import {
  AchievementCard,
  type AchievementCardProps,
} from "../../_components/achievement-card";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiHomepageAchievementsProps extends InfoSectionProps {
  achievements?: {
    achievement1: AchievementCardProps;
    achievement2: AchievementCardProps;
    achievement3: AchievementCardProps;
  };
}

const VbiHomepageAchievements: SectionComponent<
  "homepage",
  "vbiAchievements"
> = ({ props, className, t }) => {
  const achievements = [
    {
      title: t?.("achievements.achievement1.title"),
      description: t?.("achievements.achievement1.description"),
      image: props?.achievements?.achievement1?.image,
      contentVariant: "right",
      stats: {
        stat1: {
          value: props?.achievements?.achievement1?.stats?.stat1?.value,
          label: t?.("achievements.achievement1.stats.stat1.label"),
        },
        stat2: {
          value: props?.achievements?.achievement1?.stats?.stat2?.value,
          label: t?.("achievements.achievement1.stats.stat2.label"),
        },
        stat3: {
          value: props?.achievements?.achievement1?.stats?.stat3?.value,
          label: t?.("achievements.achievement1.stats.stat3.label"),
        },
      },
    },
    {
      title: t?.("achievements.achievement2.title"),
      description: t?.("achievements.achievement2.description"),
      image: props?.achievements?.achievement2?.image,
      contentVariant: "left",
      stats: {
        stat1: {
          value: props?.achievements?.achievement2?.stats?.stat1?.value,
          label: t?.("achievements.achievement2.stats.stat1.label"),
        },
        stat2: {
          value: props?.achievements?.achievement2?.stats?.stat2?.value,
          label: t?.("achievements.achievement2.stats.stat2.label"),
        },
        stat3: {
          value: props?.achievements?.achievement2?.stats?.stat3?.value,
          label: t?.("achievements.achievement2.stats.stat3.label"),
        },
      },
    },
    {
      title: t?.("achievements.achievement3.title"),
      description: t?.("achievements.achievement3.description"),
      image: props?.achievements?.achievement3?.image,
      contentVariant: "right",
      stats: {
        stat1: {
          value: props?.achievements?.achievement3?.stats?.stat1?.value,
          label: t?.("achievements.achievement3.stats.stat1.label"),
        },
        stat2: {
          value: props?.achievements?.achievement3?.stats?.stat2?.value,
          label: t?.("achievements.achievement3.stats.stat2.label"),
        },
        stat3: {
          value: props?.achievements?.achievement3?.stats?.stat3?.value,
          label: t?.("achievements.achievement3.stats.stat3.label"),
        },
      },
    },
  ];

  return (
    <div
      className={cn(
        "container mt-4 space-y-4 bg-background p-4 md:mt-12 md:space-y-8 md:p-8 lg:p-12",
        className
      )}
    >
      <InfoSection
        title={t?.("title")}
        titleSub={t?.("titleSub")}
        button={{ text: t?.("button.text"), link: t?.("button.link") }}
        className="flex flex-col items-center"
      />
      <div className="space-y-4">
        {achievements?.map((item) => (
          <AchievementCard
            key={item.title}
            title={item.title}
            description={item.description}
            stats={item.stats}
            image={item.image}
            contentVariant={item.contentVariant}
            className="shadow-none"
          />
        ))}
      </div>
    </div>
  );
};

export default VbiHomepageAchievements;
