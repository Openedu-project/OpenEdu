export const componentWithoutLabel = ['submitButton', 'heading', 'paragraph', 'space', 'image'];

/**
 * Categorize components by data type
 */
export const COMPONENT_TYPES = {
  // Components using options[]
  OPTION_BASED: new Set(['multipleSelection', 'selectbox', 'tagsInput', 'switch', 'multipleChoice']),

  // Components using options[],sub_questions[]
  GRID_BASED: new Set(['multipleChoiceGrid', 'checkboxGrid']),

  // Components using answer_text
  TEXT_BASED: new Set([
    'input',
    'inputNumber',
    'inputPassword',
    'inputUrl',
    'inputCurrency',
    'textarea',
    'email',
    'smartDatetimeInput',
    'inputPhoneNumber',
    'datePicker',
    'locationInput',
    'slider',
    'signatureInput',
    'number',
  ]),

  // Components to skip
  SKIP: new Set(['submitButton', 'heading', 'paragraph', 'space', 'label', 'image']),

  // Additional mappings to reduce conditional checks
  CHECKBOX: new Set(['checkbox']),
  DATE: new Set(['date', 'time', 'dateTime']),
};

/**
 * Keywords to classify fields based on their names
 */
export const KEYWORDS = {
  OPTION: ['select', 'radio', 'choice', 'switch', 'tag'],
  SKIP: ['submit', 'button', 'space', 'paragraph', 'heading', 'divider', 'label', 'image'],
  DATE: ['date', 'time', 'dateTime'],
};
