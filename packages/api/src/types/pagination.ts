export interface IPagination {
  page?: number;
  per_page?: number;
  total_pages?: number;
  total_items?: number;
}

export interface IDataPagination<T> {
  results: T;
  pagination: IPagination;
}
