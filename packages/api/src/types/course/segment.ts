// import { JSONContent } from "novel";

import type { IFileResponse } from '#types/file';
import type { IUser } from '../user';
import type { ICourseParams, TCourseStatus, TExcludedFieldRequest, TLessonContent } from './basic';

import type { ICourse } from './course';
import type { IQuizItemResponse } from './quiz';
// import { IQuizItemResponse } from "./quiz";

export interface ISegmentParams extends Partial<ICourseParams> {
  course_id: string;
  parent_id_null?: boolean;
  parent_id_not_null?: boolean;
  preloads?: 'lessons';
}

// count lesson content type
export interface ISegmentCount {
  count_active_doc_lesson: number;
  count_active_embed_lesson: number;
  count_active_pdf_lesson: number;
  count_active_pp_lesson: number;
  count_active_quiz_lesson: number;
  count_active_text_lesson: number;
  count_active_video_lesson: number;
  count_doc_lesson: number;
  count_embed_lesson: number;
  count_pdf_lesson: number;
  count_pp_lesson: number;
  count_quiz_lesson: number;
  count_text_lesson: number;
  count_video_lesson: number;
}

export interface ISegment extends ISegmentCount {
  course_id: string;
  user_id: string;
  title: string;
  note: string;
  order: number;
  free: boolean;
  status: TCourseStatus;
  parent_id: string;
  lesson_count: number;
  active_lesson: number;
  user: IUser | null;
  course: ICourse | null;
  lessons: ILesson[] | null;
  contents?: ILessonContent[] | null;
  id: string;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  uid: string;
  is_certificate_condition?: boolean;
}

/* SECTION */
export interface ISection extends Omit<ISegment, 'parent_id'> {}

export interface ICreateSectionRequest extends Omit<Partial<ISection>, 'id' | 'lessons'> {
  lessons?: ICreateLessonRequest[];
}

export interface IUpdateSectionRequest extends Omit<ISection, TExcludedFieldRequest | 'lessons'> {
  lessons: IUpdateLessonRequest | ICreateLessonRequest | null;
}

/* LESSON */
export interface ILesson extends Omit<ISegment, 'lessons'> {}

export interface IUpdateLessonRequest extends Omit<ILesson, TExcludedFieldRequest> {
  id: string;
}

export interface ICreateLessonRequest extends Omit<ILesson, TExcludedFieldRequest | 'parent_id'> {} //use in sections - bulk update API to create new lessons

export interface ILessonContent {
  id?: string;
  course_id?: string;
  status: string;
  title: string;
  note: string;
  free: boolean;
  type: TLessonContent;
  order: number;
  files?: IFileResponse[];
  quizzes?: IQuizItemResponse[];
  user_id?: string;
  section_id?: string;
  lesson_id?: string;
  content: string;
  // json_content?: JSONContent;
  duration: number;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  uid?: string;
}

export interface IUpdateLessonContentRequest {
  course_id: string;
  parent_id: string;
  status?: string;
  title?: string;
  note?: string;
  free?: boolean;
  order?: number;
  contents?: ILessonContent[];
}

export interface ICreateNewLessonRequest {
  course_id: string;
  parent_id: string;
  title: string;
  note: string;
  order: number;
  free: boolean;
  status: TCourseStatus;
} //use create new lesson

/* SECTIONS AND LESSONS*/
export interface IBulkSegments {
  course_id: string;
  sections: Partial<ISegment>[] | ICreateSectionRequest[];
}
