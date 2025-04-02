"use client";

import { useGetForm } from "@oe/api";
import type { TLessonContent } from "@oe/api";
import type React from "react";
import { memo, useCallback, useEffect } from "react";
import {
  useActivedTrigger,
  useLearnerFormTriggerStore,
} from "#components/course-form-trigger";
import { NoDataAvailable } from "#components/no-data-available";
import { cn } from "#utils/cn";
import { useCourse, useProgress, useQuiz } from "../../_context";
import type {
  ContentRendererProps,
  LessonContentBlockProps,
} from "./_types/types";
import { CONTENT_RENDERERS } from "./content-render";

type FormTriggerConditionLearning =
  | "completed_section"
  | "completed_lesson"
  | "started_lesson";

interface FormConditionProps {
  type: FormTriggerConditionLearning;
  entityId: string;
}

interface ContentElementProps extends ContentRendererProps {
  type: TLessonContent;
  onCompleteContent: (props?: {
    duration?: number;
    pause_at?: number;
    quiz_id?: string;
  }) => void;
}

const ContentElement = memo(function ContentElement({
  type,
  onCompleteContent,
  ...props
}: ContentElementProps) {
  const renderer = CONTENT_RENDERERS[type];

  if (!renderer) {
    return null;
  }

  return renderer.render({ ...props, onCompleteContent });
});

const LessonContentBlocks: React.FC<
  LessonContentBlockProps & { lessonMetadataHeight?: number }
> = memo(function LessonContentBlocks({
  contents = [],
  section_uid,
  lesson_uid,
  course_data,
  isPreview = false,
  lessonMetadataHeight = 0,
}) {
  const { state, completeContent, isLessonCompleted, isSectionCompleted } =
    useProgress();
  const { quizResult } = useQuiz();
  const { course } = useCourse();
  const courseData = course_data || course;

  const { activedTrigger, checkActivedTrigger } = useActivedTrigger();
  const { setFormData, currentFormId } = useLearnerFormTriggerStore();
  const { dataForm } = useGetForm({ id: currentFormId ?? "" });

  // Set form data when it changes
  useEffect(() => {
    if (dataForm) {
      setFormData(dataForm);
    }
  }, [dataForm, setFormData]);

  // Evaluate form trigger condition - memoized for performance
  const evaluateCondition = useCallback(
    (type: FormTriggerConditionLearning): boolean => {
      switch (type) {
        case "completed_section":
          return isSectionCompleted(section_uid as string);
        case "completed_lesson":
          return isLessonCompleted(lesson_uid) ?? false;
        case "started_lesson":
          return true;
        default:
          return false;
      }
    },
    [isSectionCompleted, isLessonCompleted, section_uid, lesson_uid]
  );

  // Form condition handler - memoized for performance
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

  // Check form conditions on state change
  useEffect(() => {
    if (!state?.sectionsProgressData) {
      return;
    }

    const conditions: FormConditionProps[] = [
      { type: "completed_section", entityId: section_uid as string },
      { type: "completed_lesson", entityId: lesson_uid as string },
      { type: "started_lesson", entityId: lesson_uid as string },
    ];

    conditions.forEach(handleFormCondition);
  }, [handleFormCondition, section_uid, lesson_uid, state]);

  // Content completion handler
  const onCompleteContent = useCallback(
    async (
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
    },
    [
      completeContent,
      courseData,
      isPreview,
      lesson_uid,
      quizResult,
      section_uid,
    ]
  );

  // Early return if no content
  if (!courseData || contents.length === 0) {
    return <NoDataAvailable />;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {contents.map((item) => {
        const contentType = item.type;
        const renderer = CONTENT_RENDERERS[contentType];

        if (!renderer) {
          return null;
        }

        return (
          <div
            key={item.id}
            className={cn("space-y-4 md:space-y-6 [&>hr]:last:hidden")}
          >
            <ContentElement
              type={contentType}
              courseData={courseData}
              data={item}
              isOnlyContent={contents.length === 1}
              contents={contents}
              isPreview={isPreview}
              lessonMetadataHeight={lessonMetadataHeight}
              onCompleteContent={(props) =>
                onCompleteContent(
                  item?.uid ?? "",
                  item?.type,
                  props?.duration,
                  props?.pause_at,
                  props?.quiz_id
                )
              }
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
});

export { LessonContentBlocks, type LessonContentBlockProps };
