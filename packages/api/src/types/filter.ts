import type { TMyCourseStatus } from './my-learning-space';

export interface IFilter {
  page?: number;
  per_page?: number;
  sort?: string;
  search_term?: string;
  search_categories?: string;
  campaign_id?: string;
  org_id?: string;
  type?: string;
  user_id?: string;
  preloads?: string | string[];
  category_id_in?: string | string[];
  org_id_in?: string | string[];
  complete_status_in?: string | string[];
  event?: string;
  role?: string;
  currency?: string;
  is_pay?: boolean;
  latest?: boolean;
  parent_id_null?: boolean;
  is_verified?: boolean;
  is_active?: boolean;
  enable_root?: boolean;
  not_org_id?: string;
  category_id?: string;
  hashtag_id?: string;
  status?: string;
  group?: TMyCourseStatus;
  has_launchpad?: boolean;
  section_count_gte?: number;
  version?: number;
}
