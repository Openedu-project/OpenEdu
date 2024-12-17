import { acceptCreatorInviteMessage } from './accept-creator-invitation';
import { acceptUserInviteMessage } from './accept-user-invitation';
import { builderMessages } from './builder';
import { couponMessage } from './coupon';
import { creatorManagementMessage } from './creator-management';
import { forgotPasswordMessage } from './forgot-password';
import { permissionMessage } from './permissions';
import { setPasswordMessage } from './set-password';
import { verifyEmailMessage } from './verify-email';

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
};
