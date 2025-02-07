import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormNameConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: string) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('name')}>
      <Input
        name="name"
        value={field?.name ?? ''}
        onChange={e => handleConfigChange('name', e.target.value)}
        autoComplete="off"
      />
    </FormFieldWrapper>
  );
}
