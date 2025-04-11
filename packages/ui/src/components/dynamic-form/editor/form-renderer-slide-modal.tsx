import type { IFormQuestion, IFormResponse } from '@oe/api';
import type { z } from '@oe/api';
import { useTranslations } from 'next-intl';
import { type MouseEvent, Suspense, useState } from 'react';
import { toast } from 'sonner';
import { type ButtonConfig, Modal, type ModalProps } from '#components/modal';
import type { MultipleChoiceGridOption } from '#components/multiple-choice-grid';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';
import { COMPONENT_TYPES, componentWithoutLabel } from '../constants';
import { formComponents } from '../form-components';
import { MultipleChoiceGridFormField } from '../form-components/multiple-choice-grid/multiple-choice-grid-form-field';
import type { FormFieldType } from '../types';
import { convertFormValueToAnswers, generateZodSchema } from '../utils';

export function FormRendererSlideModal({
  formData,
  onSubmit,
  ...props
}: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
Partial<ModalProps<any>> & { formData?: IFormResponse }) {
  const tGeneral = useTranslations('general');

  const fields =
    formData?.questions
      ?.map(question => {
        return {
          ...question?.settings?.props,
          columns: question?.options,
          rows: question?.sub_questions?.map(row => ({
            ...row,
            text: row.title,
          })),
        } as FormFieldType;
      })
      .filter(Boolean) ?? [];

  const formSchema = generateZodSchema(fields);

  const fieldsWithoutSubmitButton = fields.filter(field => field?.fieldType !== 'submitButton');

  const fieldWithText = fieldsWithoutSubmitButton.filter(field => COMPONENT_TYPES.SKIP.has(field.fieldType));
  const fieldWithoutText = fieldsWithoutSubmitButton.filter(field => !COMPONENT_TYPES.SKIP.has(field.fieldType));
  const [step, setStep] = useState(1);

  const handleFormSubmit = (values: z.infer<z.ZodType>) => {
    const answers = convertFormValueToAnswers(values, formData?.questions as IFormQuestion[]);

    onSubmit?.(answers);
  };

  return (
    <Modal
      {...props}
      title=""
      description=""
      validationSchema={formSchema}
      onSubmit={handleFormSubmit}
      className="shadow-[0_4px_22px_0px_#F4F5F6]"
      formClassName="overflow-y-auto"
      buttons={
        [
          props?.hasCancelButton && {
            label: tGeneral('cancel'),
            variant: 'outline',
            type: 'button',
            onClick: (onClose: (e?: MouseEvent<HTMLButtonElement>) => void) => onClose?.(),
          },
        ].filter(Boolean) as ButtonConfig[]
      }
    >
      {form => (
        <>
          {fieldWithText.map(field => {
            const { fieldType, fieldId, ...rest } = field;
            const Component = formComponents[fieldType]?.component;

            if (!Component) {
              return null;
            }

            return (
              <Suspense key={fieldId} fallback={<Skeleton className="h-10 w-full" />}>
                {componentWithoutLabel.includes(fieldType) && (
                  <div className="p-2">
                    <Component {...rest} text={rest.label} />
                  </div>
                )}
              </Suspense>
            );
          })}

          {fieldWithoutText.map((field, index) => {
            const { fieldType, fieldId, ...rest } = field;
            const Component = formComponents[fieldType]?.component;

            if (!Component) {
              return null;
            }

            return (
              <Suspense key={fieldId} fallback={<Skeleton className="h-10 w-full" />}>
                <div className={cn(fieldType === 'checkbox' && 'p-6')}>
                  {fieldType === 'multipleChoiceGrid' ? (
                    <MultipleChoiceGridFormField
                      name={rest.name}
                      label={rest.label}
                      required={rest.required}
                      description={rest.description}
                      className={cn('flex-1 p-2', rest.border && 'border p-4')}
                      rows={rest?.rows as MultipleChoiceGridOption[]}
                      columns={rest?.columns as MultipleChoiceGridOption[]}
                    />
                  ) : (
                    <FormFieldWithLabel
                      name={rest.name}
                      label={rest.label}
                      infoText={rest.infoText}
                      required={rest.required}
                      description={rest.description}
                      className={cn(
                        'flex-1 p-2 pb-10',
                        rest.border && 'border p-4',
                        step === index + 1 ? '' : 'hidden'
                      )}
                      isToggleField={fieldType === 'checkbox' || fieldType === 'switch'}
                      render={({ field }) => (
                        <Component
                          {...('min' in rest && { min: rest.min })}
                          {...('max' in rest && { max: rest.max })}
                          {...('placeholder' in rest && {
                            placeholder: rest.placeholder,
                          })}
                          {...('text' in rest && { text: rest.text })}
                          {...(rest.disabled && { disabled: rest.disabled })}
                          {...(fieldType === 'selectbox' && {
                            options: rest.options,
                          })}
                          {...(fieldType === 'multipleSelection' && {
                            options: rest.options,
                            hasOtherOption: rest?.otherOption,
                          })}
                          {...((fieldType === 'checkbox' || fieldType === 'switch') && {
                            checked: field.value,
                            onCheckedChange: field.onChange,
                          })}
                        />
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      'fixed bottom-0 left-0 flex w-full items-center justify-between gap-3 bg-white px-4 py-2 pt-4 shadow-sm',
                      step === index + 1 ? '' : 'hidden'
                    )}
                  >
                    <div className="flex gap-3 font-medium">
                      {step} / {fieldWithoutText?.length}
                    </div>
                    <div className="flex gap-3">
                      {step !== 1 && (
                        <Button
                          variant="outline"
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            setStep(step - 1);
                          }}
                        >
                          {tGeneral('back')}
                        </Button>
                      )}
                      {step >= 1 && step !== fieldWithoutText?.length && (
                        <Button
                          variant="default"
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            setStep(step + 1);
                          }}
                        >
                          {tGeneral('next')}
                        </Button>
                      )}
                      {step === fieldWithoutText?.length && (
                        <Button
                          key={`'confirm_settings_btn_'${1}`}
                          type="submit"
                          onClick={async e => {
                            e.preventDefault();
                            const isValid = await form.trigger();

                            if (isValid) {
                              handleFormSubmit(form.getValues());
                            } else {
                              toast.error(tGeneral('errorRequiredFields'));
                            }
                          }}
                        >
                          {tGeneral('submit')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Suspense>
            );
          })}
        </>
      )}
    </Modal>
  );
}
