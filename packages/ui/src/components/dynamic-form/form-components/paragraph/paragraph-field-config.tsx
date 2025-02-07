import FormAlignConfig from '../../form-config/form-align-config';
import { FormLabelConfig } from '../../form-config/form-label-config';
import type { FormFieldType } from '../../types';

export function ParagraphFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string) => void;
}) {
  if (field.fieldType !== 'paragraph') {
    return null;
  }

  return (
    <div className="space-y-4">
      <FormLabelConfig field={field} handleConfigChange={handleConfigChange} />
      <FormAlignConfig field={field} handleConfigChange={handleConfigChange} />
    </div>
  );
}
