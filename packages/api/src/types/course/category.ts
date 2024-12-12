import type { IDataPagination } from '#types/pagination';

export type TCategory = 'level' | 'category';

export interface ICategory {
  id: string;
  name: string;
  active: boolean;
  parent_id: string;
  order: number;
  type: TCategory;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export interface ICategoryTree {
  id: string;
  name: string;
  type: string;
  order: number;
  child?: ICategoryTree[];
}

export interface ICategoriesResponse extends IDataPagination<ICategory[]> {}
