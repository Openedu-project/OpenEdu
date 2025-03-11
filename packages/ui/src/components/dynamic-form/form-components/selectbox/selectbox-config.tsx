import type { SelectboxOption } from '#components/selectbox';
import FormDescriptionConfig from '../../form-config/form-description-config';
import FormDisabledConfig from '../../form-config/form-disabled-config';
import { FormLabelConfig } from '../../form-config/form-label-config';
import FormMaxConfig from '../../form-config/form-max-config';
import FormMinConfig from '../../form-config/form-min-config';
import FormOptionsConfig from '../../form-config/form-options-config';
import FormPlaceholderConfig from '../../form-config/form-placeholder-config';
import FormRequiredConfig from '../../form-config/form-required-config';
import FormTooltipConfig from '../../form-config/form-tooltip-config';
import type { FormFieldType } from '../../types';

export function SelectboxFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string | number | boolean | SelectboxOption[]) => void;
}) {
  if (field.fieldType !== 'selectbox') {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* <FormNameConfig field={field} handleConfigChange={handleConfigChange} /> */}
      <FormLabelConfig field={field} handleConfigChange={handleConfigChange} />
      <FormPlaceholderConfig field={field} handleConfigChange={handleConfigChange} />
      <FormDescriptionConfig field={field} handleConfigChange={handleConfigChange} />
      <FormTooltipConfig field={field} handleConfigChange={handleConfigChange} />
      <FormOptionsConfig field={field} handleConfigChange={handleConfigChange} />
      <FormRequiredConfig field={field} handleConfigChange={handleConfigChange} />
      <FormDisabledConfig field={field} handleConfigChange={handleConfigChange} />
      <FormMinConfig field={field} handleConfigChange={handleConfigChange} />
      <FormMaxConfig field={field} handleConfigChange={handleConfigChange} />
    </div>
  );
}
