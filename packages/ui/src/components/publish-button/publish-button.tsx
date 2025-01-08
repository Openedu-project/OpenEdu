import { z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import { Modal } from '#components/modal';
import { Button, type ButtonProps } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Textarea } from '#shadcn/textarea';

interface IConfirmPublic {
  onConfirm: (param: { note?: string }) => Promise<void>;
  action: 'publish' | 'unpublish';
  onlyText?: boolean;
  title?: string;
  desc?: string;
  triggerProps?: ButtonProps;
  onClose?: () => void;
}

const confirmSchema = z.object({
  note: z.string().optional(),
});

export function PublishButton({
  onConfirm,
  action,
  onClose,
  title,
  desc,
  onlyText = false,
  triggerProps,
}: IConfirmPublic) {
  const tGeneral = useTranslations('general');
  const t = useTranslations('publishButton');

  const buttonProps: ButtonProps =
    action === 'publish'
      ? { variant: 'default', ...triggerProps, className: `text-wrap ${triggerProps?.className}` }
      : {
          variant: 'outline',
          ...triggerProps,
          className: `border-destructive text-destructive text-wrap ${triggerProps?.className}`,
        };
  return (
    <Modal
      title={title ?? (action === 'publish' ? t('confirmPublish') : t('confirmUnPublish'))}
      validationSchema={confirmSchema}
      onSubmit={onConfirm}
      onClose={onClose}
      trigger={<Button {...buttonProps}>{action === 'publish' ? tGeneral('publish') : tGeneral('unpublish')}</Button>}
      buttons={[
        {
          label: action === 'publish' ? tGeneral('publish') : tGeneral('unpublish'),
          variant: action === 'publish' ? 'default' : 'destructive',
          type: 'submit',
        },
        {
          type: 'button',
          label: tGeneral('cancel'),
          variant: 'outline',
        },
      ]}
    >
      {form =>
        onlyText ? (
          <p>{desc ?? (action === 'publish' ? t('publishLabel') : t('unpublishLabel'))}</p>
        ) : (
          <div className="grid gap-4">
            <FormFieldWithLabel form={form} name="note" label={desc ?? t('note')}>
              <Textarea />
            </FormFieldWithLabel>
          </div>
        )
      }
    </Modal>
  );
}
