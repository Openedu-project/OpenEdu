import { useGetForms } from '@oe/api/hooks/useForms';
import { CreateFormButton } from '@oe/ui/components/dynamic-form';
import { InputNumber } from '@oe/ui/components/input-number';
import { Selectbox } from '@oe/ui/components/selectbox';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Switch } from '@oe/ui/shadcn/switch';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ConfirmationButtons } from './confirmation-buttons';
import { EntityIdSelector } from './entity-id-selector';

export function FormTriggerForm() {
  const t = useTranslations('course');

  const { setValue } = useFormContext();

  const confirmationEnabled = useWatch({
    name: 'confirmation_settings.enabled',
  });
  const confirmationAutoCloseEnabled = useWatch({
    name: 'confirmation_settings.auto_close_enabled',
  });
  const type = useWatch({
    name: 'type',
  });

  const formId = useWatch({
    name: 'form_id',
  });

  const { dataForms } = useGetForms({
    is_template: true,
    page: 1,
    per_page: 99999,
  });

  useEffect(() => {
    if (formId && dataForms) {
      const selectedForm = dataForms.find(form => form.id === formId);
      if (selectedForm) {
        setValue('name', selectedForm.title);
      }
    }
    // return () => {
    //   reset();
    // };
  }, [formId, dataForms, setValue]);

  const triggerConditions = [
    {
      id: 'started_lesson',
      value: 'started_lesson',
      label: t('form.trigger.startedLesson'),
    },
    {
      id: 'completed_lesson',
      value: 'completed_lesson',
      label: t('form.trigger.completedLesson'),
    },
    {
      id: 'completed_section',
      value: 'completed_section',
      label: t('form.trigger.completedSection'),
    },
    {
      id: 'clicked_on',
      value: 'clicked_on',
      label: t('form.trigger.clickedOn'),
    },
  ];

  const types = [
    { id: 'form', value: 'form', label: t('form.type.form') },
    {
      id: 'notification',
      value: 'notification',
      label: t('form.type.notification'),
    },
  ];

  return (
    <div className="space-y-4">
      <FormFieldWithLabel name="type" label={t('form.type.type')}>
        <Selectbox placeholder={t('form.type.selectType')} options={types} />
      </FormFieldWithLabel>

      {type === 'form' && (
        <div className="flex flex-col">
          <FormFieldWithLabel name="form_id" label={t('form.selectForm')} required>
            <Selectbox
              placeholder={t('form.selectFormPlaceholder')}
              options={
                dataForms?.map(form => ({
                  value: form.id,
                  label: form.title,
                  id: form.id,
                })) ?? []
              }
            />
          </FormFieldWithLabel>
          <CreateFormButton className="justify-end p-0" variant="link" queryParams={{ type: 'component' }} />
        </div>
      )}

      {type === 'form' ? (
        <FormFieldWithLabel name="name" className="hidden">
          <Input type="hidden" />
        </FormFieldWithLabel>
      ) : (
        type === 'notification' && (
          <FormFieldWithLabel name="name" label={t('form.name')}>
            <Input placeholder={t('form.namePlaceholder')} />
          </FormFieldWithLabel>
        )
      )}

      <div className="space-y-4">
        <FormFieldWithLabel name="start_when.type" label={t('form.trigger.condition')} required>
          <Selectbox placeholder={t('form.trigger.selectCondition')} options={triggerConditions} />
        </FormFieldWithLabel>

        <EntityIdSelector />
      </div>

      {type === 'form' && (
        <FormFieldWithLabel
          name="confirmation_settings.enabled"
          label={t('form.confirmationEnabled')}
          isToggleField
          className="flex-row-reverse justify-between space-x-0"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} id="confirmation-enabled" />
          )}
        />
      )}

      {(type === 'notification' || confirmationEnabled) && (
        <>
          <FormFieldWithLabel name="confirmation_settings.title" label={t('form.confirmationTitle')} required>
            <Input placeholder={t('form.confirmationTitlePlaceholder')} />
          </FormFieldWithLabel>

          <FormFieldWithLabel
            name="confirmation_settings.description"
            label={t('form.confirmationDescription')}
            required
          >
            <Input placeholder={t('form.confirmationDescriptionPlaceholder')} />
          </FormFieldWithLabel>

          <ConfirmationButtons />

          <FormFieldWithLabel
            name="confirmation_settings.auto_close_enabled"
            label={t('form.confirmationAutoCloseEnabled')}
            isToggleField
            className="flex-row-reverse justify-between space-x-0"
            render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
          />

          {confirmationAutoCloseEnabled && (
            <FormFieldWithLabel
              name="confirmation_settings.auto_close_after_seconds"
              label={t('form.confirmationAutoCloseAfterSeconds')}
              required
            >
              <InputNumber placeholder={t('form.confirmationAutoCloseAfterSecondsPlaceholder')} />
            </FormFieldWithLabel>
          )}
        </>
      )}

      {type === 'notification' && (
        <FormFieldWithLabel
          name="confirmation_settings.display_on_detail"
          label={t('form.confirmationDisplayOnDetail')}
          isToggleField
          className="flex-row-reverse justify-between space-x-0"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} id="confirmation-enabled" />
          )}
        />
      )}
    </div>
  );
}
