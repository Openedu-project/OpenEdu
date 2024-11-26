export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const USERNAME_REGEX = /^[\dA-Za-z]+$/;
export const FORMAT_DATE = 'DD/MM/YYYY';
export const FORMAT_DATE_TIME = 'DD/MM/YYYY hh:mm:ss';
export const FORMT_DATE_HOUR_MINTUE = 'MMM D, YYYY h:mm A'; //Aug 16, 2018 8:02 PM
export const FORMAT_HOUR_MIN_A = 'h:mm a';
export const FORMAT_DAY_HOUR_MIN_A = 'ddd h:mm a';
export const FORMAT_MON_DAY_TIME = 'MMM D, h:mm a';
export const PAGE_SIZE = 10;

export const USER_ROLE_EVENT: Record<string, string> = {
  org_editor: 'INVITE_ORG_EDITOR',
  org_writer: 'INVITE_ORG_WRITER',
  creator: 'INVITE_CREATOR',
};

export const GENERATING_STATUS = ['pending', 'generating'];
