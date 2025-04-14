import { useTranslations } from 'next-intl';
import { InputNumber } from '#components/input-number';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormWidthConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: number) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('width')}>
      <InputNumber
        name="width"
        min={0}
        value={field.width as number}
        onChange={value => handleConfigChange('width', value)}
      />
    </FormFieldWrapper>
  );
}
