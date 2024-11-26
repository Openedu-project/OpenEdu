import { acceptCreatorInviteMessage } from './accept-creator-invitation';
import { acceptUserInviteMessage } from './accept-user-invitation';
import { builderMessages } from './builder';
import { forgotPasswordMessage } from './forgot-password';
import { setPasswordMessage } from './set-password';
import { verifyEmailMessage } from './verify-email';

export const pageMessages = {
  ...builderMessages,
  ...verifyEmailMessage,
  ...forgotPasswordMessage,
  ...acceptCreatorInviteMessage,
  ...acceptUserInviteMessage,
  ...setPasswordMessage,
};
