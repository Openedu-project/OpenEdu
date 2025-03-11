import { Trash2 } from 'lucide-react';

import { Selectbox } from '@oe/ui/components/selectbox';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';

export const ConfirmationButtons = () => {
  const t = useTranslations('course');
  const hasInitialized = useRef(false);

  const { fields, append, remove } = useFieldArray({
    name: 'confirmation_settings.buttons',
  });

  useEffect(() => {
    if (fields.length === 0 && !hasInitialized.current) {
      append({ text: 'Submit', variant: 'default', type: 'submit' });
      hasInitialized.current = true;
    }
  }, [fields.length, append]);

  const buttonVariants = [
    { id: 'default', value: 'default', label: t('form.button.default') },
    {
      id: 'destructive',
      value: 'destructive',
      label: t('form.button.destructive'),
    },
    { id: 'outline', value: 'outline', label: t('form.button.outline') },
    { id: 'secondary', value: 'secondary', label: t('form.button.secondary') },
    { id: 'ghost', value: 'ghost', label: t('form.button.ghost') },
    { id: 'link', value: 'link', label: t('form.button.link') },
  ];

  const buttonTypes = [
    { id: 'button', value: 'button', label: t('form.button.button') },
    { id: 'submit', value: 'submit', label: t('form.button.submit') },
  ];

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{t('form.button.buttons')}</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => append({ text: 'Submit', variant: 'primary' })}
        >
          <Plus className="mr-1 h-4 w-4" />
          {t('form.button.addButton')}
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2 rounded-md border p-2">
          <div className="flex-1 space-y-2">
            <FormFieldWithLabel name={`confirmation_settings.buttons.${index}.text`} label={t('form.button.text')}>
              <Input placeholder={t('form.button.textPlaceholder')} />
            </FormFieldWithLabel>

            <FormFieldWithLabel
              name={`confirmation_settings.buttons.${index}.variant`}
              label={t('form.button.variant')}
            >
              <Selectbox placeholder={t('form.button.selectVariant')} options={buttonVariants} />
            </FormFieldWithLabel>

            <FormFieldWithLabel name={`confirmation_settings.buttons.${index}.type`} label={t('form.button.type')}>
              <Selectbox placeholder={t('form.button.typePlaceholder')} options={buttonTypes} />
            </FormFieldWithLabel>
          </div>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => handleRemove(index)}
            disabled={fields.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
