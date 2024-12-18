import type React from 'react';

import type { TBankAccounts } from '@oe/api/types/wallet';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import AlertBlock from '../../../_components/shared/alert-block';

type BankAccountFromParams = {
  formData: TBankAccounts;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: TBankAccounts;
  submitFunc: () => void;
};

const BankAccountForm = ({ formData, handleFormChange, errors, submitFunc }: BankAccountFromParams) => {
  const t = useTranslations('bankAccountPage.form');

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="bank_name" className="block text-base font-semibold text-[#424242]">
          {t('formLabels.bankName')}
        </label>
        <Input
          id="bank_name"
          type="text"
          name="bank_name"
          value={formData.bank_name}
          onChange={handleFormChange}
          placeholder={t('placeholders.bankName')}
          className="font-normal text-base leading-5 rounded-[8px]"
        />
        {errors.bank_name && <p className="text-red-500 text-sm">{errors.bank_name}</p>}
      </div>
      <div>
        <label htmlFor="account_name" className="block text-base font-semibold text-[#424242]">
          {t('formLabels.accountName')}
        </label>
        <Input
          id="account_name"
          type="text"
          name="account_name"
          value={formData.account_name}
          onChange={handleFormChange}
          placeholder={t('placeholders.accountName')}
          className="font-normal text-base leading-5 rounded-[8px] p-4"
        />
        {errors.account_name && <p className="text-red-500 text-sm">{errors.account_name}</p>}
      </div>
      <div>
        <label htmlFor="account_number" className="block text-base font-semibold text-[#424242]">
          {t('formLabels.accountNumber')}
        </label>
        <Input
          id="account_number"
          type="text"
          name="account_number"
          value={formData.account_number}
          onChange={handleFormChange}
          placeholder={t('placeholders.accountNumber')}
          className="font-normal text-base leading-5 rounded-[8px] p-4"
        />
        {errors.account_number && <p className="text-red-500 text-sm">{errors.account_number}</p>}
      </div>
      <AlertBlock>{t('alertMessage')}</AlertBlock>
      <Button onClick={submitFunc} className="w-full">
        {t('submitButton')}
      </Button>
    </div>
  );
};

export default BankAccountForm;
