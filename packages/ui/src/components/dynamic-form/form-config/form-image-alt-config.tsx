import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export default function FormImageAltConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: string) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('alt')}>
      <Input name="alt" value={field.alt || ''} onChange={e => handleConfigChange('alt', e.target.value)} />
    </FormFieldWrapper>
  );
}
