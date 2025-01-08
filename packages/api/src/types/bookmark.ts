export interface IBookmark {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  name: string;
  entity_id: string;
  entity_type: TBookmark;
  user_id: string;
  parent_id: null;
  link: string;
}

export type TBookmark = 'course';

export interface IBookmarkRequest {
  entity_id: string;
  entity_type: string;
}
