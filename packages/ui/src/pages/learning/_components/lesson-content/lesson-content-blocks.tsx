"use client";
import { useGetForm } from "@oe/api";
import type { TLessonContent } from "@oe/api";
import type { ILessonContent } from "@oe/api";
import type React from "react";
import { useCallback, useEffect } from "react";
import {
  useActivedTrigger,
  useLearnerFormTriggerStore,
} from "#components/course-form-trigger";
import { cn } from "#utils/cn";
import { useCourse, useProgress, useQuiz } from "../../_context";
import type { LessonContentBlockProps } from "./_types/types";
import { ContentElement } from "./content-block";
import { CONTENT_RENDERERS } from "./content-render";

type FormTriggerConditionLearning =
  | "completed_section"
  | "completed_lesson"
  | "started_lesson";

interface FormConditionProps {
  type: FormTriggerConditionLearning;
  entityId: string;
}

const getWrapperClassName = (contents: ILessonContent[]): string => {
  return cn(
    "h-auto md:pr-2 md:pl-4 [&>[data-radix-scroll-area-viewport]>div]:h-full",
    // 'h-auto overflow-y-auto md:pr-2 md:pl-4 [&>[data-radix-scroll-area-viewport]>div]:h-full',
    contents.every((item) => item.type !== "embedded") && "h-full",
    contents.length === 1 &&
      contents[0] &&
      ((contents[0].type === "video" && contents[0].quizzes?.length === 0) ||
        contents[0].type === "embedded") &&
      "h-auto aspect-video"
  );
};

const LessonContentBlocks: React.FC<LessonContentBlockProps> = ({
  contents = [],
  section_uid,
  lesson_uid,
  course_data,
  isPreview = false,
}) => {
  const { state, completeContent, isLessonCompleted, isSectionCompleted } =
    useProgress();
  const { quizResult } = useQuiz();
  const { course } = useCourse();

  const courseData = course_data || course;

  const { activedTrigger, checkActivedTrigger } = useActivedTrigger();
  const { setFormData, currentFormId } = useLearnerFormTriggerStore();
  const { dataForm } = useGetForm({ id: currentFormId ?? "" });

  useEffect(() => {
    if (dataForm) {
      setFormData(dataForm);
    }
  }, [dataForm, setFormData]);

  const evaluateCondition = useCallback(
    (type: FormTriggerConditionLearning): boolean => {
      const conditions: Record<FormTriggerConditionLearning, () => boolean> = {
        completed_section: () => isSectionCompleted(section_uid as string),
        completed_lesson() {
          return isLessonCompleted(lesson_uid) ?? false;
        },
        started_lesson: () => true,
      };

      return conditions[type]?.() ?? false;
    },
    [isSectionCompleted, isLessonCompleted, section_uid, lesson_uid]
  );

  // Memoize form condition handler
  const handleFormCondition = useCallback(
    ({ type, entityId }: FormConditionProps) => {
      if (!courseData?.form_relations) {
        return;
      }

      const condition = evaluateCondition(type);

      const isTriggerActive = checkActivedTrigger({
        relations: courseData.form_relations,
        entityId,
        type,
      });

      if (condition && isTriggerActive) {
        activedTrigger({
          relations: courseData.form_relations,
          entityId,
        });
      }
    },
    [courseData, activedTrigger, checkActivedTrigger, evaluateCondition]
  );

  useEffect(() => {
    if (state?.sectionsProgressData) {
      const conditions: FormConditionProps[] = [
        { type: "completed_section", entityId: section_uid as string },
        { type: "completed_lesson", entityId: lesson_uid as string },
        { type: "started_lesson", entityId: lesson_uid as string },
      ];

      for (const condition of conditions) {
        handleFormCondition(condition);
      }
    }
  }, [handleFormCondition, section_uid, lesson_uid, state]);

  const onCompleteContent = async (
    lesson_content_uid: string,
    type: TLessonContent,
    videoDuration = 0,
    pauseAt = 0,
    quizId?: string
  ) => {
    if (!courseData || isPreview) {
      return;
    }

    await completeContent({
      lesson_content_uid,
      type,
      section_uid,
      lesson_uid,
      videoDuration,
      pauseAt,
      quizId,
      quizResult,
    });
  };

  if (contents.length === 0) {
    return <div className={getWrapperClassName([])}>No data</div>;
  }

  if (!courseData) {
    return <div className={getWrapperClassName([])}>No course data</div>;
  }

  return (
    <div className={cn(getWrapperClassName(contents))}>
      {contents?.map((item) => {
        const contentType = item.type;
        const renderer = CONTENT_RENDERERS[contentType];
        if (!renderer) {
          return null;
        }

        const elementProps = {
          type: contentType,
          courseData,
          data: item,
          isOnlyContent: contents.length === 1,
          contents,
          isPreview,
        };

        return (
          <div
            key={item.id}
            // className={cn(
            //   renderer.getClassName(contents.length === 1),
            //   item?.type === 'video' && 'aspect-video h-full w-auto max-w-full',
            //   '[&>hr]:last:hidden'
            // )}
          >
            <ContentElement
              onCompleteContent={(props) =>
                onCompleteContent(
                  item?.uid ?? "",
                  item?.type,
                  props?.duration,
                  props?.pause_at,
                  props?.quiz_id
                )
              }
              {...elementProps}
            />
            <hr className="mt-8" />
          </div>
        );
      })}
    </div>
  );
};

export { LessonContentBlocks, type LessonContentBlockProps };
