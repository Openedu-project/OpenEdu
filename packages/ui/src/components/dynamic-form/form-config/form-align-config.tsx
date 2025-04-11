import { AlignCenter } from 'lucide-react';
import { AlignLeft } from 'lucide-react';
import { AlignRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormAlignConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('align')}>
      <ToggleGroup
        type="single"
        value={field.align}
        onValueChange={value => handleConfigChange('align', value)}
        className="justify-start"
      >
        <ToggleGroupItem value="start" aria-label="Align start" title={tDynamicForms('alignStart')}>
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center" title={tDynamicForms('alignCenter')}>
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="end" aria-label="Align end" title={tDynamicForms('alignEnd')}>
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </FormFieldWrapper>
  );
}
