import type { ICourseOutline } from '@oe/api/types/course/course';
import type { IFormTriggerResponse } from '@oe/api/types/course/course-trigger';
import type { ButtonProps } from '#shadcn/button';

export interface IPaymentButton extends ButtonProps {
  courseData: ICourseOutline;
  isCourseDetail?: boolean;
}

export interface CourseActionProps {
  is_pay: boolean;
  is_paid: boolean;
  is_enrolled: boolean;
  form_relations?: IFormTriggerResponse[];
  entityId?: string;
}

export const ACTION_TYPES = {
  LOGIN_REQUIRED: 'loginRequired',
  PAY_NOT_PAID: 'payNotPaid',
  NOT_PAY_ENROLLED: 'notPayEnrolled',
  TRIGGER: 'turnOnTrigger',
  DEFAULT: 'default',
} as const;

export type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];
