import type {
  IAnswerParams,
  IFormAnswer,
  IFormOption,
  IFormQuestion,
  IFormSettings,
  IQuestionParam,
} from '@oe/api/types/form';
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

function createNameToIdMapping(questions: IFormQuestion[]): Record<string, string> {
  return questions.reduce(
    (result, question) => {
      const name = question?.settings?.props?.name as string;
      const id = question.id;
      result[name] = id;
      return result;
    },
    {} as Record<string, string>
  );
}

/**
 * Tạo mapping từ value của option đến option id cho mỗi câu hỏi
 * @param questions Danh sách câu hỏi từ API
 * @returns Object với key là question id và value là mapping từ option value đến option id
 */
function createValueToOptionIdMapping(questions: IFormQuestion[]): Record<string, Record<string, string>> {
  return questions.reduce(
    (result, question) => {
      if (
        question.options &&
        question.options.length > 0 &&
        question?.settings?.props?.options &&
        Array.isArray(question?.settings?.props?.options) &&
        question?.settings?.props?.options.length > 0
      ) {
        const questionId = question.id;
        result[questionId] = {};

        // Tạo map text -> option
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const optionMap: Record<string, any> = {};
        for (const option of question.options) {
          optionMap[option.text] = option;
        }

        // Map value -> option id
        const options = Array.isArray(question.settings?.props?.options) ? question.settings.props.options : [];
        for (const propOption of options) {
          const option = optionMap[propOption.label];
          if (option) {
            result[questionId][propOption.value] = option.id;
          }
        }
      }
      return result;
    },
    {} as Record<string, Record<string, string>>
  );
}

export function convertFormValueToAnswers(
  formValue: z.ZodObject<Record<string, z.ZodTypeAny>>,
  questions: IFormQuestion[]
): IFormAnswer[] {
  // Danh sách các loại câu hỏi sử dụng field options
  const optionsTypes = ['selectbox', 'multiple_choice', 'radio', 'checkbox'];

  // Danh sách các loại câu hỏi sử dụng field answer_text
  const answerTextTypes = ['email', 'text', 'phone', 'input', 'textarea', 'date', 'time', 'url'];

  // Tạo các mappings cần thiết
  const nameToIdMap = createNameToIdMapping(questions);
  const valueToOptionIdMap = createValueToOptionIdMapping(questions);

  // Map question_type từ question id
  const questionTypeMap = questions.reduce(
    (map, question) => {
      map[question.id] = question.question_type;
      return map;
    },
    {} as Record<string, string>
  );

  // Danh sách kết quả
  const answers: IAnswerParams[] = [];

  // Xử lý từng trường trong form value
  for (const [fieldName, fieldValue] of Object.entries(formValue)) {
    // Bỏ qua các trường không liên quan
    if (fieldName === 'heading' || fieldName === 'space' || fieldName === 'paragraph' || !nameToIdMap[fieldName]) {
      continue;
    }

    const questionId = nameToIdMap[fieldName];
    const questionType = questionTypeMap[questionId];

    // Bỏ qua các nút submit button hoặc undefined type
    if (!questionType || questionType === 'submitButton') {
      continue;
    }

    // Xử lý các loại câu hỏi sử dụng field options
    if (optionsTypes.includes(questionType as string)) {
      // Xử lý trường hợp multiple choice (giá trị là mảng)
      if (Array.isArray(fieldValue)) {
        const optionIds = fieldValue
          .map(value => valueToOptionIdMap[questionId]?.[value])
          .filter((id): id is string => id !== undefined);

        if (optionIds.length > 0) {
          answers.push({
            question_id: questionId,
            options: optionIds,
          });
        }
      }
      // Xử lý trường hợp giá trị đơn (selectbox, radio)
      else if (typeof fieldValue === 'string' && valueToOptionIdMap[questionId]?.[fieldValue]) {
        answers.push({
          question_id: questionId,
          options: [valueToOptionIdMap[questionId][fieldValue]],
        });
      }
    }
    // Xử lý các loại câu hỏi sử dụng field answer_text
    else if (answerTextTypes.includes(questionType as string) && typeof fieldValue === 'string') {
      answers.push({
        question_id: questionId,
        answer_text: fieldValue,
      });
    }
  }

  return answers;
}
