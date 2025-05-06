import { acceptCreatorInviteMessage } from './accept-creator-invitation';
import { acceptUserInviteMessage } from './accept-user-invitation';
import { adminLaunchpadMessages } from './admin-launchpad';
import { affiliateCampaignMessage } from './affiliate-campaign';
import { bankAccountMessage } from './bank-account';
import { builderMessages } from './builder';
import { couponMessage } from './coupon';
import { courseManagementMessages } from './course-management';
import { courseOutlineMessages } from './course-outline';
import { coursePaymentMessages } from './course-payment';
import { courseListMessages } from './courses-list';
import { creatorLaunchpadMessages } from './creator-launchpad';
import { creatorManagementMessage } from './creator-management';
import { termsAndConditions } from './faq-management';
import { forgotPasswordMessage } from './forgot-password';
import { homePageMessage } from './home-page';
import { launchpadDetailPageMessages } from './launchpad-detailpage';
import { launchpadHomepageMessage } from './launchpad-homepage';
import { courseLearningMessages } from './learning';
import { myLearningSpaceMessage } from './my-learning-space';
import { notificationMessage } from './notification';
import { organizationsMessage } from './organizations';
import { permissionMessage } from './permissions';
import { referralProgramMessages } from './referral-program';
import { scheduleMessage } from './schedule';
import { setPasswordMessage } from './set-password';
import { userAffiliateCampaignMessage } from './user-affiliate-campaign';
import { userProfileMessages } from './user-profile';
import { verifyEmailMessage } from './verify-email';
import { withdrawRequestMessage } from './withdraw-request';

export const pageMessages = {
  ...builderMessages,
  ...verifyEmailMessage,
  ...forgotPasswordMessage,
  ...acceptCreatorInviteMessage,
  ...acceptUserInviteMessage,
  ...setPasswordMessage,
  ...permissionMessage,
  ...couponMessage,
  ...creatorManagementMessage,
  ...organizationsMessage,
  ...withdrawRequestMessage,
  ...bankAccountMessage,
  ...notificationMessage,
  ...courseOutlineMessages,
  ...affiliateCampaignMessage,
  ...homePageMessage,
  ...userAffiliateCampaignMessage,
  ...courseListMessages,
  ...coursePaymentMessages,
  ...userProfileMessages,
  ...courseLearningMessages,
  ...adminLaunchpadMessages,
  ...creatorLaunchpadMessages,
  ...myLearningSpaceMessage,
  ...launchpadDetailPageMessages,
  ...launchpadHomepageMessage,
  ...courseManagementMessages,
  ...referralProgramMessages,
  ...scheduleMessage,
  ...termsAndConditions
};
