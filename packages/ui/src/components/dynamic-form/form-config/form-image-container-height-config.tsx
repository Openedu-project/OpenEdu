import { useTranslations } from 'next-intl';
import { InputNumber } from '#components/input-number';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export default function FormImageContainerHeightConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: number) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('containerHeight')}>
      <InputNumber
        name="containerHeight"
        min={0}
        value={field.containerHeight}
        onChange={e => handleConfigChange('containerHeight', Number(e.target.value))}
      />
    </FormFieldWrapper>
  );
}
