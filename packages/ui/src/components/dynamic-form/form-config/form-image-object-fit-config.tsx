import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormImageObjectFitConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('objectFit')}>
      <ToggleGroup
        type="single"
        value={field.objectFit || 'cover'}
        onValueChange={value => handleConfigChange('objectFit', value)}
        className="justify-start"
      >
        <ToggleGroupItem value="contain">{tDynamicForms('objectFitContain')}</ToggleGroupItem>
        <ToggleGroupItem value="cover">{tDynamicForms('objectFitCover')}</ToggleGroupItem>
        <ToggleGroupItem value="fill">{tDynamicForms('objectFitFill')}</ToggleGroupItem>
        <ToggleGroupItem value="none">{tDynamicForms('objectFitNone')}</ToggleGroupItem>
      </ToggleGroup>
    </FormFieldWrapper>
  );
}
