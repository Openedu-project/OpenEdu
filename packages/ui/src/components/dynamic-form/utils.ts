import type { IFormOption, IFormSettings, IQuestionParam } from '@oe/api/types/form';
import { z } from '@oe/api/utils/zod';
import type { FormComponent, FormFieldOrGroup, FormFieldType } from './types';

export const generateZodSchema = (formFields: FormFieldOrGroup[]): z.ZodObject<Record<string, z.ZodTypeAny>> => {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  const processField = (field: FormFieldType): void => {
    if (field.fieldType === 'label' || field.fieldType === 'submitButton') {
      return;
    }

    let fieldSchema: z.ZodTypeAny;

    switch (field.fieldType) {
      case 'input':
      case 'textarea':
      case 'inputUrl':
      case 'inputCurrency':
      case 'inputPassword':
      case 'inputPhoneNumber':
        fieldSchema = z.string({ required_error: 'formValidation.required' });
        break;
      case 'checkbox':
        fieldSchema = z.boolean().default(true);
        break;
      case 'datetimePicker':
        fieldSchema = z.coerce.date({
          errorMap: (issue, { defaultError }) => ({
            message: issue.code === 'invalid_date' ? 'formValidation.invalid_date' : defaultError,
          }),
        });
        break;
      case 'email':
        fieldSchema = z.string({ required_error: 'formValidation.required' }).email({
          message: 'formValidation.invalid_string.email',
        });
        break;
      case 'inputNumber':
        fieldSchema = z.coerce
          .number()
          .gte(field.min ?? 0, {
            message: `formValidation.too_small.number.inclusive--type:${field.name}--minimum:${field.min}`,
          })
          .lte(field.max ?? 100, {
            message: `formValidation.too_big.number.inclusive--type:${field.name}--maximum:${field.max}`,
          });
        break;
      case 'tagsInput':
        fieldSchema = z.array(z.string()).nonempty('formValidation.arrayError');
        break;
      default:
        fieldSchema = z.string({ required_error: 'formValidation.required' });
        break;
    }

    if (field.min !== undefined && 'min' in fieldSchema) {
      fieldSchema = (fieldSchema as z.ZodNumber).min(field.min, {
        message: `formValidation.too_small.string.inclusive--type:${field.name}--minimum:${field.min}`,
      });
    }
    if (field.max !== undefined && 'max' in fieldSchema) {
      fieldSchema = (fieldSchema as z.ZodNumber).max(field.max, {
        message: `formValidation.too_big.string.inclusive--type:${field.name}--maximum:${field.max}`,
      });
    }

    if (field.required !== true) {
      fieldSchema = fieldSchema.optional();
    }
    schemaObject[field.name] = fieldSchema as z.ZodTypeAny;
  };

  formFields.flat().forEach(processField);

  return z.object(schemaObject);
};

export const generateDefaultValues = (
  fields: FormFieldOrGroup[],
  existingDefaultValues: Record<string, unknown> = {}
): Record<string, unknown> => {
  const defaultValues: Record<string, unknown> = { ...existingDefaultValues };

  for (const field of fields.flat()) {
    if (field.fieldType === 'submitButton') {
      return defaultValues;
    }
    if (defaultValues[field.name]) {
      continue;
    }

    switch (field.fieldType) {
      case 'multiSelect':
        defaultValues[field.name] = ['React'];
        break;
      case 'tagsInput':
        defaultValues[field.name] = [];
        break;
      case 'datetimePicker':
      case 'smartDatetimeInput':
      case 'datePicker':
        defaultValues[field.name] = new Date();
        break;
      default:
        defaultValues[field.name] = field.value ?? '';
        break;
    }
  }

  return defaultValues;
};

export function convertFieldsToQuestions(fields: FormFieldOrGroup[]): IQuestionParam[] {
  const questions: IQuestionParam[] = [];

  for (const field of fields) {
    if (Array.isArray(field)) {
      // Xử lý nhóm trường
      for (const subField of field) {
        // if (!componentWithoutLabel.includes(subField.fieldType)) {
        // }
        questions.push(convertFieldToQuestion(subField));
      }
    } else {
      questions.push(convertFieldToQuestion(field));
    }
  }

  return questions;
}

export function convertFieldTypeToQuestionType(fieldType: FormComponent): string {
  // Trong hầu hết các trường hợp, question_type giống hệt fieldType
  // Chỉ ánh xạ một số trường hợp đặc biệt nếu cần
  const typeMap: Partial<Record<FormComponent, string>> = {
    input: 'input',
    inputNumber: 'inputNumber',
    inputPassword: 'inputPassword',
    inputUrl: 'inputUrl',
    inputCurrency: 'inputCurrency',
    textarea: 'textarea',
    heading: 'heading',
    paragraph: 'paragraph',
    space: 'space',
    label: 'label',
    email: 'email',
    checkbox: 'checkbox',
    multiSelect: 'multiSelect',
    tagsInput: 'tagsInput',
    image: 'image',
    selectbox: 'selectbox',
    datetimePicker: 'datetimePicker',
    smartDatetimeInput: 'smartDatetimeInput',
    inputPhoneNumber: 'inputPhoneNumber',
    datePicker: 'datePicker',
    locationInput: 'locationInput',
    slider: 'slider',
    signatureInput: 'signatureInput',
    number: 'number',
    switch: 'switch',
    submitButton: 'submitButton',
  };

  return typeMap[fieldType] || fieldType;
}

function convertFieldToQuestion(field: FormFieldType): IQuestionParam {
  // Chuyển đổi fieldType sang question_type (trong trường hợp này giữ nguyên)
  const questionType = convertFieldTypeToQuestionType(field.fieldType);

  // Tạo đối tượng cài đặt
  const settings: IFormSettings = {
    required: field.required ?? false,
    other_option_enabled: false,
    base_domain: '',
    props: field,
  };

  // Xử lý options cho selectbox, multiSelect, v.v.
  const options = field.options
    ? field.options.map((option, idx) => ({
        id: `${field.fieldId}-option-${idx}`,
        text: typeof option === 'string' ? option : option.label,
        order: idx,
      }))
    : null;

  return {
    title: field.label,
    description: field.description || '',
    question_type: questionType,
    settings,
    options: options as IFormOption[],
    sub_questions: null,
  };
}
