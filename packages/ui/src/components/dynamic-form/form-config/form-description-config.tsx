import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export default function FormDescriptionConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: string) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('description')}>
      <Input
        name="description"
        value={field?.description}
        onChange={e => handleConfigChange('description', e.target.value)}
      />
    </FormFieldWrapper>
  );
}
