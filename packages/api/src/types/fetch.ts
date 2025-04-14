export type TSort = 'create_at desc' | 'create_at asc' | '"order" asc';

export interface HTTPResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface IPagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
  next_cursor: string;
}

export interface HTTPPagination<T> {
  results: T[];
  pagination: IPagination;
}

export interface HTTPPaginationResponse<T> {
  code: number;
  msg: string;
  data: HTTPPagination<T>;
}
