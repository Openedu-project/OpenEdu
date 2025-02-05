import type { ICourseOwner } from './course/basic';
import type { ICourse } from './course/course';
import type { IFileResponse } from './file';
import type { IUser } from './user';

interface IFundinggoal {
  target_funding: string;
  currency: string;
  min_pledge: string;
  profit_percentage: number;
}

export interface IAdminLaunchpadDetailRes {
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
  user?: IUser;
  investment: null;
}

interface IVotingmilestone {
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
  voting_process: null;
}
