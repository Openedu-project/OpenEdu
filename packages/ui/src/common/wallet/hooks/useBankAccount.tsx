import { useCreateUserSetting, useDeleteUserSetting, useUpdateUserSetting } from '@oe/api/hooks/useUserSettings';
import type { TBankAccountSchema } from '@oe/api/schemas/bankAccountSchema';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { mutate } from 'swr';

export const useBankAccount = () => {
  const t = useTranslations('bankAccountPage');
  const { triggerCreateUserSetting } = useCreateUserSetting();
  const { triggerUpdateUserSetting } = useUpdateUserSetting();
  const { triggerDeleteUserSetting } = useDeleteUserSetting();

  // Hàm helper để mutate tất cả các queries liên quan đến bank account
  const mutateBankAccountQueries = async () => {
    // Mutate cho trang hiện tại
    await mutate(
      (key: string) =>
        typeof key === 'string' && key.startsWith(API_ENDPOINT.USER_SETTINGS) && key.includes('type=bank_account')
    );
  };

  const handleAddBankAccount = async (data: TBankAccountSchema) => {
    try {
      await triggerCreateUserSetting({
        settings: [
          {
            type: 'bank_account',
            enable: true,
            value: data,
          },
        ],
      });
      // Mutate tất cả các queries liên quan
      await mutateBankAccountQueries();
      toast.success(t('messages.addSuccess'));
    } catch (error) {
      toast.error(t('messages.addFailure'));
      throw error;
    }
  };

  const handleUpdateBankAccount = async (data: TBankAccountSchema) => {
    try {
      await triggerUpdateUserSetting({
        settings: [
          {
            id: data.id,
            type: 'bank_account',
            enable: true,
            value: data,
          },
        ],
      });
      toast.success(t('messages.updateSuccess'));
      await mutateBankAccountQueries();
    } catch (error) {
      toast.error(t('messages.updateFailure'));
      throw error;
    }
  };

  const handleDeleteBankAccount = async (id: string) => {
    try {
      await triggerDeleteUserSetting(id);
      toast.success(t('messages.deleteSuccess'));
      await mutateBankAccountQueries();
    } catch (error) {
      toast.error(t('messages.deleteFailure'));
      throw error;
    }
  };

  return {
    handleAddBankAccount,
    handleUpdateBankAccount,
    handleDeleteBankAccount,
  };
};

export default useBankAccount;
