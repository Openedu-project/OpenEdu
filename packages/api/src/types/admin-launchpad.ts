import type { ICourse, ICourseOwner } from './course';
import type { HTTPPagination } from './fetch';
import type { IFileResponse } from './file';
import type { IUser } from './user';

interface IFundinggoal {
  target_funding: string;
  currency: string;
  min_pledge: string;
  profit_percentage: number;
}

export interface IAdminLaunchpadItem {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  name: string;
  org_id: string;
  description: string;
  slug: string;
  learner_outcome: string;
  status: string;
  props: {
    pool_id: string;
    wallet_id: string;
    reject_org_reason: string;
    reject_root_reason: string;
    pub_date: number;
    pub_root_date: number;
    pub_root_reject_date: number;
    pub_reject_date: number;
  };
  enable: boolean;
  voting_start_date: number;
  voting_end_date: number;
  estimate_funding_days: number;
  funding_start_date: number;
  funding_end_date: number;
  user_id: string;
  courses: ICourse[];
  voting_milestones: IVotingmilestone[];
  owner: ICourseOwner;
  thumbnail: IFileResponse;
  preview_video: IFileResponse;
  categories: null;
  levels: null;
  funding_goal: IFundinggoal;
  bookmarked: boolean;
  owner_profile: null;
  outlines: null;
  total_amount: null;
  total_backers: null;
  total_refunded: null;
  user?: IUser;
  investment: null;
}

export type IAdminLaunchpadDetailRes = IAdminLaunchpadItem;
export interface IAdminLaunchpadsListRes extends HTTPPagination<IAdminLaunchpadItem> {}

export interface IVotingmilestone {
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
  status: 'pending' | 'running' | 'completed' | 'failed';
  props: {
    course_ids: string[] | null;
  };
  voting_process: IVotingProcessLaunchpad | null;
}

export interface IVotingProcessLaunchpad {
  approve_percentage: number;
  is_voted: boolean;
  reject_percentage: number;
  total_vote: number;
}

export interface IAdminLaunchpadInvestmentItem {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  user: IUser;
  clp_launchpad_id: string;
  clp_launchpad: null;
  amount: string;
  revenue_amount: string;
  refunded_amount: string;
  currency: string;
  status: string;
}

export interface IAdminLaunchpadInvestmentRes extends HTTPPagination<IAdminLaunchpadInvestmentItem> {}

export interface IAdminPublishLaunchpadPayload {
  status: string;
}
export interface IStartFundingTimeLaunchpadPayload {
  funding_start_date: number;
}

export interface IDecideVotingLaunchpadPayload {
  is_continued: boolean;
}

export type CreatorLaunchpadStatusType =
  | 'draft'
  | 'waiting'
  | 'reviewing'
  | 'failed'
  | 'rejected'
  | 'cancelled'
  | 'success'
  | 'approved'
  | 'publish'
  | 'voting'
  | 'funding'
  | 'refunded';
