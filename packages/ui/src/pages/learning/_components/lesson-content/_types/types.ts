import type { ICourseOutline } from '@oe/api';
import type { TLessonContent } from '@oe/api';
import type { ILessonContent } from '@oe/api';
import type { ICurrentQuestion } from '@oe/api';
import type React from 'react';

export interface ContentRendererProps {
  courseData: ICourseOutline;
  contents: ILessonContent[];
  data?: ILessonContent;
  isPreview?: boolean;
  isOnlyContent: boolean;
  lessonMetadataHeight?: number;
  onCompleteContent?: (props?: Partial<ICompleteContentProps>) => void;
  headerHeight?: number;
}

export interface ContentRenderer {
  render: (props: ContentRendererProps) => React.ReactElement;
  getClassName: (isOnlyContent: boolean) => string;
}

export interface ICompleteContentProps {
  uid: string;
  type: TLessonContent;
  duration?: number;
  pause_at?: number;
  quiz_id?: string;
}

export interface LessonContentBlockProps {
  contents?: ILessonContent[];
  course_data?: ICourseOutline;
  lesson_uid: string;
  section_uid: string;
  isPreview?: boolean;
  onCompleteContent?: (props?: Partial<ICompleteContentProps>) => void;
}

export type TAnswerInput = {
  answers: string | string[];
};

export interface IQuizzSubmissionState {
  id: string;
  num_questions: number;
  data?: ICurrentQuestion | null;
  start_at: number;
}
