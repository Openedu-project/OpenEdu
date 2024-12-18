import {
  useCreateUserSetting,
  useDeleteUserSetting,
  useGetUserSettings,
  useUpdateUserSetting,
} from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import useBankAccountStore from '../_store/useBankAccountStore';

export const useBankAccount = () => {
  const t = useTranslations('bankAccountPage');
  const { triggerCreateUserSetting } = useCreateUserSetting();
  const { triggerUpdateUserSetting } = useUpdateUserSetting();
  const { triggerDeleteUserSetting } = useDeleteUserSetting();
  const { mutateUserSettings } = useGetUserSettings({ type: 'bank_account' });

  const { formData, setFormData } = useBankAccountStore();

  const [errors, setErrors] = useState<TBankAccounts>({
    bank_name: '',
    account_name: '',
    account_number: '',
  });

  const validateForm = () => {
    const newErrors = {
      bank_name: '',
      account_name: '',
      account_number: '',
    };

    if (!formData.bank_name) {
      newErrors.bank_name = t('form.validate.bankName');
    }
    if (!formData.account_name) {
      newErrors.account_name = t('form.validate.accountName');
    }
    if (!formData.account_number) {
      newErrors.account_number = t('form.validate.accountNumber');
    }

    setErrors(newErrors);

    return !(newErrors.bank_name || newErrors.account_name || newErrors.account_number);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddBankAccount = async (outFunction?: () => void) => {
    if (!validateForm()) {
      return;
    }

    try {
      await triggerCreateUserSetting({
        settings: [
          {
            type: 'bank_account',
            enable: true,
            value: formData,
          },
        ],
      });
      toast.success(t('messages.addSuccess'));
      setFormData({
        bank_name: '',
        account_name: '',
        account_number: '',
      });

      outFunction?.();
    } catch (error) {
      toast.error(t('messages.addFailure'));
      console.error(error);
    } finally {
      void mutateUserSettings().catch(error => {
        console.error('Failed to mutate user settings:', error);
      });
    }
  };

  const handleUpdateBankAccount = async (outFunction?: () => void) => {
    if (!validateForm()) {
      return;
    }

    try {
      await triggerUpdateUserSetting({
        settings: [
          {
            id: formData.id,
            type: 'bank_account',
            enable: true,
            value: formData,
          },
        ],
      });
      toast.success(t('messages.updateSuccess'));
      setFormData({
        bank_name: '',
        account_name: '',
        account_number: '',
      });

      outFunction?.();
    } catch (error) {
      toast.error(t('messages.updateFailure'));
      console.error(error);
    } finally {
      void mutateUserSettings().catch(error => {
        console.error('Failed to mutate user settings:', error);
      });
    }
  };

  const handleDeleteBankAccount = async (id: string, outFunction?: () => void) => {
    try {
      await triggerDeleteUserSetting(id);
      toast.success(t('messages.deleteSuccess'));
      outFunction?.();
    } catch (error) {
      toast.error(t('messages.deleteFailure'));
      console.error(error);
    } finally {
      void mutateUserSettings().catch(error => {
        console.error('Failed to mutate user settings:', error);
      });
    }
  };

  return {
    errors,
    handleFormChange,
    handleAddBankAccount,
    handleUpdateBankAccount,
    handleDeleteBankAccount,
  };
};

export default useBankAccount;
