import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";

import { BlogGridClient } from "../../_components/blog-grid-client";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiHomepageBlogsProps extends InfoSectionProps {}

const VbiHomepageBlogs: SectionComponent<"homepage", "vbiBlogs"> = ({
  props,
  className,
}) => {
  const t = useTranslations("themePage.vbi.homepage.vbiBlogs");

  return (
    <div
      className={cn(
        "container space-y-4 bg-background p-4 md:space-y-8 md:p-8 lg:p-12",
        className
      )}
    >
      <InfoSection
        title={t("title")}
        titleSub={t("titleSub")}
        button={{ text: t("button.text"), link: props?.button?.link }}
        className="flex flex-col items-center justify-center text-center"
      />
      <BlogGridClient />
    </div>
  );
};

export default VbiHomepageBlogs;
