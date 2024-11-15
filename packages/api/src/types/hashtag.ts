// import { IDataPagination } from './pagination';

import type { HTTPPagination } from './fetch';

export interface IHashtag {
  hash: string;
  name: string;
  org_id: string;
  use_count: number;
  formatted_hashtag: string;
}

export interface IHashtagResponse extends HTTPPagination<IHashtag[]> {}
