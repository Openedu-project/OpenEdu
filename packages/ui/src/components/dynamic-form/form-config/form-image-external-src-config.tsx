import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormImageExternalSrcConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('imageUrl')}>
      <Input
        name="externalSrc"
        value={field.externalSrc || ''}
        onChange={e => handleConfigChange('externalSrc', e.target.value)}
        placeholder={tDynamicForms('enterImageUrl')}
      />
    </FormFieldWrapper>
  );
}
