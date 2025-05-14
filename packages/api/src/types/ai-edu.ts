import type { IFileResponse } from '#types/file';
import type { HTTPPagination } from './fetch';
import type { ISystemConfigRes } from './system-config';
export interface AIEduStatistics {
  register_count: number;
  ref_count: number;
  cert_count: number;
}

export interface AIEduLeaderBoards {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  parent_id: '';
  local_level: number;
  display_name: string;
  email: string;
  ref_count: number;
  cert_count: number;
  register_count: number;
  percent_cert_on_ref: number;
  percent_cert_on_reg: number;
  oe_point_campaign_id: string;
  course_cuid: string;
  campaign_key: string;
  user: undefined;
  oe_point_campaign: undefined;
}

export interface IAIEduCourseItem {
  course_cuid?: string;
  name: string;
  thumbnail?: IFileResponse;
}
export interface AIEduSystemConfig {
  campaign_key: string;
  courses: IAIEduCourseItem[];
  form_event: string;
  org_id: string;
}

export interface AIEduSystemConfigRes extends ISystemConfigRes<AIEduSystemConfig> {}

export type IAIEduTimeFormat = 'hour' | 'day' | 'month' | 'year';

export interface IAIEduParamsPayload {
  fromDate: number;
  toDate: number;
  groupBy: IAIEduTimeFormat;
  courseCuids?: string | string[];
}

export interface IAIEduStatisticWidget {
  total_registered_users: number;
  total_enrolled_users: number;
  total_completed_users: number;
  completion_rate: number;
}

export interface IAIEduProvince {
  id: string;
  label: string;
  value: string;
}

export interface IAIEduStatisticPoint {
  timestamp: string;
  time_label: string;
  value: number;
  growth_rate: number;
}

export interface IAIEduStatisticLearningGrowth {
  group_by: 'hour' | 'day' | 'moneth' | 'year';
  points: IAIEduStatisticPoint[];
}

export interface IAIEduModuleItem {
  section_uid: string;
  section_name: string;
  order: number;
  completed_count: number;
}

export interface IAIStatisticSectionCompletion {
  course_cuid: string;
  course_name: string;
  module_items: IAIEduModuleItem[];
}

export interface IAIEduStatisticProvince {
  province: string;
  learner_count: number;
  learner_percent: number;
  enroll_count: number;
  completion_count: number;
  certificate_count: number;
  cert_on_enroll_percent: number;
}
export interface IAIEduStatisticProvinceDetailSection {
  section_uid: string;
  section_name: string;
  order: number;
  completed_count: number;
}

export interface IAIEduStatisticProvinceDetailCourse {
  name: string;
  active_section: number;
  sections: IAIEduStatisticProvinceDetailSection[];
}

export interface IAIEduStatisticProvinceDetail {
  province: string;
  register_count: number;
  enroll_count: number;
  complete_count: number;
  completion_rate: number;
  courses: IAIEduStatisticProvinceDetailCourse[];
}

export interface IAIEduStatisticLearnersCourse {
  name: string;
  active_section: number;
  enroll_date: number;
  number_of_completed_section: number;
  can_claim_cert: boolean;
  claim_cert_date: number;
}

export interface IAIEduStatisticLearners {
  id: string;
  full_name: string;
  job: string;
  age_group: string;
  email: string;
  school: string;
  province: string;
  source: string;
  courses: IAIEduStatisticLearnersCourse[];
}
export interface IAIEduStatisticLearnersRes extends HTTPPagination<IAIEduStatisticLearners> {
  length: number;
}
