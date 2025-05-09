import type { HTTPPagination } from './fetch';
import type { IUser } from './user';

export interface INotificationItem {
  id: string;
  code: number;
  content: string;
  user_id: string;
  read_at: number;
  entity_id: string;
  entity_type: string;
  target_id: string;
  target_type: string;
  props: {
    [x: string]: string | IUser | string[] | undefined;
    course_cuid?: string;
    course_id?: string;
    course_name?: string;
    course_slug?: string;
    alt_domain?: string;
    org_domain?: string;
    next_section_uid?: string;
    next_lesson_uid?: string;
    org_id?: string;
    org_name?: string;
    blog_cuid?: string;
    blog_slug?: string;
    blog_title?: string;
    display_name?: string;
    course_roles?: string[];
    user_id?: string;
    username?: string;
    user_name?: string;
    amount?: string;
    currency?: string;
    provider?: 'youtube_playlist' | 'learner_description';
    collaborator?: string;
    email?: string;
    fullname?: string;
    user?: IUser;
    approval_id?: string;
    launchpad_id?: string;
    launchpad_name?: string;
    launchpad_slug?: string;
    token?: string;
  };
  create_at: number;
  update_at: number;
}

export interface INotificationRes extends HTTPPagination<INotificationItem> {
  badge_count: number;
}

export interface INotificationReadPayload {
  ids: string[];
  read: boolean;
  read_all: boolean;
}

export interface INotificationDeletePayload {
  ids: string[];
}
