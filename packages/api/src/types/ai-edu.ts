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
