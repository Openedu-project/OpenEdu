import type { IDataPagination } from './pagination';

export interface FeaturedContentParams {
  org_id: string;
  type: string;
  entity_type: string;
}

export interface IFeaturedContent {
  id: string;
  org_id: string;
  entity_id: string;
  entity_type: string;
  enabled: boolean;
  order: number;
  type: string;
  entity: null;
}
export interface IFeaturedContentResponse extends IDataPagination<IFeaturedContent[]> {}

export interface IFeaturedContentEntityItem {
  entity_id: string;
  order: number;
}
export interface IFeaturedContentRequest extends Pick<IFeaturedContent, 'org_id' | 'type' | 'entity_type'> {
  entities: IFeaturedContentEntityItem[];
}
