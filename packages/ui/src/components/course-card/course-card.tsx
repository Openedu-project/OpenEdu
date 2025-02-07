import type { ICourse, ICourseResponse } from "@oe/api/types/course/course";
import { Card, CardContent } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";
import type React from "react";
import type { KeyedMutator } from "swr";
import { Link } from "#common/navigation";
import { CourseDetails } from "./course-detail";
import { CourseHoverContent } from "./course-hover-content";
import { CourseThumbnail } from "./course-thumbnail";

interface ICourseCard extends React.ComponentProps<typeof Card> {
  courseData: ICourse;
  mutate?: KeyedMutator<ICourseResponse | undefined>;
  showHover?: boolean;
  showPrice?: boolean;
  showThubnail?: boolean;
  showOwner?: boolean;
  contentClassName?: string;
}

export default function CourseCard({
  courseData,
  className,
  contentClassName = "",
  mutate,
  showHover = true,
  showPrice = true,
  showThubnail = true,
  showOwner = false,
  ...props
}: ICourseCard) {
  const { org } = courseData;

  const basePath = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME;
  const isExternal = courseData?.org?.domain !== basePath;
  const externalDomain = org?.domain ? `https://${org.domain}` : "";

  return (
    <div className={cn("group relative w-full", className)}>
      <Link
        href={`${externalDomain}PLATFORM_ROUTES.courseDetail.replace(':slug', courseData?.slug)`}
        external={isExternal}
        target={isExternal ? "_blank" : undefined}
        className="h-full w-full p-0 hover:no-underline"
      >
        <Card
          id={courseData?.id}
          className={cn(
            "mx-auto flex h-full min-h-[360px] w-full flex-col gap-3 rounded-m p-4 shadow-lg",
            contentClassName
          )}
          {...props}
        >
          {showThubnail && <CourseThumbnail courseData={courseData} />}
          <CardContent className="flex basis-full flex-col gap-3 p-0 text-foreground">
            <CourseDetails courseData={courseData} showPrice={showPrice} />
          </CardContent>
        </Card>
      </Link>

      {showHover && (
        <CourseHoverContent courseData={courseData} mutate={mutate} />
      )}
    </div>
  );
}
