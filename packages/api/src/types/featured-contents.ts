import type { HTTPPagination } from './fetch';

export interface FeaturedContentParams {
  org_id: string;
  type: string;
  entity_type: string;
}

export interface IFeaturedContent<T> {
  id: string;
  org_id: string;
  entity_id: string;
  entity_type: string;
  enabled: boolean;
  order: number;
  type: string;
  entity?: T;
}
export interface IFeaturedContentResponse<T> extends HTTPPagination<IFeaturedContent<T>> {}

export interface IFeaturedContentEntityItem {
  entity_id: string;
  order: number;
}
export interface IFeaturedContentRequest extends Pick<IFeaturedContent<undefined>, 'org_id' | 'type' | 'entity_type'> {
  entities: IFeaturedContentEntityItem[];
}
