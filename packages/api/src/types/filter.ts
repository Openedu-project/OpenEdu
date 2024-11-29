export interface IFilter {
  page: number;
  per_page: number;
  sort?: string;
  search_term?: string;
  search_categories?: string;
  org_id?: string;
  type?: string;
}
