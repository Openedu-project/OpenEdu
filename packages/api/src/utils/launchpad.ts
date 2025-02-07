import type { LaunchpadStatus } from '#types/launchpad';

export const TABS = {
  generalInfo: 'general-information',
  fundingGoal: 'funding-goal',
  votingPlan: 'voting-plan',
  ownerAndCollaborators: 'owner-and-collaborators',
  paymentMethod: 'payment-method',
} as const;

export const TABS_ORDER = [
  {
    order: 1,
    value: TABS.generalInfo,
  },
  {
    order: 2,
    value: TABS.fundingGoal,
  },
  {
    order: 3,
    value: TABS.votingPlan,
  },
  {
    order: 4,
    value: TABS.ownerAndCollaborators,
  },
  {
    order: 5,
    value: TABS.paymentMethod,
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
