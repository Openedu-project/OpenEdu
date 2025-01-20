import type { LanguageCode } from '@oe/i18n/languages';
import type { HTTPPagination } from './fetch';
import type { IFileResponse } from './file';
import type { IHashtag } from './hashtag';
import type { IOrganization } from './organizations';
import type { IUserProfile } from './user-profile';

interface IBlogCategory {
  id: string;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  name: string;
  active?: boolean;
  parent_id?: null | string;
  order?: number;
  type?: string;
}

// interface IBanner {
//   name: string;
//   mime: string;
//   ext: string;
//   url: string;
//   thumbnail_url: string;
//   id: string;
//   create_at: number;
//   update_at: number;
//   delete_at: number;
//   width: number;
//   height: number;
//   size: number;
//   duration: number;
//   bunny_video_id?: string;
// }

interface IAIInfo {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  link: string;
  blog_id: string;
  status: string;
  title: string;
  cost: number;
  metadata: string;
  error: { msg: string; code: string } | null;
}
export interface IBlog {
  id: string;
  create_at: number;
  update_at: number;
  delete_at?: number;
  author_id: string;
  banner_id: string;
  title: string;
  slug: string;
  content: string;
  json_content: string | null;
  time_read: number;
  status: string;
  schedule_at: number;
  blog_type: 'org' | 'personal';
  cuid: string;
  version: number;
  latest: boolean;
  props?: Props;
  pub_date?: number;
  pub_reject_date?: number;
  is_pin?: boolean;
  categories: IBlogCategory[];
  description: string;
  hashtag: IHashtag[];
  org?: IOrganization;
  banner: IFileResponse;
  image_description?: string;
  author: IUserProfile;
  published_blog?: IBlogHistory[];
  reviewing_blog?: IBlogHistory;
  unpublished?: IBlogHistory[];
  is_ai_generated: boolean;
  ai_generated_info?: IAIInfo;
  locale: LanguageCode;
  // TODO: adjust later
  cmt_count?: number;
  like_count?: number;
}
interface Props {
  reject_org_reason?: string;
}

export interface IBlogsResponse extends HTTPPagination<IBlog> {}
export interface IBlogListResponse extends HTTPPagination<IBlog[]> {}

export interface IBlogRequest {
  banner_id: string;
  category_ids?: { id: string }[];
  hashtag_names?: { name: string }[];
  content: string;
  title: string;
  blog_type: string;
  is_publish: boolean;
  is_ai_generated: boolean;
  description?: string;
  image_description?: string;
}

export interface IEditBlogRequest extends IBlogRequest {
  id: string;
}

export interface IBlogHistory {
  id: string;
  title: string;
  version: number;
  status: string;
  pub_date: number;
}

export interface ICategoryBlogItem {
  id?: string;
  category_name: string;
  blogs: IBlog[];
}

export interface ICategoryBlogsResponse {
  result: Record<string, ICategoryBlogItem>;
  organize: IOrganization;
}

export interface IBlogURL {
  link: string;
  blog_type: string;
}

export interface IAIBlogRequest {
  ai_blog_request_type: 'generate_blog' | 'rewrite_paragraph' | 'rewrite_from_link';
  blog_cuid?: string;
  link?: string;
  text?: string;
  blogs?: IBlogURL[];
  language?: string;
  tone?: string;
}

export interface IRewriteResponse {
  content: string;
  blog_id?: string;
  blog_cuid?: string;
  ai_blog_id: string;
  rewrite_id: string;
  status: string;
  current_step: string;
  author_id: string;
}

export interface IAIBlogResponse {
  blog_id: string;
  blog_cuid: string;
  ai_blog_id: string;
  rewrite_id: string;
  status: string;
  current_step: string;
  author_id: string;
}
