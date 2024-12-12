export interface IFilter {
  page: number;
  per_page: number;
  sort?: string;
  search_term?: string;
  search_categories?: string;
  org_id?: string;
  type?: string;
  user_id?: string;
  preloads?: string;
  is_pay?: boolean;
  latest?: boolean;
}
