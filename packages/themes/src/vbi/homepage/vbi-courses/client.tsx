"use client";
import { useGetPopularCoursesAtWebsite } from "@oe/api/hooks/useFeaturedContent";
import type { ICourse } from "@oe/api/types/course/course";
import type { IFeaturedContent } from "@oe/api/types/featured-contents";
import { getAPIReferrerAndOriginClient } from "@oe/api/utils/referrer-origin";
import { CourseCard } from "@oe/ui/components/course-card";
import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiHomepageCoursesProps extends InfoSectionProps {}

const VbiHomepageCoursesClient: SectionComponent<"homepage", "vbiCourses"> = ({
  className,
  props,
}) => {
  const t = useTranslations("themePage.vbi.homepage.vbiCourses");
  const { host } = getAPIReferrerAndOriginClient();

  const { dataPopularCourses } = useGetPopularCoursesAtWebsite({
    params: { org_id: host ?? "" },
  });

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
        button={{ text: t?.("button.text"), link: props?.button?.link }}
        className="flex flex-col items-center text-center"
      />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
        {dataPopularCourses?.map(
          (course: IFeaturedContent<ICourse>) =>
            course?.entity && (
              <CourseCard
                key={course?.entity?.id}
                courseData={course?.entity}
              />
            )
        )}
      </div>
    </div>
  );
};

export default VbiHomepageCoursesClient;
