import { acceptCreatorInviteMessage } from './accept-creator-invitation';
import { acceptUserInviteMessage } from './accept-user-invitation';
import { bankAccountMessage } from './bank-account';
import { builderMessages } from './builder';
import { couponMessage } from './coupon';
import { creatorManagementMessage } from './creator-management';
import { forgotPasswordMessage } from './forgot-password';
import { notificationMessage } from './notification';
import { organizationsMessage } from './organizations';
import { permissionMessage } from './permissions';
import { setPasswordMessage } from './set-password';
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
};
