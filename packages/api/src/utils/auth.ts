import { type CookieOptions, getCookie } from '@oe/core';

export const authEvents = {
  resetPassword: 'RESET_PASSWORD',
  setPassword: 'SET_PASSWORD',
  register: 'REGISTER',
  externalRegister: 'EXTERNAL_REGISTER',
  inviteCreator: 'INVITE_CREATOR',
  inviteUser: 'INVITE_USER',
  inviteReferrer: 'INVITE_REFERRER',
  sendOtp: 'SEND_OTP',
  approveRegisterOrgNewUser: 'APPROVE_REGISTER_ORG_NEW_USER',
  approveRegisterOrgExistingUser: 'APPROVE_REGISTER_ORG_EXISTING_USER',
  deactivateOrg: 'DEACTIVATE_ORG',
  approveCreator: 'APPROVE_CREATOR',
  approveRegisterWriterNewUser: 'APPROVE_REGISTER_WRITER_NEW_USER',
  approveRegisterWriterExistingUser: 'APPROVE_REGISTER_WRITER_EXISTING_USER',

  approveRegisterCreatorNewUser: 'APPROVE_REGISTER_CREATOR_NEW_USER',
  approveRegisterCreatorExistingUser: 'APPROVE_REGISTER_CREATOR_EXISTING_USER',
  inviteCreatorBeforeAccept: 'INVITE_CREATOR_BEFORE_ACCEPT',
  acceptInviteCreatorNewUser: 'ACCEPT_INVITE_CREATOR_NEW_USER',
  acceptInviteCreatorExistingUser: 'ACCEPT_INVITE_CREATOR_EXISTING_USER',
  // Editor writer
  inviteOrgEditor: 'INVITE_ORG_EDITOR',
  inviteOrgWriter: 'INVITE_ORG_WRITER',
  // enroll success
  enrollCourseSuccessEn: 'ENROLL_COURSE_SUCCESS_EN',
  enrollCourseSuccessVi: 'ENROLL_COURSE_SUCCESS_VI',

  //USER
  inviteUserBeforeAccept: 'INVITE_USER_BEFORE_ACCEPT',
  acceptInviteUserNewUser: 'ACCEPT_INVITE_USER_NEW_USER',
  acceptInviteUserExistingUser: 'ACCEPT_INVITE_USER_EXISTING_USER',
  // Editor writer
  acceptInviteEditorNewUser: 'ACCEPT_INVITE_EDITOR_NEW_USER',
  acceptInviteEditorExistingUser: 'ACCEPT_INVITE_EDITOR_EXISTING_USER',

  acceptInviteWriterNewUser: 'ACCEPT_INVITE_WRITER_NEW_USER',
  acceptInviteWriterExistingUser: 'ACCEPT_INVITE_WRITER_EXISTING_USER',
} as const;

export type AuthEvent = keyof typeof authEvents;
export type AuthEventName = (typeof authEvents)[AuthEvent];
export const isLogin = async (options?: CookieOptions) => {
  const accessToken = await getCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, options);

  return !!accessToken;
};
