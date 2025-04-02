import type { MultipleSelectionOption } from '#components/multiple-selection';
import FormDescriptionConfig from '../../form-config/form-description-config';
import { FormLabelConfig } from '../../form-config/form-label-config';
import FormOptionsConfig from '../../form-config/form-options-config';
import FormOtherOptionConfig from '../../form-config/form-other-option-config copy';
import FormPlaceholderConfig from '../../form-config/form-placeholder-config';
import FormTooltipConfig from '../../form-config/form-tooltip-config';
import type { FormFieldType } from '../../types';

export function MultipleSelectionFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string | number | boolean | MultipleSelectionOption[]) => void;
}) {
  if (field.fieldType !== 'multipleSelection') {
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
      <FormOtherOptionConfig field={field} handleConfigChange={handleConfigChange} />
      {/* <FormRequiredConfig
        field={field}
        handleConfigChange={handleConfigChange}
      />
      <FormDisabledConfig
        field={field}
        handleConfigChange={handleConfigChange}
      />
      <FormMinConfig field={field} handleConfigChange={handleConfigChange} />
      <FormMaxConfig field={field} handleConfigChange={handleConfigChange} /> */}
    </div>
  );
}
