'use client';
import { API_ENDPOINT } from '@oe/api';
import type { HTTPError } from '@oe/api';
import { z } from '@oe/api';
import { postInviteUserService } from '@oe/api';
import { toast } from '@oe/ui';
import { Button, type ButtonProps } from '@oe/ui';
import { Modal } from '@oe/ui';
import { SendHorizonalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSWRConfig } from 'swr';
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

export function InviteUserModal({ title, desc, role_event, buttonProps }: IInviteUser) {
  const t = useTranslations('blogManagement.inviteUser');
  const tError = useTranslations('errors');
  const { mutate: globalMutate } = useSWRConfig();
  const handleSubmit = async (value: IInviteUserSchemaType) => {
    try {
      await postInviteUserService(undefined, {
        payload: { ...value, event: role_event },
      });
      globalMutate(
        (key: string) => !!key?.includes(API_ENDPOINT.USER_INVITATIONS) && !!key?.includes(role_event),
        undefined,
        { revalidate: false }
      );

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
