import type { KeyedMutator } from 'swr';
import type { IBookmark } from '#types/bookmark';
import type { ICategory, ILevel } from '#types/categories';
import type { IFileResponse } from '#types/file';
import type { IDataPagination } from '#types/pagination';
import type { IAICourse, IAICourseStatus } from './ai-course';
import type {
  ICourseOrganization,
  ICourseOwner,
  ICoursePreviewVideo,
  ICoursePriceSettings,
  ICourseProps,
  ICourseVersion,
  TCourseLearnMethod,
  TCourseRoles,
  TCourseStatus,
} from './basic';
import type { ILearningProgressOverview } from './learning-progress';
import type { ICourseOrganizationRequest } from './org-request';
import type { ISection } from './segment';

export interface IThumbnail extends Omit<IFileResponse, 'bunny_video_id'> {}

export interface ICourse {
  cuid: string;
  id: string;
  version: number;
  latest: boolean;

  name: string;
  slug: string;
  description: string;
  thumbnail_id: string;
  status: TCourseStatus;
  props: ICourseProps;
  enable: boolean;
  mark_as_completed: boolean;
  thumbnail: IFileResponse;
  medias: IFileResponse[];
  docs: IFileResponse[];
  has_certificate: boolean;
  levels: ILevel[];
  learner_count: number;
  rating: number;

  org: ICourseOrganization;
  owner: ICourseOwner;
  user_id: string;

  learn_method: TCourseLearnMethod;

  pub_date: number;
  pub_reject_date: number;
  pub_root_date: number;
  pub_root_reject_date: number;

  is_pay: boolean;
  price: string;
  currency: string;
  discount_price: string;
  is_paid: boolean;
  price_settings: ICoursePriceSettings;
  is_enrolled: boolean;

  is_wishlist: boolean;
  bookmark: IBookmark | null;

  start_date: number;
  end_date: number;
  create_at: number;
  update_at: number;
  delete_at: number;

  section_count: number;
  lesson_count: number;
  active_lesson: number;
  active_section: number;
  video_count: number;
  quiz_count: number;

  accesses: TCourseRoles | null;
  partners: null;
  categories?: ICategory[];
  reviewing: ICourseVersion | null;
  form_relations: null;

  root_request: null;
  org_request: ICourseOrganizationRequest | null;

  published: ICourseVersion[] | null;

  is_ai_generated: boolean;
  ai_generate_status: IAICourseStatus;
  ai_course: IAICourse | null;
}

export interface ICourseOutline extends ICourse {
  outline: ISection[];
  reviewing: ICourseVersion | null;
  learning_progress_overview: ILearningProgressOverview | null;
}

export type IMutateCourse<T> = KeyedMutator<IDataPagination<T[]>>;

export interface ICourseCategoryRequest extends Pick<ICategory, 'id'> {}

export interface ICreateCourseRequest
  extends Omit<
    Partial<ICourse>,
    'id' | 'create_at' | 'update_at' | 'delete_at' | 'categories' | 'levels' | 'docs' | 'medias'
  > {
  thumbnail_id?: string;
  id?: string;
  categories?: ICourseCategoryRequest[] | null;
  levels?: ICourseCategoryRequest[] | null;
  docs?: ICourseCategoryRequest[] | null;
  preview_lessons?: ICoursePreviewVideo[] | null;
  medias?: { id?: string }[] | null;
}

export interface ICourseResponse extends IDataPagination<ICourse[]> {}

export interface IEnrollCoursePayload {
  source: string;
  ref_by?: string;
}
