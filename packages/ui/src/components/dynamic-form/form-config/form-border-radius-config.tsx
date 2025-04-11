import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormBorderRadiusConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('rounded')}>
      <ToggleGroup
        type="single"
        value={field.rounded || 'none'}
        onValueChange={value => handleConfigChange('rounded', value)}
        className="flex-wrap justify-start"
      >
        <ToggleGroupItem value="none">{tDynamicForms('none')}</ToggleGroupItem>
        <ToggleGroupItem value="sm">{tDynamicForms('small')}</ToggleGroupItem>
        <ToggleGroupItem value="md">{tDynamicForms('medium')}</ToggleGroupItem>
        <ToggleGroupItem value="lg">{tDynamicForms('large')}</ToggleGroupItem>
        <ToggleGroupItem value="full">{tDynamicForms('full')}</ToggleGroupItem>
      </ToggleGroup>
    </FormFieldWrapper>
  );
}
