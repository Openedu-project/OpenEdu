import type { TLessonContent } from '@oe/api/types/course/basic';
import { cn } from '#utils/cn';
import type { ContentRenderer, ContentRendererProps } from './_types/types';
import ContentPdf from './content-pdf';
import ContentEmbedded from './content-player/content-embedded';
import ContentVideo from './content-player/content-video';
import ContentQuiz from './content-quiz/content-quiz';
import ContentText from './content-text';

interface ContentElementProps extends ContentRendererProps {
  type: TLessonContent;
}

const CONTENT_STYLES = {
  common: {
    default: 'h-full',
    multi: 'min-h-[calc(100%-24px)]',
  },
  video: 'mx-auto max-w-full h-full',
  // video: 'mx-auto flex justify-center w-full max-w-full aspect-video h-auto',
  // text: 'flex flex-col items-end',
} as const;

const DEFAULT_CLASSNAME = (isOnlyContent: boolean) => cn(CONTENT_STYLES.common[isOnlyContent ? 'default' : 'multi']);

export const CONTENT_RENDERERS: Record<TLessonContent, ContentRenderer> = {
  video: {
    render: props => {
      const file = props?.data?.files?.[0];

      return <ContentVideo src={file?.url} title={file?.name} />;
    },
    getClassName: isOnlyContent => cn(DEFAULT_CLASSNAME(isOnlyContent), CONTENT_STYLES.video),
  },

  pdf: {
    render: props => {
      const files = props?.data?.files;
      const url = files && files?.length > 0 && files[0]?.url ? files[0]?.url : '';

      return <ContentPdf url={url} />;
    },
    getClassName: DEFAULT_CLASSNAME,
  },

  embedded: {
    render: props => <ContentEmbedded url={props?.data?.content} />,
    getClassName: DEFAULT_CLASSNAME,
  },

  quiz: {
    render: props => {
      const quizzes = props?.data?.quizzes;

      const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : undefined;

      return <ContentQuiz quiz={quiz} course_id={props.courseId} settings={quiz?.settings} />;
    },
    getClassName: DEFAULT_CLASSNAME,
  },

  text: {
    render: props => <ContentText data={props?.data} />,

    getClassName: DEFAULT_CLASSNAME,
  },
};

export const ContentElement = ({ type, ...props }: ContentElementProps) => {
  const renderer = CONTENT_RENDERERS[type];

  if (!renderer) {
    return null;
  }

  return <>{renderer.render(props)}</>;
};
