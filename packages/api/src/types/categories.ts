import type { HTTPPagination } from './fetch';

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

export type TTaxonomyItem = 'level' | 'category';

export interface ITaxonomyItem {
  id: string;
  name: string;
  active: boolean;
  parent_id: string;
  order: number;
  type: TTaxonomyItem;
  create_at: number;
  update_at: number;
  delete_at: number;
  org_id: string;
  use_count: number;
  formatted?: string;
}

export interface ICategory extends ITaxonomyItem {
  type: 'category';
}

export interface ILevel extends ITaxonomyItem {
  type: 'level';
}

export interface ICategoriesResponse extends HTTPPagination<ICategory> {}
