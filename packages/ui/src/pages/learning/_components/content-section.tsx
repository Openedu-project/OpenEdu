import type { ICourseOutline, ILesson } from "@oe/api";

import { useMemo } from "react";
import { cn } from "#utils/cn";
import { useCourse, useCurrentLesson } from "../_context/learning-context";
import { sortByOrder } from "../_utils/utils";
import { LessonContentBlocks } from "./lesson-content/lesson-content-blocks";
import { LessonMetadata } from "./lesson-metadata";

interface IContentSectionProps {
  className?: string;
  lessonData?: ILesson | null;
}

const ContentSection = ({ className, lessonData }: IContentSectionProps) => {
  const { course } = useCourse();
  const { currentSection, currentLesson } = useCurrentLesson();

  const isQuizContent = useMemo(() => {
    return (
      lessonData?.contents?.length === 1 &&
      lessonData.contents[0]?.type === "quiz"
    );
  }, [lessonData]);

  const sortedContents = useMemo(() => {
    return lessonData?.contents?.sort(sortByOrder) ?? [];
  }, [lessonData]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        className,
        isQuizContent && "h-[calc(100vh-var(--header-height)-16px)]"
      )}
    >
      <LessonContentBlocks
        course_data={course as ICourseOutline}
        contents={sortedContents}
        section_uid={currentSection}
        lesson_uid={currentLesson}
      />

      <LessonMetadata
        title={lessonData?.title ?? ""}
        courseName={course?.name ?? ""}
        slug={course?.slug ?? ""}
        updateAt={course?.update_at ?? 0}
        className="px-2 md:pl-4"
        lessonUid={currentLesson}
      />
    </div>
  );
};

export { ContentSection };
