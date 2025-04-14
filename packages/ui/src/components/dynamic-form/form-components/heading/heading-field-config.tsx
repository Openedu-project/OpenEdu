import { FormAlignConfig } from '../../form-config/form-align-config';
import { FormHeadingTypeConfig } from '../../form-config/form-heading-type-config';
import { FormLabelConfig } from '../../form-config/form-label-config';
import type { FormFieldType } from '../../types';

export function HeadingFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string | number | boolean) => void;
}) {
  if (field.fieldType !== 'heading') {
    return null;
  }

  return (
    <div className="space-y-4">
      <FormLabelConfig field={field} handleConfigChange={handleConfigChange} />
      <FormHeadingTypeConfig field={field} handleConfigChange={handleConfigChange} />
      <FormAlignConfig field={field} handleConfigChange={handleConfigChange} />
    </div>
  );
}
