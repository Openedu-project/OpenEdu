import { useTranslations } from 'next-intl';
import { InputNumber } from '#components/input-number';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export default function FormQualityConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: number) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('quality')}>
      <InputNumber
        name="quality"
        min={1}
        max={100}
        value={field.quality}
        onChange={e => handleConfigChange('quality', Number(e.target.value))}
      />
    </FormFieldWrapper>
  );
}
