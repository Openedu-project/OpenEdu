import {
  type AddReferrersCampaignSchemaType,
  addReferrersCampaignSchema,
} from '@oe/api/schemas/affiliateCampaignSchema';
import type { ICreateReferrersPayload } from '@oe/api/types/referrer';
import { InputTags } from '@oe/ui/components/input-tags';
import { Modal } from '@oe/ui/components/modal';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

interface IFormReferrerModal {
  onSubmit: (value: ICreateReferrersPayload['referrers']) => void;
  onClose: () => void;
}

export default function AffiliateReferrerFormModal({ onSubmit, onClose }: IFormReferrerModal) {
  const t = useTranslations('affiliateDetailReferrerFormModal');

  const [emails, setEmails] = useState<string[]>([]);
  const [pendingEmail, setPendingEmail] = useState<string>('');

  const handleFormSubmit = useCallback(
    async (values: AddReferrersCampaignSchemaType) => {
      const validatedData = await addReferrersCampaignSchema.parseAsync({
        emails: values.emails,
        type: values.type,
      });

      // Map the data to the format expected by the parent component
      const mappedData = validatedData.emails.map(email => {
        return {
          email,
          type: validatedData.type,
          enable: true,
        };
      });

      await onSubmit(mappedData);
      onClose();
    },
    [onSubmit, onClose]
  );

  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails);
  };

  const handleInputChange = (value: string) => {
    setPendingEmail(value);
  };

  return (
    <Modal
      open={true}
      title={t('addReferrers')}
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
      validationSchema={addReferrersCampaignSchema}
      onSubmit={handleFormSubmit}
    >
      {form => {
        return (
          <>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('type')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectType')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kol">{t('partner')}</SelectItem>
                      <SelectItem value="agency">{t('agency')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emails')}</FormLabel>
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
                      placeholder={t('placeholderEmail')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      }}
    </Modal>
  );
}
