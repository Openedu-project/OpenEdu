import { z } from '@oe/api/utils/zod';
import type { KeyedMutator } from 'swr';
import type { IBookmark } from '#types/bookmark';
import type { IDataPagination } from '#types/pagination';
import type { IAICourse, IAICourseStatus } from './ai-course';
import type {
  ICourseFile,
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
import type { ICategory } from './category';
import type { ISection } from './segment';

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
  thumbnail: ICourseFile;
  medias: ICourseFile[];
  docs: ICourseFile[];
  has_certificate: boolean;
  levels: [];

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
  learner_count: number;

  accesses: TCourseRoles | null;
  partners: null;
  categories: null;
  reviewing: ICourseVersion | null;
  root_request: null;
  org_request: null;
  published: ICourseVersion[] | null;
  form_relations: null;
  rating: number;

  is_ai_generated: boolean;
  ai_generate_status: IAICourseStatus;
  ai_course: IAICourse | null;
}

export interface ICourseOutline extends ICourse {
  outline: ISection[];
  learning_progress_overview: null;
}

export type IMutateCourse<T> = KeyedMutator<IDataPagination<T[]>>;

export const courseSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  update_at: z.number(),
  delete_at: z.number(),
  cuid: z.string(),
  version: z.number(),
  name: z.string(),
  description: z.string(),
  learn_method: z.string(),
  user_id: z.string(),
  is_pay: z.boolean(),
  is_enrolled: z.boolean(),
  is_paid: z.boolean(),
  price: z.number(),
  discount_price: z.number(),
  currency: z.string(),
  section_count: z.number(),
  lesson_count: z.number(),
  active_lesson: z.number(),
  medias: z.array(z.string()).nullable(),

  learner_count: z.number(),
  rating: z.number(),
  slug: z.string(),
  pub_date: z.number(),
  pub_root_date: z.number(),
  pub_reject_date: z.number(),
  pub_root_reject_date: z.number(),
  latest: z.boolean(),
  enable: z.boolean(),
  start_date: z.number(), // default = 0
  end_date: z.number(), // similar with start_date
  docs: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'Doc ID is required' }),
      })
    )
    .default([]),
});

export type ICourseType = z.infer<typeof courseSchema>;

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
