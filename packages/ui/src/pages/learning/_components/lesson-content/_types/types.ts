import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ILessonContent } from '@oe/api/types/course/segment';
import type { ICurrentQuestion } from '@oe/api/types/quiz';
import type React from 'react';

export interface ContentRendererProps {
  courseData: ICourseOutline;
  contents: ILessonContent[];
  data?: ILessonContent;
  isOnlyContent: boolean;
  onCompleteContent?: (props?: Partial<ICompleteContentProps>) => void;
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
  // courseId: string;
  // course_slug: string;
  course_data: ICourseOutline;
  lesson_uid: string;
  section_uid: string;
  // outline: ISectionLearningProgress[];
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
