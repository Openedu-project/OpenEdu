import type { TLessonContent } from "@oe/api";
import type { IQuizItemResponse } from "@oe/api";
import { type JSX, useMemo } from "react";
import { cn } from "#utils/cn";
import type { ContentRenderer } from "./_types/types";
import { ContentPdf } from "./content-pdf";
import { ContentEmbedded } from "./content-player/content-embedded";
import { ContentVideo } from "./content-player/content-video";
import { ContentQuiz } from "./content-quiz/content-quiz";
import { ContentText } from "./content-text";

interface IContentWrapperProps {
  children: JSX.Element;
  maxHeight: string;
  className?: string;
  fullHeight?: boolean;
}

const HEADER_HEIGHT_VAR = "var(--header-with-sub-item-height)";
const DEFAULT_PADDING = 16;
const QUIZ_INFO_HEIGHT = 80; // Estimated height for VideoQuizInfo

const CONTENT_STYLES = {
  common: {
    default: "",
    multi: "",
  },
  video: "md:h-full md:w-auto aspect-video md:object-contain",
  embedded: "md:h-full md:w-auto aspect-video md:object-contain",
  quiz: "md:h-full md:w-auto aspect-video md:object-contain",
} as const;

/**
 * Maximum height calculation based on the height of LessonMetadata and Content type
 */
const calculateMaxHeight = (
  lessonMetadataHeight = 0,
  contentType: TLessonContent = "video",
  hasQuiz?: boolean
) => {
  // Điều chỉnh padding dựa trên loại content
  const extraOffset = contentType === "video" && hasQuiz ? QUIZ_INFO_HEIGHT : 0;

  return `calc(100dvh - ${HEADER_HEIGHT_VAR} - ${lessonMetadataHeight}px - ${DEFAULT_PADDING}px - ${extraOffset}px)`;
};

const getContentClassName = (isOnlyContent: boolean, additionalClasses = "") =>
  cn(
    CONTENT_STYLES.common[isOnlyContent ? "default" : "multi"],
    additionalClasses
  );

/**
 * Wrapper Component for content types need max-height
 */
const ContentWrapper = ({
  children,
  maxHeight,
  className = "",
  fullHeight = false,
}: IContentWrapperProps) => (
  <div
    style={{
      maxHeight,
      ...(fullHeight ? { height: maxHeight } : {}),
    }}
    className={cn("md:flex md:items-center md:justify-center", className)}
  >
    {children}
  </div>
);

// Content renderers
export const CONTENT_RENDERERS: Record<TLessonContent, ContentRenderer> = {
  video: {
    render: ({
      data,
      courseData,
      onCompleteContent,
      isOnlyContent,
      isPreview,
      lessonMetadataHeight = 0,
    }) => {
      const file = data?.files?.[0];
      const quizzes =
        data?.quizzes && data?.quizzes?.length > 0 ? data.quizzes : undefined;

      // The maximum height for the video has taken into account VideoQuizInfo
      const maxHeight = useMemo(
        () =>
          calculateMaxHeight(lessonMetadataHeight, "video", Boolean(quizzes)),
        [lessonMetadataHeight, quizzes]
      );

      return (
        <ContentVideo
          src={file?.url}
          title={file?.name}
          quizzes={quizzes as unknown as IQuizItemResponse[]}
          courseData={courseData}
          maxHeight={maxHeight}
          onComplete={(duration, pause_at, quiz_id) =>
            onCompleteContent?.({
              uid: data?.uid,
              duration,
              pause_at,
              quiz_id,
            })
          }
          onlyVideoContent={isOnlyContent}
          isPreview={isPreview}
        />
      );
    },
    getClassName: (isOnlyContent) =>
      getContentClassName(isOnlyContent, CONTENT_STYLES.video),
  },

  pdf: {
    render: ({ data, onCompleteContent }) => {
      const url = data?.files?.[0]?.url || "";

      return (
        <ContentPdf
          url={url}
          onComplete={() => onCompleteContent?.({ uid: data?.uid })}
        />
      );
    },
    getClassName: (isOnlyContent) => getContentClassName(isOnlyContent),
  },

  embedded: {
    render: ({
      data,
      onCompleteContent,
      isOnlyContent,
      lessonMetadataHeight = 0,
    }) => {
      const maxHeight = useMemo(
        () => calculateMaxHeight(lessonMetadataHeight, "embedded"),
        [lessonMetadataHeight]
      );

      return (
        <ContentWrapper maxHeight={maxHeight} className="mx-auto aspect-video">
          <ContentEmbedded
            url={data?.content}
            onComplete={(duration, pause_at) =>
              onCompleteContent?.({
                uid: data?.uid,
                duration,
                pause_at,
              })
            }
            onlyVideoContent={isOnlyContent}
          />
        </ContentWrapper>
      );
    },
    getClassName: (isOnlyContent) =>
      getContentClassName(isOnlyContent, CONTENT_STYLES.embedded),
  },

  quiz: {
    render: ({
      data,
      courseData,
      onCompleteContent,
      isPreview,
      lessonMetadataHeight = 0,
    }) => {
      const quiz = data?.quizzes?.[0];
      const maxHeight = useMemo(
        () => calculateMaxHeight(lessonMetadataHeight, "quiz"),
        [lessonMetadataHeight]
      );

      return (
        <ContentWrapper
          maxHeight={maxHeight}
          fullHeight
          className="md:!h-full md:!aspect-video"
        >
          <ContentQuiz
            quiz={quiz}
            course_data={courseData}
            settings={quiz?.settings}
            onComplete={() => onCompleteContent?.({ uid: data?.uid })}
            is_preview={isPreview}
          />
        </ContentWrapper>
      );
    },
    getClassName: (isOnlyContent) =>
      getContentClassName(isOnlyContent, CONTENT_STYLES.quiz),
  },

  text: {
    render: ({ data, onCompleteContent }) => (
      <ContentText
        data={data}
        onComplete={() => onCompleteContent?.({ uid: data?.uid })}
      />
    ),
    getClassName: (isOnlyContent) => getContentClassName(isOnlyContent),
  },
};
