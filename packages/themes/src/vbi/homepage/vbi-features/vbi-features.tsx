import { cn } from "@oe/ui/utils/cn";
import { Key, Send, Sun, Zap } from "lucide-react";
import type { SectionComponent } from "../../../_types/theme-page";

import {
  FeatureCard,
  type FeatureCardProps,
} from "../../_components/feature-card";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiHomepageFeaturesProps extends InfoSectionProps {
  features: {
    feature1: FeatureCardProps;
    feature2: FeatureCardProps;
    feature3: FeatureCardProps;
    feature4: FeatureCardProps;
  };
}

const VbiHomepageFeatures: SectionComponent<"homepage", "vbiFeatures"> = ({
  className,
  t,
}) => {
  if (!t) {
    return null;
  }
  const features = [
    {
      title: t("features.feature1.title"),
      description: t("features.feature1.description"),
      variant: "primary",
    },
    {
      title: t("features.feature2.title"),
      description: t("features.feature2.description"),
      variant: "default",
    },
    {
      title: t("features.feature3.title"),
      description: t("features.feature3.description"),
      variant: "default",
    },
    {
      title: t("features.feature4.title"),
      description: t("features.feature4.description"),
      variant: "primary",
    },
  ];

  return (
    <div
      className={cn(
        "space-y-4 bg-background p-4 md:space-y-8 md:p-8 lg:p-12",
        className
      )}
    >
      <InfoSection
        title={t("title")}
        titleSub={t("titleSub")}
        className="flex flex-col items-center justify-center text-center"
      />
      {/* Features Grid */}
      <div className="relative">
        {/* Grid Layout */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index.toString()}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as "default" | "primary"}
            />
          ))}
        </div>

        {/* Center Icons */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 hidden md:block">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-background p-2 shadow-lg">
            <div className="rounded bg-muted p-3">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div className="rounded bg-primary p-3">
              <Zap className="h-6 w-6 text-background" />
            </div>
            <div className="rounded bg-primary p-3">
              <Send className="h-6 w-6 text-background" />
            </div>
            <div className="rounded bg-muted p-3">
              <Sun className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VbiHomepageFeatures;
