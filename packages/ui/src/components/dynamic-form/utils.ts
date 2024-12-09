import { z } from '@oe/api/utils/zod';
import type { FormField, FormFieldOrGroup, FormFieldType } from './types';

export function generateFieldSchema(field: FormField) {
  let fieldSchema: z.ZodType<unknown>;

  switch (field.type) {
    case 'input':
      fieldSchema = z.string();
      if (field.validation) {
        if (field.validation.min) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.validation.min,
            `Giá trị tối thiểu là ${field.validation.min}`
          );
        }
        if (field.validation.max) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.validation.max,
            `Giá trị tối đa là ${field.validation.max}`
          );
        }
      }
      break;
    case 'email':
      fieldSchema = z.string().email('Email không hợp lệ');
      break;
    case 'checkbox':
      fieldSchema = z.boolean();
      break;
    default:
      fieldSchema = z.any();
  }

  if (field.validation?.required) {
    fieldSchema = fieldSchema.refine(
      value => value !== undefined && value !== null && value !== '',
      'Trường này là bắt buộc'
    );
  }

  return fieldSchema;
}

export const generateZodSchema = (formFields: FormFieldOrGroup[]): z.ZodObject<Record<string, z.ZodTypeAny>> => {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  const processField = (field: FormFieldType): void => {
    if (field.fieldType === 'label' || field.fieldType === 'submitButton') {
      return;
    }

    let fieldSchema: z.ZodTypeAny;

    switch (field.fieldType) {
      case 'checkbox':
        fieldSchema = z.boolean().default(true);
        break;
      case 'datePicker':
        fieldSchema = z.coerce.date();
        break;
      case 'datetimePicker':
        fieldSchema = z.coerce.date();
        break;
      case 'email':
        fieldSchema = z.string().email();
        break;
      case 'inputNumber':
        fieldSchema = z.coerce.number();
        break;
      case 'input':
        fieldSchema = z.string();
        break;

      case 'locationInput':
        fieldSchema = z.tuple([
          z.string({
            required_error: 'Country is required',
          }),
          z
            .string()
            .optional(), // State name, optional
        ]);
        break;
      case 'slider':
        fieldSchema = z.coerce.number();
        break;
      case 'signatureInput':
        fieldSchema = z.string({
          required_error: 'Signature is required',
        });
        break;
      case 'smartDatetimeInput':
        fieldSchema = z.date();
        break;
      case 'number':
        fieldSchema = z.coerce.number();
        break;
      case 'switch':
        fieldSchema = z.boolean();
        break;
      case 'tagsInput':
        fieldSchema = z.array(z.string()).nonempty('Please enter at least one item');
        break;
      case 'multiSelect':
        fieldSchema = z.array(z.string()).nonempty('Please select at least one item');
        break;
      default:
        fieldSchema = z.string();
    }

    if (field.min !== undefined && 'min' in fieldSchema) {
      fieldSchema = (fieldSchema as z.ZodNumber).min(field.min, `Must be at least ${field.min}`);
    }
    if (field.max !== undefined && 'max' in fieldSchema) {
      fieldSchema = (fieldSchema as z.ZodNumber).max(field.max, `Must be at most ${field.max}`);
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
