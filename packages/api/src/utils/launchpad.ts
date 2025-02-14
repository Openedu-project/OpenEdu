import type { LaunchpadStatus } from '#types/launchpad';

export const CREATE_LAUNCHPAD_TABS = {
  generalInfo: 'general-information',
  fundingGoal: 'funding-goal',
  votingPlan: 'voting-plan',
  ownerAndCollaborators: 'owner-and-collaborators',
  paymentMethod: 'payment-method',
} as const;

export const CREATE_LAUNCHPAD_TABS_ORDER = [
  {
    order: 1,
    value: CREATE_LAUNCHPAD_TABS.generalInfo,
  },
  {
    order: 2,
    value: CREATE_LAUNCHPAD_TABS.fundingGoal,
  },
  {
    order: 3,
    value: CREATE_LAUNCHPAD_TABS.votingPlan,
  },
  {
    order: 4,
    value: CREATE_LAUNCHPAD_TABS.ownerAndCollaborators,
  },
  {
    order: 5,
    value: CREATE_LAUNCHPAD_TABS.paymentMethod,
  },
];

export const LAUNCHPAD_STATUS: { [key: string]: LaunchpadStatus } = {
  DRAFT: 'draft',
  REVIEWING: 'reviewing',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  PUBLISH: 'publish',
  CANCELLED: 'cancelled',
  SUCCESS: 'success',
  FAILED: 'failed',
  VOTING: 'voting',
  FUNDING: 'funding',
  WAITING: 'waiting',
};

export const ROLES_USER_MAPPING = {
  partner: 'creator',
  org_writer: 'writer',
  org_editor: 'editor',
  org_moderator: 'admin',
  org_admin: 'admin',
};
