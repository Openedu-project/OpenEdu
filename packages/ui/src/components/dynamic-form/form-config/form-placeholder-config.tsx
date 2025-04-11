import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormPlaceholderConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('placeholder')}>
      <Input
        name="placeholder"
        value={field?.placeholder}
        onChange={e => handleConfigChange('placeholder', e.target.value)}
      />
    </FormFieldWrapper>
  );
}
