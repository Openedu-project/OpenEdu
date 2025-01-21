import type {
  CourseTriggerType,
  FormTriggerEntityType,
  TFormTriggerConfirmationSettings,
} from '#schemas/courseTrigger';
import type { IFormResponse } from '#types/form';

export interface IFormTrigger {
  id: string;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  form_id: string;
  form: IFormResponse;
  related_entity_id: string;
  related_entity_uid?: string;
  related_entity_type: string;
  start_when: IStartWhen;
  end_when?: IEndWhen;
  submitted?: boolean;
  confirmation_settings?: TFormTriggerConfirmationSettings;
  enabled?: boolean;
  type: CourseTriggerType;
}

export interface IStartWhen {
  type: FormTriggerCondition; //clicked_on
  entity_id: string;
  entity_type?: FormTriggerEntityType;
}

export interface IEndWhen {
  type: FormTriggerCondition; //clicked_on
  time: number;
}

export type FormTriggerCondition =
  // | 'enrolled_course'
  // | 'specific_time'
  // | 'completed_course'
  // | 'n_days_after_course_enrollment'
  'started_lesson' | 'completed_lesson' | 'completed_section' | 'clicked_on';
// | 'n_days_after_setting_trigger'
// | 'reach_num_submissions'
// | 'completed_quiz';

export interface IFormTriggerResponse extends IFormTrigger {}

export interface IFormTriggerRequest extends Omit<IFormTrigger, 'id' | 'form' | 'related_entity_uid' | 'form_id'> {
  form_id?: string;
}
