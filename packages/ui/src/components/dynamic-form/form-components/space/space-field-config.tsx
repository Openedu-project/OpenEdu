import { FormHeightConfig } from '../../form-config/form-height-config';
import type { FormFieldType } from '../../types';

export function SpaceFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: number) => void;
}) {
  if (field.fieldType !== 'space') {
    return null;
  }

  return (
    <div className="space-y-4">
      <FormHeightConfig field={field} handleConfigChange={handleConfigChange} />
    </div>
  );
}
