import { EmailInput } from '.';

export const emailConfig = {
  name: 'email',
  label: 'Email',
  placeholder: 'Enter email',
  fieldType: 'email',
  component: EmailInput,
  required: false,
  description: 'This is a description',
  disabled: false,
  min: 0,
  max: 100,
};
