import { useApprove, useReject } from '@oe/api';
import { z } from '@oe/api';
import type { IApprovalPayload } from '@oe/api';
import { toast } from '@oe/ui';
import { Button, type ButtonProps } from '@oe/ui';
import { Modal } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Textarea } from '@oe/ui';
import { ShieldBan, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

type TAction = 'approve' | 'reject';

interface IConfirmApprove {
  handleSuccess?: () => Promise<unknown>;
  action: TAction;
  title?: string;
  desc?: string;
  triggerProps?: ButtonProps;
  onClose?: () => void;
  onlyText?: boolean;
  id: string;
}

const useTriggerApproval = ({
  action,
  id,
  handleSuccess,
}: {
  action: TAction;
  id: string;
  handleSuccess?: () => Promise<unknown>;
}) => {
  const { triggerReject } = useReject(id);
  const { triggerApprove } = useApprove(id);
  const t = useTranslations('approveButton');
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useCallback(
    async (value: IApprovalPayload) => {
      try {
        await (action === 'reject' ? triggerReject(value) : triggerApprove(value));

        toast.success(t(`${action}Success`));
        await handleSuccess?.();
      } catch (error) {
        console.error(error);
      }
    },
    [action, id]
  );
};

const confirmSchema = z.object({
  note: z.string(),
});

export function ApproveButton({
  handleSuccess,
  action,
  onClose,
  title,
  desc,
  triggerProps,
  onlyText = false,
  id,
}: IConfirmApprove) {
  const tGeneral = useTranslations('general');
  const t = useTranslations('approveButton');
  const triggerApproval = useTriggerApproval({ action, id, handleSuccess });
  const buttonProps: ButtonProps =
    action === 'approve'
      ? {
          variant: 'outline',
          ...triggerProps,
          className: `text-wrap border-primary text-primary ${triggerProps?.className}`,
        }
      : {
          variant: 'outline',
          ...triggerProps,
          className: `text-wrap border-destructive text-destructive ${triggerProps?.className}`,
        };

  return (
    <Modal
      title={
        <span className="giant-iheading-semibold20">
          {title ?? (action === 'approve' ? t('confirmApprove') : t('confirmReject'))}
        </span>
      }
      onClose={onClose}
      trigger={<Button {...buttonProps}>{action === 'approve' ? tGeneral('approve') : tGeneral('reject')}</Button>}
      validationSchema={confirmSchema}
      onSubmit={triggerApproval}
      buttons={[
        {
          label: action === 'approve' ? tGeneral('approve') : tGeneral('reject'),
          variant: action === 'approve' ? 'default' : 'destructive',
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
          <div className="mb-2 flex flex-col items-center gap-2">
            {action === 'approve' ? (
              <ShieldCheck className="h-12 w-12 text-success" />
            ) : (
              <ShieldBan className="h-12 w-12 text-destructive" />
            )}
            <p className="mcaption-regular16">
              {desc ?? (action === 'approve' ? t('approveLabel') : t('rejectLabel'))}
            </p>
          </div>
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
