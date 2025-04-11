import { Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormHeadingTypeConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  return (
    <FormFieldWrapper label={tDynamicForms('headingType')}>
      <ToggleGroup
        type="single"
        value={field.headingType}
        onValueChange={value => handleConfigChange('headingType', value)}
        className="justify-start"
      >
        <ToggleGroupItem value="h1" aria-label="h1" title={tDynamicForms('heading1')}>
          <Heading1Icon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="h2" aria-label="h2" title={tDynamicForms('heading2')}>
          <Heading2Icon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="h3" aria-label="h3" title={tDynamicForms('heading3')}>
          <Heading3Icon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="h4" aria-label="h4" title={tDynamicForms('heading4')}>
          <Heading4Icon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="h5" aria-label="h5" title={tDynamicForms('heading5')}>
          <Heading5Icon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="h6" aria-label="h6" title={tDynamicForms('heading6')}>
          <Heading6Icon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </FormFieldWrapper>
  );
}
