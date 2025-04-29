'use client';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { InputValue } from '#components/input-select';
import type { MultipleChoiceGridOption } from '#components/multiple-choice-grid';
import type { SelectboxOption } from '#components/selectbox';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { AutoCompleteFieldConfig } from '../form-components/auto-complete/auto-complete-config';
import { CheckboxFieldConfig } from '../form-components/checkbox/checkbox-field-config';
import { DateTimePickerFieldConfig } from '../form-components/date-time-picker/date-time-picker-field-config';
import { EmailFieldConfig } from '../form-components/email/email-field-config';
import { HeadingFieldConfig } from '../form-components/heading/heading-field-config';
import { ImageFieldConfig } from '../form-components/image/image-field-config';
import { InputCurrencyFieldConfig } from '../form-components/input-currency/input-currency-field-config';
import { InputNumberFieldConfig } from '../form-components/input-number/input-number-field-config';
import { InputPasswordFieldConfig } from '../form-components/input-password/input-password-field-config';
import { InputPhoneNumberFieldConfig } from '../form-components/input-phonenumber/input-phonenumber-field-config';
import { InputUrlFieldConfig } from '../form-components/input-url/input-url-field-config';
import { InputFieldConfig } from '../form-components/input/input-field-config';
import { MultipleChoiceGridFieldConfig } from '../form-components/multiple-choice-grid/multiple-choice-grid';
import { MultipleSelectionFieldConfig } from '../form-components/multiple-selection/multiple-selection-config';
import { ParagraphFieldConfig } from '../form-components/paragraph/paragraph-field-config';
import { RadioFieldConfig } from '../form-components/radio/radio-field-config';
import { SelectboxFieldConfig } from '../form-components/selectbox/selectbox-config';
import { SpaceFieldConfig } from '../form-components/space/space-field-config';
import { SubmitFieldConfig } from '../form-components/submit-button/submit-field-config';
import { TextareaFieldConfig } from '../form-components/textarea/textarea-field-config';
import { useFormEditorStore } from '../store';
import type { FormFieldType } from '../types';

export function FieldConfig() {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  const tDynamicComponents = useTranslations('dynamicForms.components');
  const { fields, selectedFieldId, updateField, setSelectedField } = useFormEditorStore();

  const selectedField = fields.find(field => {
    if (Array.isArray(field)) {
      return field.find(f => f.fieldId === selectedFieldId);
    }
    return field.fieldId === selectedFieldId;
  });

  if (!selectedField) {
    return null;
  }

  const field = Array.isArray(selectedField) ? selectedField.find(f => f.name === selectedFieldId) : selectedField;

  if (!field) {
    return null;
  }

  const handleConfigChange = (
    key: keyof FormFieldType,
    value: string | number | boolean | SelectboxOption[] | InputValue,
    rows?: MultipleChoiceGridOption[],
    columns?: MultipleChoiceGridOption[]
  ) => {
    updateField(field?.name, { [key]: value, rows: rows, columns: columns });
  };

  return (
    <div
      className={cn(
        'absolute right-4 z-10 h-[calc(100%-2rem)] bg-background shadow-lg transition-all duration-300 md:relative md:right-auto md:h-full md:w-full md:flex-1 md:shadow-none',
        selectedFieldId ? 'max-w-[300px]' : 'w-0'
      )}
    >
      <Button
        variant="outline"
        className="-translate-x-full absolute top-4 z-10 h-8 w-8 rounded-r-none border border-r-0 bg-background p-0 focus:border focus:border-r-0 md:hidden"
        onClick={() => setSelectedField(selectedFieldId ? null : field.fieldId)}
      >
        {selectedFieldId ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
      </Button>
      <div className="scrollbar h-full overflow-auto p-4">
        <h5 className="mb-4 font-medium">
          {tDynamicForms('title')} {tDynamicComponents(field.fieldType)}
        </h5>

        <div className="space-y-4">
          <HeadingFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <ParagraphFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <SpaceFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <InputFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <TextareaFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <InputNumberFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <EmailFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <InputCurrencyFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <InputPhoneNumberFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <InputPasswordFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <DateTimePickerFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <InputUrlFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <CheckboxFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <ImageFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <SelectboxFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <MultipleSelectionFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <MultipleChoiceGridFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <RadioFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <AutoCompleteFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <SubmitFieldConfig field={field} handleConfigChange={handleConfigChange} />
        </div>
      </div>
    </div>
  );
}

// export function FieldConfigWrapper() {
//   // const isMobile = useIsMobile();
//   const { selectedFieldId } = useFormEditorStore();
//   return (
//     <div
//       className={cn(
//         'scrollbar bg-background transition-all duration-300',
//         'md:relative md:h-full md:flex-1',
//         'absolute z-10 overflow-auto',
//         'right-4 w-[300px] shadow-lg md:right-auto md:w-full md:shadow-none',
//         'h-[calc(100%-2rem)]'
//       )}
//     >
//       <Button variant="ghost" className="-left-4 absolute top-4 z-10">
//         <ChevronLeftIcon />
//       </Button>
//       {selectedFieldId && <FieldConfig />}
//     </div>
//   );
// }
