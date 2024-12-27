import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILessonContent } from '@oe/api/types/course/segment';
import type React from 'react';

export interface ContentRendererProps {
  courseId: string;
  contents: ILessonContent[];
  isOnlyContent: boolean;
}

export interface ContentRenderer {
  render: (props: ContentRendererProps) => React.ReactElement;
  getClassName: (isOnlyContent: boolean) => string;
}

export interface LessonContentBlockProps {
  contents?: ILessonContent[];
  courseId: string;
  onCompleteContent?: (
    uid: string,
    type: TLessonContent,
    duration?: number,
    pause_at?: number,
    quizId?: string
  ) => void;
}
