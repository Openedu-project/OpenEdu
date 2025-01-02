import { type IPermissionActionConfigSchema, permissionActionConfigSchema } from '@Oe/api/schemas/permission';
import type { IPermissionConfigPayload } from '@oe/api/types/permissions';
import { Modal } from '@oe/ui/components/modal';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
interface IActionsFormModal {
  open: boolean;
  onSubmit: (value: IPermissionConfigPayload) => void;
  onClose: () => void;
}

export default function ActionsFormModal({ open = true, onClose, onSubmit }: IActionsFormModal) {
  const t = useTranslations('permissionActionFormModal');

  const handleSubmit = async (values: IPermissionActionConfigSchema) => {
    const params = {
      configs: [
        {
          id: values.name,
          type: 'action',
          ...values,
        },
      ],
    } as unknown as IPermissionConfigPayload;

    await onSubmit?.(params);
  };

  return (
    <Modal
      open={open}
      title={t('addNewAction')}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
        {
          type: 'submit',
          label: t('save'),
          variant: 'default',
        },
      ]}
      validationSchema={permissionActionConfigSchema}
      onSubmit={handleSubmit}
    >
      <>
        <FormFieldWithLabel label={t('name')} name="name">
          <Input placeholder={t('namePlaceholder')} />
        </FormFieldWithLabel>

        <FormFieldWithLabel label={t('description')} name="description">
          <Textarea placeholder={t('descriptionPlaceholder')} className="resize-none" />
        </FormFieldWithLabel>
      </>
    </Modal>
  );
}
