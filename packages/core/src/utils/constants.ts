export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const USERNAME_REGEX = /^[\dA-Za-z]+$/;
export const FORMAT_DATE = 'DD/MM/YYYY';
export const FORMAT_DATE_TIME = 'DD/MM/YYYY hh:mm:ss';
export const FORMT_DATE_HOUR_MINTUE = 'MMM D, YYYY h:mm A'; //Aug 16, 2018 8:02 PM
export const FORMAT_HOUR_MIN_A = 'h:mm a';
export const FORMAT_DAY_HOUR_MIN_A = 'ddd h:mm a';
export const FORMAT_MON_DAY_TIME = 'MMM D, h:mm a';
export const PAGE_SIZE = 10;

export const ROLE_LIST = {
  SYSTEM_ADMIN: 'system_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  ORG_ADMIN: 'org_admin',
  ORG_MODERATOR: 'org_moderator',
  PARTNER: 'partner',
  LEARNER: 'learner',
  GUEST: 'guest',
  ORG_EDITOR: 'org_editor',
  ORG_WRITER: 'org_writer',
};

export const DEFAULT_ROLES_PERMISSION = [
  ROLE_LIST.SYSTEM_ADMIN,
  ROLE_LIST.ADMIN,
  ROLE_LIST.MODERATOR,
  ROLE_LIST.ORG_ADMIN,
  ROLE_LIST.ORG_MODERATOR,
  ROLE_LIST.PARTNER,
  ROLE_LIST.LEARNER,
  ROLE_LIST.GUEST,
  ROLE_LIST.ORG_EDITOR,
  ROLE_LIST.ORG_WRITER,
] as const;

export const USER_ROLE_EVENT: Record<string, string> = {
  org_editor: 'INVITE_ORG_EDITOR',
  org_writer: 'INVITE_ORG_WRITER',
  creator: 'INVITE_CREATOR',
};

export const GENERATING_STATUS = ['pending', 'generating', 'setting', 'tool_ended', 'reasoning'];
export const QUESTION_OBJECT_TYPE = {
  // checkbox: 'Checkbox',
  // multiple_choice: 'Multiple Choice',
  // file: 'File',
  // dropdown: 'Dropdown',
  multipleChoice: 'Multiple Choice',
  multipleChoiceGrid: 'Multiple Choice Grid',
  selectbox: 'Select Box',
  singleChoiceGrid: 'Single Choice Grid',
};

export const QUESTION_TYPE = {
  // ...QUESTION_OBJECT_TYPE,
  // checkbox_grid: 'Checkbox Grid',
  // multiple_choice_grid: 'Multiple Choice Grid',
  // long_text: 'Long Text',
  // phone: 'Phone',
  // number: 'Number',
  // sub_domain: 'Sub Domain',
  // email: 'Email',
  // text: 'Text',
  ...QUESTION_OBJECT_TYPE,
  heading: 'Heading',
  space: 'Space',
  input: 'Input',
  paragraph: 'Paragraph',
  inputNumber: 'Input Number',
  inpurPhoneNumber: 'Input Phone Number',
  email: 'Email',
  singleChoice: 'Single Choice',
  checkbox: 'Checkbox',
  datetimePicker: 'Datetime Picker',
  textarea: 'Textarea',

  //new
  submitButton: 'Submit Button',
  image: 'Image',
} as const;

export const FORM_TYPE = {
  page: 'Page',
  slide: 'Slide',
};

export const FORM_STATUS = {
  draft: 'Draft',
  published_org: 'Published in organization',
  published_all: 'Published all',
  unpublished: 'Unpublished',
};

export const FORM_EVENT = {
  // register_org: 'Register organization',
  // register_creator: 'Register instructor',
  // survey_course: 'Survey course',
  register_course: 'Register course', // Add 3 fields user-info
  others: 'Others',
  contact_organization: 'Contact Organization',
};

export const EMAIL_REGEX =
  /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
export const TONE = ['normal', 'professional', 'humorous'];

export const CREATE_LAUNCHPAD_FORM_ID: Record<string, string> = {
  generalInfo: 'general-information',
  fundingGoal: 'funding-goal',
  votingPlan: 'voting-plan',
  ownerAndCollaborators: 'owner-and-collaborators',
  paymentMethod: 'payment-method',
} as const;

export const CREATE_LAUNCHPAD_MODAL_ID: Record<string, string> = {
  previewVideo: 'preview_video',
  publishLaunchpadSuccess: 'publish_launchpad_success',
  publishLaunchpad: 'publish_launchpad',
  createLaunchpad: 'create_launchpad',
  noCourse: 'no_course',
  notCreator: 'not_creator',
} as const;
