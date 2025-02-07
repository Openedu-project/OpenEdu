import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export default function FormTooltipConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: string) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('infoText')}>
      <Input name="infoText" value={field?.infoText} onChange={e => handleConfigChange('infoText', e.target.value)} />
    </FormFieldWrapper>
  );
}
