import type { ICategory } from './categories';
import type { ICourse } from './course/course';
import type { ISection } from './course/segment';
import type { IFileResponse } from './file';
import type { IDataPagination } from './pagination';
import type { IUser } from './user';

export interface ICreateLaunchpadRequest
  extends Omit<
    Partial<ILaunchpad>,
    'id' | 'create_at' | 'update_at' | 'delete_at' | 'categories' | 'levels' | 'clp_voting_milestones'
  > {
  thumbnail_id?: string;
  preview_video_id?: string;
  id?: string;
  categories?: ILaunchpadCategoryRequest[] | null;
  levels?: ILaunchpadCategoryRequest[] | null;
  clp_voting_milestones?: {
    estimated_open_vote_date: number;
    target_section: number;
    order: number;
  }[];
}

export interface ILaunchpadProps {
  pool_id: string;
  wallet_id: string;
  reject_org_reason: string;
  reject_root_reason: string;
  pub_date: number;
  pub_root_date: number;
  pub_root_reject_date: number;
  pub_reject_date: number;
  bookmarked: boolean;
  owner_profile?: IUser;
}
export interface ILaunchpad {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  name: string;
  org_id: string;
  description: string;
  slug: string;
  learner_outcome: string;
  status: LaunchpadStatus;
  enable: boolean;
  voting_start_date: number;
  voting_end_date: number;
  funding_start_date: number;
  funding_end_date: number;
  user_id: string;
  courses?: ICourse[];
  owner?: IUser;
  thumbnail?: IFileResponse;
  preview_video?: IFileResponse;
  voting_milestones?: ILaunchpadVotingMilestone[];
  categories?: ICategory[];
  levels?: ICategory[];
  funding_goal: ILaunchpadFundingGoal;
  bookmarked: boolean;
  owner_profile?: IUser;
  total_funded?: number;
  total_pledged?: number;
  total_backers?: number;
  voting_stats?: {
    approved: number;
    declined: number;
    total: number;
  };
  progress?: number;
  days_left?: number;
  estimate_funding_days: number;
  props: ILaunchpadProps;
  outlines?: ISection[];
  total_amount: string;
  investment?: {
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    user_id: string;
    amount: string;
    revenue_amount: string;
    refunded_amount: string;
    currency: string;
    status: LaunchpadStatus;
  };
}

export interface ILaunchpadVotingMilestone {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  clp_launchpad_id: string;
  title: string;
  estimated_open_vote_date: number;
  estimated_end_vote_date: number;
  open_vote_date: number;
  end_vote_date: number;
  order: number;
  target_section: number;
  status: string;
  props: {
    course_ids: string[] | null;
  };
  voting_process: {
    is_voted: boolean;
    total_vote: number;
    approve_percentage: number;
    reject_percentage: number;
  } | null;
}

export interface IBackerData {
  total_amount: string;
  total_backers: number;
  funding_goal: {
    target_funding: string;
    currency: string;
    min_pledge: string;
    profit_percentage: number;
  };
  results: Array<{
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    user_id: string;
    user: {
      id: string;
      username: string;
      email: string;
      active: boolean;
      blocked: boolean;
      display_name: string;
      avatar: string;
      roles: null;
      cover_photo: string;
      skills: null;
      headline: string;
      phone: string;
      about: string;
      position: string;
      props: {
        locale: string;
        linkedin: string;
        github: string;
        website: string;
        facebook: string;
        telegram: string;
        x: string;
        gmail: string;
      };
      require_set_password: boolean;
    };
    clp_launchpad_id: string;
    clp_launchpad: null;
    amount: string;
    revenue_amount: string;
    refunded_amount: string;
    currency: string;
    status: string;
  }>;
  pagination: {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  };
}

export interface ILaunchpadFundingGoal {
  target_funding: string;
  currency: string;
  min_pledge: string;
  profit_percentage: number;
}

export interface ILaunchpadCategoryRequest extends Pick<ICategory, 'id'> {}

export interface ILaunchpadResponse extends IDataPagination<ILaunchpad[]> {}

export interface ILaunchpadMinPledgeOptionsResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  key: string; //'course_launchpad_min_pledge_options'
  value: number[];
  org_id: string;
  data_type: string;
  domain: string;
}

export interface ILaunchpadVotingPhaseRule {
  funding_goal_gte: number;
  funding_goal_lt: number;
  max_phases: number;
}

export interface ILaunchpadVotingPhaseRuleResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  key: string; //'course_launchpad_voting_phase_rule'
  value: ILaunchpadVotingPhaseRule[];
  org_id: string;
  data_type: string;
  domain: string;
}

export interface ILaunchpadMinApprovalPercentageResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  key: string; //'course_launchpad_min_approval_percentage'
  value: number;
  org_id: string;
  data_type: string;
  domain: string;
}

export interface ILaunchpadMinSections {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  key: string; //'course_launchpad_min_approval_percentage'
  value: number;
  org_id: string;
  data_type: string;
  domain: string;
}

export interface ICategorizedLaunchpads {
  pledged: ILaunchpad[];
  voting: ILaunchpad[];
  revenue: ILaunchpad[];
  refunded: ILaunchpad[];
  wishlist: ILaunchpad[];
}

export interface IUserLaunchpadStats {
  totalPledged: number;
  totalVoting: number;
  totalRevenue: number;
  totalRefunded: number;
  totalWishlist: number;
}

export interface IMyLaunchpadStatus {
  launchpad: ILaunchpad;
  investment: {
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    user_id: string;
    amount: string;
    revenue_amount: string;
    refunded_amount: string;
    currency: string;
    status: LaunchpadStatus;
  };
}

export type LaunchpadStatus =
  | 'draft'
  | 'reviewing'
  | 'rejected'
  | 'pledged'
  | 'approved'
  | 'publish'
  | 'cancelled'
  | 'success'
  | 'failed'
  | 'voting'
  | 'funding'
  | 'waiting'
  | 'got_revenue'
  | 'got_refunded';

export type IPledgeLaunchpadPayload = {
  launchpad_id: string;
  wallet_id: string;
  amount: number;
};
