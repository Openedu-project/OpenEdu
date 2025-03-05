import type { TCourseRoles } from './basic';

export interface ICoursePartner {
  id: string;
  username?: string;
  email?: string;
  avatar?: string;
  active?: boolean;
  blocked?: boolean;
  roles?: TCourseRoles[];
  enable?: boolean;
  display_name?: string;
}
