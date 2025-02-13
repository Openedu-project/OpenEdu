import type { IMessageData } from '@oe/api/types/conversation';
import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { IUser } from './user';

export interface IBadgeEventData {
  badge: number;
  user_id: string;
}

export interface ICourseEventData {
  code: number;
  content: string;
  create_at: number;
  delete_at: number;
  entity_id: string;
  entity_type: string;
  id: string;
  props: Record<string, unknown>;
  read_at: number;
  target_id: string;
  target_type: string;
  update_at: number;
  user_id: string;
}
export interface IPaymentEventData {
  data: {
    order_id: string;
    order_status: string;
    payment_status: string;
  };
  data_id: string;
  data_type: string;
  time_stamp: string;
}

export interface INotificationSocketData {
  User?: IUser;
  code: number;
  content: string;
  create_at: number;
  delete_at: number;
  id: string;
  jump_entity?: {
    entity_id?: string;
    entity_type?: string;
  };
  props: {
    course_roles?: string;
    collaborator?: string;
    user_id?: string;
    username?: string;
    course_id?: string;
    course_cuid?: string;
    course_name?: string;
    course_slug?: string;
    org_id?: string;
    org_domain?: string;
    approval_id?: string;
    amount?: string;
    currency?: string;
    display_name?: string;
    org_name?: string;
    blog_cuid?: string;
    blog_title?: string;
    blog_slug?: string;
    provider?: string;
    launchpad_id?: string;
    launchpad_name?: string;
    token?: string;
    email?: string;
    fullname?: string;
    user?: IUser;
  };
  update_at: number;
}

export interface ICertificateEventData {
  can_receive: false;
  is_received: false;
}

export interface IAIBlogStatusData {
  blog_id: string;
  status: 'generated' | 'failed';
  blog_slug?: string;
  blog_title?: string;
  update_at?: number;
  error_code?: string;
  rewrite_id?: string;
}

export interface IAICourseStatusData {
  course_id: string;
  status: IAICourseStatus;
  course_slug?: string;
  course_name?: string;
  update_at?: number;
  error_code?: string;
  thumbnail_status?: IAICourseStatus;
  general_info_status?: IAICourseStatus;
}
export interface IPaymentSocket {
  order_id: string;
  payment_status: string;
  order_status: string;
}

export type EventData =
  | ICourseEventData
  | IBadgeEventData
  | IPaymentEventData
  | ICertificateEventData
  | IAIBlogStatusData
  | IAICourseStatusData
  | IPaymentSocket
  | IMessageData;

export interface Broadcast {
  omit_user_ids: string[];
  user_id: string;
  course_id: string;
  org_id: string;
  channel_id: string;
  connection_id: string;
  omit_connection_id: string;
  all: boolean;
}

export interface ISocketRes<T extends EventData> {
  event: string;
  data: T;
  broadcast: Broadcast;
  seq: number;
}

export interface ISocketStore {
  badgeData: ISocketRes<IBadgeEventData> | null;
  courseData: ISocketRes<ICourseEventData> | null;
  paymentData: ISocketRes<IPaymentEventData> | null;
  notificationData: ISocketRes<IPaymentEventData> | null;
  certificateData: ISocketRes<ICertificateEventData> | null;
  AIBlogStatusData: ISocketRes<IAIBlogStatusData> | null;
  AICourseStatusData: ISocketRes<IAICourseStatusData> | null;
  setSocketData: <T extends EventData>(data: ISocketRes<T>) => void;
  resetSocketData: (
    key: 'badge' | 'course' | 'payment' | 'notification' | 'certificate' | 'ai_blog_status' | 'ai_course_status'
  ) => void;
}
