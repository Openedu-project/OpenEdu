import { useTranslations } from 'next-intl';
import { Switch } from '#shadcn/switch';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormPriorityConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: boolean) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('priority')}>
      <Switch checked={field.priority} onCheckedChange={checked => handleConfigChange('priority', checked)} />
    </FormFieldWrapper>
  );
}
