export interface IPagination {
  page?: number;
  per_page?: number;
  total_pages?: number;
  total_items?: number;
  next_cursor?: string;
  prev_cursor?: string;
}

export interface IDataPagination<T> {
  results: T;
  pagination: IPagination;
}
