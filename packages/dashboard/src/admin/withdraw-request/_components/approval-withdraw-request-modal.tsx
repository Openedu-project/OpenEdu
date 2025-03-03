import { type IApproveWithdrawType, approveWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import type { IApproval, IApprovalPayload } from '@oe/api/types/approvals';
import type { IBankAccount, IBankAccountSettingValue } from '@oe/api/types/bank-account';
import type { IWalletItem } from '@oe/api/types/wallet';
import { InputCurrency } from '@oe/ui/components/input-currency';
import { Modal } from '@oe/ui/components/modal';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { Camera } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IFormAffiliateCampaignCourseModal {
  selectedItem: IApproval<IWalletItem, IBankAccountSettingValue<IBankAccount>> | null;
  onSubmit: (value: IApprovalPayload) => void;
  onClose: () => void;
}

export default function ApprovalWithdrawModal({ selectedItem, onSubmit, onClose }: IFormAffiliateCampaignCourseModal) {
  const t = useTranslations('approvalWithdrawModal');

  // TODO handle image upload

  const handleFormSubmit = useCallback(async () => {
    (values: IApproveWithdrawType) => {
      const newValues = {
        note: values.note,
        files: values.files,
        value: values.value?.toString(),
      } as IApprovalPayload;

      onSubmit(newValues);
    };
  }, [onSubmit]);

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
      validationSchema={approveWithdrawSchema}
      onSubmit={handleFormSubmit}
    >
      {form => (
        <>
          <div className="mb-6 rounded-md border border-gray-300 bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-lg">{t('requestDetails')}</h3>
            <p>
              <strong>Email:</strong> {selectedItem?.requester.email}
            </p>
            <p>
              <strong>{t('bankName')}:</strong>
              {selectedItem?.props?.setting_value?.bank_name}
            </p>
            <p>
              <strong>{t('accountName')}:</strong>
              {selectedItem?.props?.setting_value?.account_name}
            </p>
            <p>
              <strong>{t('accountNumber')}:</strong>
              {selectedItem?.props?.setting_value?.account_number}
            </p>
          </div>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('amount')}</FormLabel>
                <FormControl>
                  <InputCurrency
                    {...field}
                    value={field.value === undefined ? undefined : Number.parseFloat(field.value.toString())}
                    onChange={value => field.onChange(value === undefined ? undefined : value.toString())}
                    placeholder={t('placeholderAmount')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>{t('transferReceipt')}</FormLabel>
                <FormControl>
                  <Uploader
                    draggable
                    accept="image/*"
                    listType="picture"
                    multiple
                    onChange={files => {
                      field.onChange(files);
                    }}
                  >
                    <Button>
                      <Camera />
                    </Button>
                  </Uploader>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('note')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('placeholderNote')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </Modal>
  );
}
