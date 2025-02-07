import type { ICourseOutline } from './course/course';
import type { HTTPPagination } from './fetch';

export type TMyCourseStatus = 'completed' | 'in_progress' | 'not_started' | 'wishlist';

export interface IMyCourseResponse extends HTTPPagination<ICourseOutline> {}

export interface ICoursesCounting {
  in_progress: number;
  completed: number;
  not_started: number;
  wishlist: number;
}
