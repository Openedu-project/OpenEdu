import type { z } from '@oe/api/utils/zod';
import type { LanguageCode } from '@oe/i18n/languages';
import type { ComponentType, FC, SVGProps } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { ExtendedImageProps } from '#components/image';
import type { SelectboxOption } from '#components/selectbox';
import type { MultipleChoiceGridOption } from '../multiple-choice-grid/multiple-choice-grid';
// Form Editor Store types
// export interface FormField {
//   id: string;
//   type: FormComponent;
//   config: FormComponentConfig;
//   validation?: FormFieldValidation;
// }

export interface FormFieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validate?: (value: unknown) => boolean | string;
}

// Form Values type
// export interface FormValues {
//   [key: string]: unknown;
// }

// Form Config Return type
// export interface FormConfig {
//   defaultValues: FormValues;
//   zodSchema: z.ZodObject<Record<string, z.ZodType>>;
// }

export interface FormEditorStore {
  fields: FormFieldOrGroup[];
  selectedFieldId: string | null;
  defaultValues: Record<string, unknown>;
  zodSchema: z.AnyZodObject;
  addField: (config: FormFieldType, index?: number) => void;
  removeField: (id: string) => void;
  updateField: (id: string, config: Partial<FormFieldOrGroup>) => void;
  updateFields: (fields: FormFieldOrGroup[] | FormFieldOrGroup, index?: number) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  setSelectedField: (id: string | null) => void;
  reset: () => void;
}

// Form Components types
export type FormComponent =
  | 'input'
  | 'inputNumber'
  | 'inputPassword'
  | 'inputUrl' // TODO
  | 'inputCurrency'
  | 'textarea'
  | 'heading'
  | 'paragraph'
  | 'space'
  | 'label'
  | 'email'
  | 'checkbox'
  // | 'multiSelect'
  | 'multipleSelection' //new
  | 'tagsInput' //TODO
  | 'image'
  | 'selectbox'
  | 'datetimePicker'
  | 'smartDatetimeInput' //TODO
  | 'inputPhoneNumber'
  | 'datePicker' //TODO
  | 'locationInput' //TODO
  | 'slider' // TODO
  | 'signatureInput' //TODO
  | 'number' // ???
  | 'switch' // TODO
  | 'multipleChoiceGrid' //new
  | 'checkboxGrid' //new
  | 'multipleChoice' //radio
  | 'submitButton';

export interface FormComponentDefinition {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  component: ComponentType<any>;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export type FormComponents = Partial<Record<FormComponent, FormComponentDefinition>>;

// Form Config types
// export type BaseFormComponentConfig = {
//   name: string;
//   label?: string;
//   fieldType: FormComponent;
//   description?: string;
//   disabled?: boolean;
//   required?: boolean;
//   defaultValue?: string;
// };

// export type InputFormComponentConfig = BaseFormComponentConfig & {
//   placeholder?: string;
//   min?: number;
//   max?: number;
// };

// export type CheckboxFormComponentConfig = BaseFormComponentConfig & {
//   checked?: boolean;
// };

// export type EmailFormComponentConfig = InputFormComponentConfig & {
//   pattern?: RegExp;
// };

// export type SubmitButtonFormComponentConfig = BaseFormComponentConfig & {
//   text: string;
// };

// export type FormComponentConfig =
//   | InputFormComponentConfig
//   | EmailFormComponentConfig
//   | CheckboxFormComponentConfig
//   | SubmitButtonFormComponentConfig;

// Form Field Props types
export interface FormFieldProps {
  config: FormFieldOrGroup;
  index: number;
}

// Validation Rules type
export type ValidationRules = Record<string, FormFieldValidation>;

export type FormFieldType = Partial<Omit<ExtendedImageProps, 'placeholder' | 'blurDataURL' | 'defaultValue'>> & {
  fieldId: string;
  fieldType: FormComponent;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  infoText?: string;
  disabled?: boolean;
  value?: string | boolean | Date | number | string[] | Record<string, string>;
  setValue?: (value: string | boolean) => void;
  checked?: boolean;
  onChange?: (value: string | string[] | boolean | Date | number | number[] | Record<string, string>) => void;
  onSelect?: (value: string | string[] | boolean | Date | number | number[]) => void;
  rowIndex?: number;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  locale?: LanguageCode;
  hour12?: boolean;
  className?: string;
  border?: boolean;
  align?: 'start' | 'center' | 'end';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  height?: number;
  options?: SelectboxOption[];
  rows?: MultipleChoiceGridOption[]; // used to grid
  columns?: MultipleChoiceGridOption[]; // used to grid
  otherOption?: boolean;
};

// export type FieldType = { name: string; isNew: boolean; index?: number };

export type FormFieldOrGroup = FormFieldType | FormFieldType[];

export interface SortableItemProps {
  field: FormFieldType;
  form: UseFormReturn<FieldValues>;
  shouldSort?: boolean;
  onSelect: (name: string) => void;
  onRemove: (name: string) => void;
}

export interface SortableContainerProps {
  fields: FormFieldType[];
  form: UseFormReturn<FieldValues>;
  index: number;
  onSelect: (name: string) => void;
  onRemove: (name: string) => void;
}

// Component type enum for better type safety
export type ComponentTypeEnum = 'option' | 'text' | 'skip' | 'date' | 'checkbox' | 'grid';

export type FormEditorAction = 'create' | 'edit';
