'use client';
import { postInviteUserService } from '@oe/api/services/user';
import type { HTTPError } from '@oe/api/utils/http-error';
import { z } from '@oe/api/utils/zod';
import { Modal } from '@oe/ui/components/modal';
import { Button, type ButtonProps } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { SendHorizonalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SelectUserField } from './select-user-field';

interface IInviteUser {
  role_event: string;
  title?: string;
  desc?: string;
  buttonProps?: ButtonProps;
}
const inviteUserSchema = z.object({
  user_emails: z
    .array(
      z.string().email({
        message: 'blogManagement.inviteUser.errors.invalidEmail',
      })
    )
    .min(1, 'blogManagement.inviteUser.errors.isRequiredEmail'),
});

export type IInviteUserSchemaType = z.infer<typeof inviteUserSchema>;

export default function InviteUserModal({ title, desc, role_event, buttonProps }: IInviteUser) {
  const t = useTranslations('blogManagement.inviteUser');
  const tError = useTranslations('errors');

  const handleSubmit = async (value: IInviteUserSchemaType) => {
    try {
      await postInviteUserService(undefined, {
        payload: { ...value, event: role_event },
      });
      toast.success(t('sentInvitationSuccess'));
    } catch (error) {
      console.error('Invite User Error', error);
      toast.error(tError((error as HTTPError).message));
    }
  };

  return (
    <Modal
      title={title ?? t('title')}
      description={desc}
      hasCloseIcon
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
        },
        {
          type: 'submit',
          label: t('invite'),
          variant: 'default',
        },
      ]}
      defaultValues={{ user_emails: [] }}
      validationSchema={inviteUserSchema}
      trigger={
        <Button {...buttonProps} leftSection={<SendHorizonalIcon />}>
          {title ?? t('title')}
        </Button>
      }
      onSubmit={handleSubmit}
    >
      {form => <SelectUserField form={form} />}
    </Modal>
  );
}
