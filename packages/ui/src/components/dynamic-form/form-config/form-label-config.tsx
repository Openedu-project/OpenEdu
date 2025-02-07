import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormLabelConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: string) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('label')}>
      <Input name="label" value={field?.label ?? ''} onChange={e => handleConfigChange('label', e.target.value)} />
    </FormFieldWrapper>
  );
}
