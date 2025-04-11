import type { MultipleChoiceGridOption } from '#components/multiple-choice-grid';
import { FormDescriptionConfig } from '../../form-config/form-description-config';
import { FormDisabledConfig } from '../../form-config/form-disabled-config';
import { FormGridColumnConfig, FormGridRowConfig } from '../../form-config/form-grid-config';
import { FormLabelConfig } from '../../form-config/form-label-config';
import { FormPlaceholderConfig } from '../../form-config/form-placeholder-config';
import { FormRequiredConfig } from '../../form-config/form-required-config';
import { FormTooltipConfig } from '../../form-config/form-tooltip-config';
import type { FormFieldType } from '../../types';

export function MultipleChoiceGridFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (
    key: keyof FormFieldType,
    value: string | number | boolean,
    rows?: MultipleChoiceGridOption[],
    columns?: MultipleChoiceGridOption[]
  ) => void;
}) {
  if (field.fieldType !== 'multipleChoiceGrid') {
    return null;
  }
  return (
    <div className="space-y-4">
      {/* <FormNameConfig field={field} handleConfigChange={handleConfigChange} /> */}
      <FormLabelConfig field={field} handleConfigChange={handleConfigChange} />
      <FormPlaceholderConfig field={field} handleConfigChange={handleConfigChange} />
      <FormDescriptionConfig field={field} handleConfigChange={handleConfigChange} />
      <FormTooltipConfig field={field} handleConfigChange={handleConfigChange} />
      {/* <FormOptionsConfig field={field} handleConfigChange={handleConfigChange} /> */}
      <FormGridColumnConfig
        field={field}
        handleConfigChange={(key, cols) => {
          // console.log(field);
          // console.log("k", key, "col", cols);
          handleConfigChange(key, '', field?.rows, cols);
        }}
      />
      <FormGridRowConfig
        field={field}
        handleConfigChange={(key, rows) => {
          // console.log(field);
          // console.log("k", key, "row", rows);
          handleConfigChange(key, '', rows, field?.columns);
        }}
      />

      <FormRequiredConfig field={field} handleConfigChange={handleConfigChange} />
      <FormDisabledConfig field={field} handleConfigChange={handleConfigChange} />
    </div>
  );
}
