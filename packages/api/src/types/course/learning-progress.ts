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
  text_percent: number;
  video_percent: number;
  pdf_current_page: number;
}

export interface ILessonContentByUid {
  [key: string]: IContentProgress;
}

export interface ILessonProgress {
  lesson_uid: string;
  total_lesson_content: number;
  completed_lesson_content: number;
  complete_at: number;
  completed_percent: number;
  lesson_content_by_uid: ILessonContentByUid;
}

export interface ILessonByUid {
  [key: string]: ILessonProgress;
}

export interface ISectionProgress {
  section_uid: string;
  total_lesson: number;
  completed_lesson: number;
  complete_at: number;
  lesson_by_uid: ILessonByUid;
}

export interface ISectionByUid {
  [key: string]: ISectionProgress;
}

export interface ILearningProgress {
  course_cuid: string;
  total_lesson: number;
  completed_lesson: number;
  total_section: number;
  completed_section: number;
  complete_at: number;
  section_by_uid: ISectionByUid;
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
    Omit<ISectionProgress, 'section_uid' | 'lesson_by_uid'> {
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
