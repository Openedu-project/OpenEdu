import type { ILesson, ILessonContent, ISection } from './segment';

export interface ILearningProgressOverview {
  total_lessons: number;
  completed_lessons: number;
  current_section: ISection;
  current_lesson: ILesson;
}

export interface IContentProgress {
  lesson_content_uid: string;
  complete_at: number;
  pause_at: number;
  start_at: number;
  content_type: string;
  duration: number;
}

export interface ILessonProgress {
  lesson_uid: string;
  total_lesson_content: number;
  completed_lesson_content: number;
  complete_at: number;
  completed_percent: number;
  lesson_contents: IContentProgress[];
}

export interface ISectionProgress {
  section_uid: string;
  total_lesson: number;
  completed_lesson: number;
  complete_at: number;
  lessons: ILessonProgress[];
}

export interface ILearningProgress {
  course_cuid: string;
  total_lesson: number;
  completed_lesson: number;
  total_section: number;
  completed_section: number;
  complete_at: number;
  sections: ISectionProgress[];
}

export interface ILearningProgressPayload {
  course_slug: string;
  section_uid: string;
  lesson_uid: string;
  lesson_content_uid: string;
  complete_at: number;
  start_at: number;
  pause_at: number;
}

export type TEventLearningProgress = 'latest_lesson_progress';

export interface ILatestLessonProgressPayload {
  course_cuid: string;
  course_slug: string;
  user_id: string;
  section_uid: string;
  lesson_uid: string;
  event: TEventLearningProgress;
}

export interface ISectionLearningProgress
  extends Omit<ISection, 'lessons'>,
    Omit<ISectionProgress, 'section_uid' | 'lessons'> {
  lessons: ILessonLearningProgress[];
}

export interface ILessonLearningProgress
  extends Omit<ILesson, 'contents'>,
    Omit<ILessonProgress, 'lesson_uid' | 'lesson_contents'> {
  contents?: IContentLearningProgress[];
  lesson_contents: IContentProgress[];
  available?: boolean;
}

export interface IContentLearningProgress extends Omit<ILessonContent, 'uid'>, IContentProgress {
  uid: string;
}
