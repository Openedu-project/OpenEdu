import { bankAccountSchema } from '@oe/api/schemas/bankAccountSchema';
import type { IBankAccountValue } from '@oe/api/schemas/wallet';
import type { z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import { Input } from '#components/dynamic-form/form-components/input';
import { InputNumber } from '#components/input-number';
import { Modal, type ModalProps } from '#components/modal';
import { FormFieldWithLabel } from '#shadcn/form';
// import { Switch } from "#shadcn/switch";

export const BankAccountModal = ({ trigger, ...props }: Partial<ModalProps<z.ZodType<IBankAccountValue>>>) => {
  const t = useTranslations('wallets.bankAccountPage');

  return (
    <Modal
      {...props}
      title={t('addNewBankAccount')}
      trigger={trigger}
      validationSchema={bankAccountSchema}
      showSubmit
      buttons={[
        {
          type: 'button',
          label: t('form.cancelButton'),
          variant: 'outline',
          onClick: handleClose => handleClose?.(),
        },
        { type: 'submit', label: t('form.submitButton') },
      ]}
    >
      <div className="space-y-4 py-4">
        <FormFieldWithLabel
          name="bank_name"
          label={t('form.formLabels.bankName')}
          required
          render={({ field }) => <Input {...field} placeholder={t('form.placeholders.bankName')} />}
        />

        <FormFieldWithLabel
          name="account_number"
          label={t('form.formLabels.accountNumber')}
          required
          render={({ field }) => <InputNumber {...field} placeholder={t('form.placeholders.accountNumber')} />}
        />

        <FormFieldWithLabel
          name="account_name"
          label={t('form.formLabels.accountName')}
          required
          render={({ field }) => <Input {...field} placeholder={t('form.placeholders.accountName')} />}
        />

        {/* <FormFieldWithLabel
          name="is_default"
          label={t("form.formLabels.isDefault")}
          required
          render={({ field }) => <Switch {...field} />}
        /> */}

        <div className="rounded border border-warning bg-warning/10 p-4 text-sm">{t('form.alertMessage')}</div>
      </div>
    </Modal>
  );
};
