'use client';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Form, FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { Switch } from '#shadcn/switch';
import { HeadingFieldConfig } from '../form-components/heading/heading-field-config';
import { ImageFieldConfig } from '../form-components/image/image-field-config';
import { ParagraphFieldConfig } from '../form-components/paragraph/paragraph-field-config';
import { useFormEditorStore } from '../store';
import type { FormFieldType } from '../types';

export function FieldConfig() {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  const { fields, selectedFieldId, updateField } = useFormEditorStore();
  const form = useForm();

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
    <Form {...form}>
      <form className="p-4">
        <h5 className="mb-4 font-medium">{tDynamicForms('title')}</h5>

        <div className="space-y-4">
          <FormFieldWithLabel name="name" label={tDynamicForms('name')}>
            <Input
              value={field?.name ?? ''}
              onChange={e => handleConfigChange('name', e.target.value)}
              autoComplete="off"
            />
          </FormFieldWithLabel>

          <FormFieldWithLabel name="label" label={tDynamicForms('label')}>
            <Input value={field?.label ?? ''} onChange={e => handleConfigChange('label', e.target.value)} />
          </FormFieldWithLabel>

          {field?.placeholder !== undefined && (
            <FormFieldWithLabel name="placeholder" label={tDynamicForms('placeholder')}>
              <Input value={field?.placeholder} onChange={e => handleConfigChange('placeholder', e.target.value)} />
            </FormFieldWithLabel>
          )}

          {field?.description !== undefined && (
            <FormFieldWithLabel name="description" label={tDynamicForms('description')}>
              <Input value={field?.description} onChange={e => handleConfigChange('description', e.target.value)} />
            </FormFieldWithLabel>
          )}

          {field?.infoText !== undefined && (
            <FormFieldWithLabel name="infoText" label={tDynamicForms('infoText')}>
              <Input value={field?.infoText} onChange={e => handleConfigChange('infoText', e.target.value)} />
            </FormFieldWithLabel>
          )}

          {field?.required !== undefined && (
            <FormFieldWithLabel name="required" label={tDynamicForms('required')}>
              <Switch
                checked={field?.required ?? false}
                onCheckedChange={checked => handleConfigChange('required', checked)}
              />
            </FormFieldWithLabel>
          )}

          {field?.disabled !== undefined && (
            <FormFieldWithLabel name="disabled" label={tDynamicForms('disabled')}>
              <Switch
                checked={field?.disabled ?? false}
                onCheckedChange={checked => handleConfigChange('disabled', checked)}
              />
            </FormFieldWithLabel>
          )}

          {['input', 'email'].includes(field?.fieldType ?? '') && (
            <>
              {field?.min !== undefined && (
                <FormFieldWithLabel name="min" label={tDynamicForms('min')}>
                  <Input
                    type="number"
                    value={Number(field?.min).toString()}
                    onChange={e => handleConfigChange('min', Number(e.target.value))}
                  />
                </FormFieldWithLabel>
              )}
              {field?.max !== undefined && (
                <FormFieldWithLabel name="max" label={tDynamicForms('max')}>
                  <Input
                    type="number"
                    value={Number(field?.max).toString()}
                    onChange={e => handleConfigChange('max', Number(e.target.value))}
                  />
                </FormFieldWithLabel>
              )}
            </>
          )}

          {field?.border !== undefined && (
            <FormFieldWithLabel name="border" label={tDynamicForms('border')}>
              <Switch
                checked={field.border ?? false}
                onCheckedChange={checked => handleConfigChange('border', checked)}
              />
            </FormFieldWithLabel>
          )}

          {field?.height !== undefined && (
            <FormFieldWithLabel name="height" label={tDynamicForms('height')}>
              <Input
                type="number"
                value={Number(field?.height).toString()}
                onChange={e => handleConfigChange('height', Number(e.target.value))}
              />
            </FormFieldWithLabel>
          )}

          <HeadingFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <ImageFieldConfig field={field} handleConfigChange={handleConfigChange} />
          <ParagraphFieldConfig field={field} handleConfigChange={handleConfigChange} />
        </div>
      </form>
    </Form>
  );
}
