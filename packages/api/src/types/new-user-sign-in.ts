export interface INewUSerSignIn {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  uid: string;
  title: string;
  description: string;
  slug: string;
  event: string;
  type: string;
  status: string;
  start_date: number;
  end_date: number;
  org_id: string;
  creator_id: string;
  questions: Question[];
  auth_required: boolean;
  is_template: boolean;
}

interface Question {
  id: string;
  uid: string;
  title: string;
  description: string;
  question_type: string;
  sub_questions: Question[];
  order: number;
  options: Option[];
  settings: Settings;
}

interface Settings {
  is_default: boolean;
  required: boolean;
  other_option_enabled: boolean;
  base_domain: string;
  key: string;
  validate_domain_enabled: boolean;
  props: null;
}

interface Option {
  id: string;
  uid: string;
  question_id: string;
  text: string;
  order: number;
}
