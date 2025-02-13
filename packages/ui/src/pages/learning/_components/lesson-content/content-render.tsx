import type { TLessonContent } from '@oe/api/types/course/basic';
import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import { cn } from '#utils/cn';
import type { ContentRenderer } from './_types/types';
import ContentPdf from './content-pdf';
import ContentEmbedded from './content-player/content-embedded';
import ContentVideo from './content-player/content-video';
import ContentQuiz from './content-quiz/content-quiz';
import ContentText from './content-text';

const CONTENT_STYLES = {
  common: {
    default: 'h-full',
    multi: 'min-h-[calc(100%-24px)] py-4',
  },
  video: 'h-full',
  embedded: '[&>div>div>div>iframe]:w-full',
  quiz: 'h-full px-2 md:px-0',
} as const;

const DEFAULT_CLASSNAME = (isOnlyContent: boolean) => cn(CONTENT_STYLES.common[isOnlyContent ? 'default' : 'multi']);

export const CONTENT_RENDERERS: Record<TLessonContent, ContentRenderer> = {
  video: {
    render: props => {
      const file = props?.data?.files?.[0];
      const quizzes = props?.data?.quizzes;

      return (
        <ContentVideo
          src={file?.url}
          title={file?.name}
          quizzes={(quizzes && quizzes.length > 0 ? quizzes : undefined) as unknown as IQuizItemResponse[]}
          courseData={props?.courseData}
          onComplete={(duration, pause_at, quiz_id) =>
            props?.onCompleteContent?.({
              uid: props?.data?.uid,
              duration,
              pause_at,
              quiz_id,
            })
          }
          onlyVideoContent={props?.isOnlyContent}
          isPreview={props?.isPreview}
        />
      );
    },
    getClassName: isOnlyContent =>
      cn(DEFAULT_CLASSNAME(isOnlyContent), CONTENT_STYLES.video, !isOnlyContent && 'md:[&>div>iframe]:w-full'),
  },

  pdf: {
    render: props => {
      const files = props?.data?.files;
      const url = files && files?.length > 0 && files[0]?.url ? files[0]?.url : '';

      return <ContentPdf url={url} onComplete={() => props?.onCompleteContent?.({ uid: props?.data?.uid })} />;
    },
    getClassName: DEFAULT_CLASSNAME,
  },

  embedded: {
    render: props => (
      <ContentEmbedded
        url={props?.data?.content}
        onComplete={(duration, pause_at) =>
          props?.onCompleteContent?.({
            uid: props?.data?.uid,
            duration,
            pause_at,
          })
        }
        onlyVideoContent={props?.isOnlyContent}
      />
    ),
    getClassName: isOnlyContent => cn(DEFAULT_CLASSNAME(isOnlyContent), !isOnlyContent && CONTENT_STYLES.embedded),
  },

  quiz: {
    render: props => {
      const quizzes = props?.data?.quizzes;

      const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : undefined;

      return (
        <ContentQuiz
          quiz={quiz}
          course_data={props?.courseData}
          settings={quiz?.settings}
          onComplete={() => props?.onCompleteContent?.({ uid: props?.data?.uid })}
          is_preview={props?.isPreview}
        />
      );
    },
    getClassName: () => cn(DEFAULT_CLASSNAME, CONTENT_STYLES.quiz),
  },

  text: {
    render: props => (
      <ContentText data={props?.data} onComplete={() => props?.onCompleteContent?.({ uid: props?.data?.uid })} />
    ),

    getClassName: DEFAULT_CLASSNAME,
  },
};
