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
  event?: string;
  role?: string;
  currency?: string;
  is_pay?: boolean;
  latest?: boolean;
  parent_id_null?: boolean;
  is_verified?: boolean;
  is_active?: boolean;
  enable_root?: boolean;
}
