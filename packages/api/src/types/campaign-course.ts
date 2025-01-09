import type { ICourse, IThumbnail } from './course/course';
import type { IDataPagination } from './pagination';

export interface IAffiliateCampaignCourse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  org_id: string;
  org_schema: string;
  course_cuid: string;
  campaign_id: string;
  enable: boolean;
  start_date: number;
  end_date: number;
  campaign: null;
  course: ICourse;
  publish_course: {
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    course_slug: string;
    course_cuid: string;
    course_id: string;
    org_id: string;
    name: string;
    is_pay: boolean;
    price: string;
    description: string;
    user: {
      id: string;
      username: string;
      display_name: string;
      email: string;
      active: boolean;
      blocked: boolean;
      roles: string[];
      avatar: string;
    };
    thumbnail: IThumbnail | null;
    categories: null;
  };
}

export interface IAffiliateCampaignPublishCourse extends IAffiliateCampaignCourse {}

export interface IAffiliateCampaignCourseListRes extends IDataPagination<IAffiliateCampaignCourse[]> {}
export interface IAffiliateCampaignPublishCourseListRes extends IDataPagination<IAffiliateCampaignPublishCourse[]> {}

export interface IAddCoursesPayload {
  course_cuids: string[];
}
