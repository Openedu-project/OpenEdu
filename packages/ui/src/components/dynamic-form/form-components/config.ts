import type { FormComponent, FormFieldType } from '../types';
import { checkboxDefaultConfig } from './checkbox/config';
import { emailDefaultConfig } from './email/config';
import { headingConfig } from './heading/config';
import { formImageDefaultConfig } from './image/config';
import { inputNumberDefaultConfig } from './input-number/config';
import { inputDefaultConfig } from './input/config';
import { paragraphConfig } from './paragraph/config';
import { spaceConfig } from './space/config';
import { submitButtonDefaultConfig } from './submit-button/config';
import { textareaDefaultConfig } from './textarea/config';

export const config: Partial<Record<FormComponent, FormFieldType>> = {
  heading: headingConfig,
  paragraph: paragraphConfig,
  space: spaceConfig,
  input: inputDefaultConfig,
  textarea: textareaDefaultConfig,
  inputNumber: inputNumberDefaultConfig,
  email: emailDefaultConfig,
  checkbox: checkboxDefaultConfig,
  image: formImageDefaultConfig,
  submitButton: submitButtonDefaultConfig,
};
