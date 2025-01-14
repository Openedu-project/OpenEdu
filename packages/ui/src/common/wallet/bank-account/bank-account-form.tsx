import { type TBankAccountSchema, bankAccountSchema } from '@oe/api/schemas/bankAccountSchema';
import { useTranslations } from 'next-intl';
import { FormWrapper } from '#components/form-wrapper';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';

interface BankAccountFormProps {
  defaultValues?: TBankAccountSchema;
  onSubmit: (data: TBankAccountSchema) => Promise<void>;
  isSubmitting?: boolean;
}

const BankAccountForm = ({ defaultValues, onSubmit, isSubmitting }: BankAccountFormProps) => {
  const t = useTranslations('bankAccountPage.form');

  return (
    <FormWrapper
      id="bank-account-form"
      schema={bankAccountSchema}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          bank_name: '',
          account_name: '',
          account_number: '',
          ...defaultValues,
        },
        mode: 'onChange',
      }}
    >
      {() => (
        <div className="space-y-4">
          <FormFieldWithLabel
            name="bank_name"
            label={t('formLabels.bankName')}
            required
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('placeholders.bankName')}
                className="font-normal text-base leading-5 rounded-[8px]"
                disabled={isSubmitting}
              />
            )}
          />

          <FormFieldWithLabel
            name="account_name"
            label={t('formLabels.accountName')}
            required
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('placeholders.accountName')}
                className="font-normal text-base leading-5 rounded-[8px]"
                disabled={isSubmitting}
              />
            )}
          />

          <FormFieldWithLabel
            name="account_number"
            label={t('formLabels.accountNumber')}
            required
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('placeholders.accountNumber')}
                className="font-normal text-base leading-5 rounded-[8px]"
                disabled={isSubmitting}
              />
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {t('submitButton')}
          </Button>
        </div>
      )}
    </FormWrapper>
  );
};

export default BankAccountForm;
