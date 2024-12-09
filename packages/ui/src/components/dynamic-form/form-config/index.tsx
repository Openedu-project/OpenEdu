'use client';
import { useTranslations } from 'next-intl';
import { CheckboxFieldConfig } from '../form-components/checkbox/checkbox-field-config';
import { EmailFieldConfig } from '../form-components/email/email-field-config';
import { HeadingFieldConfig } from '../form-components/heading/heading-field-config';
import { ImageFieldConfig } from '../form-components/image/image-field-config';
import { InputNumberFieldConfig } from '../form-components/input-number/input-number-field-config';
import { InputFieldConfig } from '../form-components/input/input-field-config';
import { ParagraphFieldConfig } from '../form-components/paragraph/paragraph-field-config';
import { SpaceFieldConfig } from '../form-components/space/space-field-config';
import { SubmitFieldConfig } from '../form-components/submit-button/submit-field-config';
import { TextareaFieldConfig } from '../form-components/textarea/textarea-field-config';
import { useFormEditorStore } from '../store';
import type { FormFieldType } from '../types';

export function FieldConfig() {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  const tDynamicComponents = useTranslations('dynamicForms.components');
  const { fields, selectedFieldId, updateField } = useFormEditorStore();

  const selectedField = fields.find(field => {
    if (Array.isArray(field)) {
      return field.find(f => f.name === selectedFieldId);
    }
    return field.name === selectedFieldId;
  });

  if (!selectedField) {
    return null;
  }

  const field = Array.isArray(selectedField) ? selectedField.find(f => f.name === selectedFieldId) : selectedField;

  if (!field) {
    return null;
  }

  const handleConfigChange = (key: keyof FormFieldType, value: string | number | boolean) => {
    updateField(field?.name, { [key]: value });
  };

  return (
    <div className="p-4">
      <h5 className="mb-4 font-medium">
        {tDynamicForms('title')} {tDynamicComponents(field.fieldType)}
      </h5>

      <div className="space-y-4">
        <HeadingFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <ParagraphFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <SpaceFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <InputFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <TextareaFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <InputNumberFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <EmailFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <CheckboxFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <ImageFieldConfig field={field} handleConfigChange={handleConfigChange} />
        <SubmitFieldConfig field={field} handleConfigChange={handleConfigChange} />
      </div>
    </div>
  );
}
