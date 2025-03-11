import type { IFormResponse } from '@oe/api/types/form';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { type ButtonConfig, Modal, type ModalProps } from '#components/modal';
import type { FormFieldType } from '../types';
import { FormRenderer } from './form-renderer';

export function FormRendererModal({
  formData,
  ...props
}: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
Partial<ModalProps<any>> & { formData?: IFormResponse }) {
  const tGeneral = useTranslations('general');

  const fields =
    formData?.questions
      ?.map(question => question?.settings?.props as FormFieldType)
      .filter(question => question !== undefined) ?? [];

  const fieldsWithoutSubmitButton = fields.filter(field => field.fieldType !== 'submitButton');
  const submitButton = fields.find(field => field.fieldType === 'submitButton');

  return (
    <Modal
      {...props}
      title=""
      description=""
      buttons={
        [
          {
            label: tGeneral('cancel'),
            variant: 'outline',
            type: 'button',
            onClick: (onClose: (e?: MouseEvent<HTMLButtonElement>) => void) => onClose?.(),
          },
          submitButton && {
            label: submitButton.label,
            type: 'submit',
          },
        ].filter(Boolean) as ButtonConfig[]
      }
    >
      <FormRenderer fields={fieldsWithoutSubmitButton} />
    </Modal>
  );
}
