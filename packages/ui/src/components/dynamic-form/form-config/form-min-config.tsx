import { useTranslations } from 'next-intl';
import { InputNumber } from '#components/input-number';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export default function FormMinConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: number) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('min')}>
      <InputNumber
        name="min"
        min={0}
        value={field.min}
        onChange={e => handleConfigChange('min', Number(e.target.value))}
      />
    </FormFieldWrapper>
  );
}
