import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILessonContent } from '@oe/api/types/course/segment';
import type { ICurrentQuestion } from '@oe/api/types/quiz';
import type React from 'react';

export interface ContentRendererProps {
  courseId: string;
  contents: ILessonContent[];
  data?: ILessonContent;
  isOnlyContent: boolean;
}

export interface ContentRenderer {
  render: (props: ContentRendererProps) => React.ReactElement;
  getClassName: (isOnlyContent: boolean) => string;
}

interface ICompleteContentProps {
  uid: string;
  type: TLessonContent;
  duration?: number;
  pause_at?: number;
  quiz_id?: string;
}

export interface LessonContentBlockProps {
  contents?: ILessonContent[];
  courseId: string;
  onCompleteContent?: ({ uid, type, duration, pause_at, quiz_id }: ICompleteContentProps) => void;
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
