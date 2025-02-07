export interface ICourseCategory {
  id: string;
  name?: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  active: boolean;
  parent_id?: string;
  order: number;
  type: 'level' | 'category';
}
