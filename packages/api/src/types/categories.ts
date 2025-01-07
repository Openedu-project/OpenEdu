export interface ICategoryTree {
  id: string;
  name: string;
  type: string;
  order?: number;
  org_id?: string;
  use_count?: number;
  formatted?: string;
  child?: ICategoryTree[];
}

export interface ICategoryBulkUpsert {
  categories: ICategoryTree[];
}
