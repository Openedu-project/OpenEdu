import type { ICourseParams } from './basic';
// ?role_id=partner&sort=create_at desc&search_term=duc&search_categories=email
export interface ICoursePartnersParams
  extends Pick<
    ICourseParams,
    'role_id' | 'sort' | 'search_categories' | 'search_term' | 'email' | 'page' | 'per_page'
  > {}
