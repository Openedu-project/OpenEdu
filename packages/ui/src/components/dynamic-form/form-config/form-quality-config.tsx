import { useTranslations } from 'next-intl';
import { InputSelect, type InputValue } from '#components/input-select';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

export function FormQualityConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: number) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  // const [value, setValue] = useState<InputValue>({ input: '', select: '' });

  const handleChange = (value: InputValue) => {
    // setValue(value);
    handleConfigChange('quality', Number(value.input));
  };

  return (
    <FormFieldWrapper label={tDynamicForms('quality')}>
      {/* <InputNumber
        name="quality"
        min={1}
        max={100}
        value={field.quality}
        onChange={e => handleConfigChange('quality', Number(e.target.value))}
      /> */}
      <InputSelect
        selectPosition="end"
        inputProps={{
          type: 'number',
          placeholder: 'Nhập số...',
          className: 'custom-input',
        }}
        selectProps={{
          className: 'min-w-14 w-14',
          defaultValue: '%',
          items: [{ value: '%', label: '%' }],
          disabled: true,
        }}
        value={{
          input: field.quality?.toString() || '',
          select: '%',
        }}
        onChange={handleChange}
        className="w-full"
      />
    </FormFieldWrapper>
  );
}
