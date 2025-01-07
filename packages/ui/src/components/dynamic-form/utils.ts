import { z } from '@oe/api/utils/zod';
import type { FormFieldOrGroup, FormFieldType } from './types';

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
