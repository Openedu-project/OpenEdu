import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormAspectRatioConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('aspectRatio')}>
      <ToggleGroup
        type="single"
        value={field.aspectRatio ?? ''}
        onValueChange={value => handleConfigChange('aspectRatio', value)}
        className="justify-start"
      >
        <ToggleGroupItem value="none">{tDynamicForms('aspectRatioNone')}</ToggleGroupItem>
        <ToggleGroupItem value="1:1">{tDynamicForms('aspectRatio1')}</ToggleGroupItem>
        <ToggleGroupItem value="16:9">{tDynamicForms('aspectRatio16')}</ToggleGroupItem>
        <ToggleGroupItem value="4:3">{tDynamicForms('aspectRatio4')}</ToggleGroupItem>
        <ToggleGroupItem value="21:9">{tDynamicForms('aspectRatio21')}</ToggleGroupItem>
      </ToggleGroup>
    </FormFieldWrapper>
  );
}
