import { useTranslations } from 'next-intl';
import { InputNumber } from '#components/input-number';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormMaxConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: number) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('max')}>
      <InputNumber name="max" min={0} value={field.max} onChange={value => handleConfigChange('max', value)} />
    </FormFieldWrapper>
  );
}
