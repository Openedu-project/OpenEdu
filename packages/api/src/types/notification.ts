import type { HTTPPagination } from './fetch';

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
    course_cuid?: string;
    course_id?: string;
    course_name?: string;
    course_slug?: string;
    org_domain?: string;
    org_id?: string;
    org_name?: string;
    blog_cuid?: string;
    blog_slug?: string;
    blog_title?: string;
    display_name?: string;
    course_roles?: string[];
    user_id?: string;
    username?: string;
    amount?: string;
    currency?: string;
    provider?: 'youtube_playlist' | 'learner_description';
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
