import type { IFileResponse } from '@oe/api/types/file';

export type IAICourseStatus = 'failed' | 'manual' | 'completed' | 'generating' | 'pending' | 'waiting' | 'setting';

type IThumbnailStype =
  | 'general'
  | 'anime'
  | 'creative'
  | 'dynamic'
  | 'environment'
  | 'illustration'
  | 'photography'
  | 'ray_trace_3d'
  | 'render_3d'
  | 'sketch_bw'
  | 'sketch_color';

type IDurationType = 'week' | 'day';

type ICurrentStep =
  | 'youtube_playlist_generate'
  | 'quiz_generate'
  | 'learner_description_generate'
  | 'thumbnail_generate'
  | 'outline_generate';

export type IAICourseType = 'youtube_playlist' | 'learner_description';

// Base interface containing common fields
export interface IAICourseBase {
  language?: string;
  tone?: string;
  material_id?: string;
  level_id?: string;
  duration?: number;
  duration_type?: IDurationType;
  thumbnail_id?: string;
  thumbnail_description?: string;
  thumbnail_quantity?: number;
  thumbnail_style?: string | IThumbnailStype; // Unified type to handle both interfaces
  course_cuid?: string;
}

// Extended interface for full AI Course

export type TAIOffterType = 'youtube_playlist' | 'learner_description';
export interface IAICourse extends IAICourseBase {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  playlist_id: string;
  playlist_link: string;
  offer_id: string;
  course_id: string;
  status: IAICourseStatus;
  total_cost: number;
  org_id: string;
  user_id: string;
  retry_count: number;
  offer_type: TAIOffterType;
  course_title: string;
  course_description: string;
  slug: string;
  summary_included: boolean;
  quiz_included: boolean;
  quiz_type: string;
  number_of_question: number;
  error: null | IError;
  learner_info: string;
  content_info: string;
  study_load: number;
  thumbnail_status?: IAICourseStatus;
  generated_thumbnail_ids?: null;
  thumbnail_generated?: null | IFileResponse[];
  material?: IFileResponse;
  general_info_status?: IAICourseStatus;
  thumbnail_generate_count?: number;
}

// Extended interface for AI Course Request
export interface IAICourseRequest extends IAICourseBase {
  type: IAICourseType;
  leaner_info?: string;
  content_info?: string;
  current_step?: ICurrentStep;
  title?: string;
  description?: string;
}

interface IError {
  code: number;
  msg: string;
}
