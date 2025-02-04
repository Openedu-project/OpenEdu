import type { ICourseOutline } from './course/course';
import type { IDataPagination } from './pagination';

export type TMyCourseStatus = 'completed' | 'in_progress' | 'not_started' | 'wishlist';

export interface IMyCourseResponse extends IDataPagination<ICourseOutline[]> {}

export interface ICoursesCounting {
  in_progress: number;
  completed: number;
  not_started: number;
  wishlist: number;
}
