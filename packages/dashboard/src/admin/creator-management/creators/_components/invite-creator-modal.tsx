import { zodResolver } from '@hookform/resolvers/zod';
import { type IInviteCreatorSchemaType, inviteCreatorSchema } from '@oe/api';
import { InputTags } from '@oe/ui';
import { Modal } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IInviteCreator {
  onSubmit: (value: { creator_emails: string[] }) => void;
  onClose: () => void;
}

export function InviteCreatorModal({ onSubmit, onClose }: IInviteCreator) {
  const t = useTranslations('creatorManagement.inviteCreator');

  const [emails, setEmails] = useState<string[]>([]);
  const [pendingEmail, setPendingEmail] = useState<string>('');

  const form = useForm<IInviteCreatorSchemaType>({
    resolver: zodResolver(inviteCreatorSchema),
    defaultValues: { creator_emails: [] },
  });

  const handleSubmit = useCallback(async () => {
    const allEmails = [...emails];

    if (pendingEmail.trim() !== '') {
      allEmails.push(pendingEmail.trim());
    }

    try {
      // Validate all emails using Zod
      const validatedEmails = await inviteCreatorSchema.parseAsync({
        creator_emails: allEmails,
      });

      await onSubmit(validatedEmails);
      setEmails([]);
      setPendingEmail('');
    } catch (error) {
      console.error('Invite Creator Error', error);
    }
  }, [emails, onSubmit, pendingEmail]);

  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails);
    form.clearErrors('creator_emails');
  };

  const handleInputChange = (value: string) => {
    setPendingEmail(value);
    form.clearErrors('creator_emails');
  };

  return (
    <Modal
      open={true}
      title={t('title')}
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
      validationSchema={inviteCreatorSchema}
      onSubmit={handleSubmit}
    >
      {form => (
        <FormField
          control={form.control}
          name="creator_emails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sendTo')}</FormLabel>
              <FormControl>
                <InputTags
                  {...field}
                  value={emails}
                  onChange={newValue => {
                    handleEmailsChange(newValue);
                    field.onChange(newValue);
                  }}
                  onInputChange={handleInputChange}
                  inputValue={pendingEmail}
                  placeholder={t('placeholderSendTo')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Modal>
  );
}
