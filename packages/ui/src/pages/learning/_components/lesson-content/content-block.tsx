import type { TLessonContent } from '@oe/api/types/course/basic';
import { cn } from '#utils/cn';
import type { ContentRenderer, ContentRendererProps } from './_types/types';
import ContentText from './content-text';

interface ContentElementProps extends ContentRendererProps {
  type: TLessonContent;
}

const CONTENT_STYLES = {
  common: {
    default: 'h-full',
    multi: 'min-h-[calc(100%-24px)]',
  },
  video: 'mx-auto flex w-full max-w-full flex-col',
  // text: 'flex flex-col items-end',
} as const;

const DEFAULT_CLASSNAME = (isOnlyContent: boolean) => cn(CONTENT_STYLES.common[isOnlyContent ? 'default' : 'multi']);

export const CONTENT_RENDERERS: Record<TLessonContent, ContentRenderer> = {
  video: {
    render: () => <p>video</p>,
    getClassName: isOnlyContent => cn(DEFAULT_CLASSNAME(isOnlyContent), CONTENT_STYLES.video),
  },

  pdf: {
    render: () => <p>pdf</p>,
    getClassName: DEFAULT_CLASSNAME,
  },

  embedded: {
    render: () => <p>embedded</p>,
    getClassName: DEFAULT_CLASSNAME,
  },

  quiz: {
    render: () => <p>quiz</p>,
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

  return <div className="content-wrapper">{renderer.render(props)}</div>;
};
