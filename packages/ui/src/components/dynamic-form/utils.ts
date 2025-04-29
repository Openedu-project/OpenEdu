import type {
  IAnswerParams,
  IFormAnswer,
  IFormOption,
  IFormQuestion,
  IFormSettings,
  IFormSubquestion,
  IQuestionParam,
} from '@oe/api';
import { z } from '@oe/api';
import { convertToTimeStamp } from '@oe/core';
import { COMPONENT_TYPES, KEYWORDS } from './constants';
import type { ComponentTypeEnum, FormComponent, FormFieldOrGroup, FormFieldType } from './types';

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
      case 'multipleSelection':
        fieldSchema = z.array(z.string()).nonempty('formValidation.arrayError');
        break;
      case 'multipleChoiceGrid':
        fieldSchema = z.record(z.string()).optional();
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
      case 'multipleSelection':
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
    multipleSelection: 'multipleSelection',
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
    multipleChoiceGrid: 'multipleChoiceGrid',
    multipleChoice: 'multipleChoice', //radio
    submitButton: 'submitButton',
  };

  return typeMap[fieldType] || fieldType;
}

function convertFieldToQuestion(field: FormFieldType): IQuestionParam {
  // Chuyển đổi fieldType sang question_type (trong trường hợp này giữ nguyên)
  const questionType = convertFieldTypeToQuestionType(field.fieldType);
  const { fieldType } = field;

  // Tạo đối tượng cài đặt
  const settings: IFormSettings = {
    required: field.required ?? false,
    other_option_enabled: field?.otherOption ?? false,
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

  const columns: IFormOption[] | null = field?.columns
    ? field.columns.map((col, idx) => ({
        id: `${field.fieldId}-column-${idx}`,
        text: typeof col === 'string' ? col : col.text,
        order: idx,
      }))
    : null;

  const rows: IFormSubquestion[] | null = field?.rows
    ? field.rows.map((row, idx) => ({
        id: `${field.fieldId}-row-${idx}`,
        title: typeof row === 'string' ? row : row.text,
        order: idx,
        question_type: 'multipleChoice',
        require: true,
      }))
    : null;

  return {
    title: field.label,
    description: field.description || '',
    question_type: questionType,
    settings,
    options: fieldType === 'multipleChoiceGrid' ? columns : (options as IFormOption[]),
    sub_questions: rows,
  };
}

/**
 * Process questions to create mappings for field name to ID and collect other necessary information
 * to avoid repeated iterations through questions
 */
function processQuestions(questions: IFormQuestion[]): {
  nameToIdMap: Record<string, string>;
  valueToOptionIdMap: Record<string, Record<string, string>>;
  fieldTypeMap: Record<string, string>;
} {
  const nameToIdMap: Record<string, string> = {};
  const valueToOptionIdMap: Record<string, Record<string, string>> = {};
  const fieldTypeMap: Record<string, string> = {};

  for (const question of questions) {
    const questionId = question.id;
    const name = question?.settings?.props?.name as string;

    // Map name to id if name exists
    if (name) {
      nameToIdMap[name] = questionId;
    }

    // Map field type
    fieldTypeMap[questionId] = (question?.settings?.props?.fieldType as string) || '';

    // Create value to option id mapping when both options arrays exist
    const hasOptions = Array.isArray(question.options) && question.options.length > 0;
    const hasPropOptions =
      Array.isArray(question?.settings?.props?.options) && question?.settings?.props?.options.length > 0;

    if (hasOptions && hasPropOptions) {
      valueToOptionIdMap[questionId] = {};

      // Create a map of text to option for faster lookup
      // biome-ignore lint/suspicious/noExplicitAny: Option structure needs generic typing
      const optionMap: Record<string, any> = {};

      for (const option of question.options || []) {
        optionMap[option.text] = option;
      }

      // Map prop option value to option id
      for (const propOption of (question.settings?.props?.options || []) as { label: string; value: string }[]) {
        const option = optionMap[propOption.label];
        if (option) {
          valueToOptionIdMap[questionId][propOption.value] = option.id;
        }
      }
    }
  }

  return { nameToIdMap, valueToOptionIdMap, fieldTypeMap };
}

/**
 * Determine component type based on fieldType and fieldName
 * Uses a single check instead of multiple iterations
 */
function getComponentType(fieldType: string | undefined, fieldName: string): ComponentTypeEnum {
  // Check by fieldType if available
  if (fieldType) {
    if (COMPONENT_TYPES.OPTION_BASED.has(fieldType)) {
      return 'option';
    }
    if (COMPONENT_TYPES.TEXT_BASED.has(fieldType)) {
      return 'text';
    }
    if (COMPONENT_TYPES.SKIP.has(fieldType)) {
      return 'skip';
    }
    if (COMPONENT_TYPES.CHECKBOX.has(fieldType)) {
      return 'checkbox';
    }
    if (COMPONENT_TYPES.DATE.has(fieldType)) {
      return 'date';
    }
    if (COMPONENT_TYPES.GRID_BASED.has(fieldType)) {
      return 'grid';
    }
  }

  // Create lowercase once for comparison
  const lowerFieldName = fieldName.toLowerCase();

  // Check all keywords in a single pass
  for (const keyword of KEYWORDS.SKIP) {
    if (lowerFieldName.includes(keyword)) {
      return 'skip';
    }
  }

  for (const keyword of KEYWORDS.OPTION) {
    if (lowerFieldName.includes(keyword)) {
      return 'option';
    }
  }

  for (const keyword of KEYWORDS.DATE) {
    if (lowerFieldName.includes(keyword)) {
      return 'date';
    }
  }

  // Default to text type
  return 'text';
}

/**
 * Process option-based components and add to answers array
 */
function processOptionComponent(
  questionId: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fieldValue: any,
  optionMapping: Record<string, string>,
  answers: IAnswerParams[]
): void {
  if (!optionMapping) {
    return;
  }

  // console.log(fieldValue);
  // console.log(optionMapping);
  // console.log(answers);
  if (Array.isArray(fieldValue)) {
    // const optionIds = fieldValue.map(value => optionMapping[value]).filter(Boolean);
    const optionIds = fieldValue.map(value => optionMapping[value] || value || undefined).filter(Boolean);

    const validOptionIds = optionIds.filter((id): id is string => id !== undefined);
    if (validOptionIds.length > 0) {
      answers.push({
        question_id: questionId,
        options: validOptionIds,
      });
    }
  } else if (typeof fieldValue === 'string') {
    const optionId = optionMapping[fieldValue];
    if (optionId) {
      answers.push({
        question_id: questionId,
        options: [optionId],
      });
    } else {
      // For radio
      answers.push({
        question_id: questionId,
        options: [fieldValue],
      });
    }
  }
}

// Converts a MultipleChoiceGrid's Record<string, string>,CheckboxGrid's Record<string, string[]> value to the submission format

export function convertGridForSubmission(gridValue: Record<string, string[]>, questionId: string): IAnswerParams[] {
  // If gridValue is null or undefined, return an empty array
  if (!gridValue) {
    return [];
  }

  // Convert each row selection to the expected format
  return Object.entries(gridValue).map(([rowId, columnId]) => ({
    question_id: questionId,
    sub_question_id: rowId,
    options: Array.isArray(columnId) ? columnId : [columnId], // Put the column ID in an array since API expects array
  }));
}

/**
 * Convert form values to answer format for API submission
 */
export function convertFormValueToAnswers(
  // biome-ignore lint/suspicious/noExplicitAny: Form values can be of various types
  formValue: Record<string, any>,
  questions: IFormQuestion[]
): IFormAnswer[] {
  // Process questions once to create necessary mappings
  const { nameToIdMap, valueToOptionIdMap, fieldTypeMap } = processQuestions(questions);
  const answers: IAnswerParams[] = [];

  // Process each field in form value
  for (const [fieldName, fieldValue] of Object.entries(formValue)) {
    // Skip fields not in mapping or with null values
    if (
      !nameToIdMap[fieldName] ||
      fieldValue === null ||
      (fieldValue === undefined && !fieldName?.includes('checkbox'))
    ) {
      continue;
    }

    const questionId = nameToIdMap[fieldName];
    const fieldType = fieldTypeMap[questionId];
    const componentType = getComponentType(fieldType, fieldName);

    // Skip components that don't need processing
    if (componentType === 'skip') {
      continue;
    }

    // console.log(questions);
    // console.log(fieldValue);
    // console.log(valueToOptionIdMap[questionId], 'valueToOptionIdMap[questionId] ');
    // Process different component types
    switch (componentType) {
      case 'option':
        processOptionComponent(questionId, fieldValue, valueToOptionIdMap[questionId] ?? {}, answers);
        break;

      case 'date':
        answers.push({
          question_id: questionId,
          answer_text: String(convertToTimeStamp(fieldValue)),
        });
        break;

      case 'checkbox':
        answers.push({
          question_id: questionId,
          answer_text: String(fieldValue === true),
        });
        break;

      case 'grid':
        answers.push(...convertGridForSubmission(fieldValue, questionId));
        break;

      default:
        answers.push({
          question_id: questionId,
          answer_text: String(fieldValue),
        });
        break;
    }
  }

  return answers;
}
