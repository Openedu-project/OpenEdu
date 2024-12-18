import useWalletRefresh from '@oe/api/hooks/useWalletRefresh';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { postAPI } from '@oe/api/utils/fetch';
import { ASSET_TYPES, CHAIN, CURRENCY_SYMBOLS, type TWithdrawState, WITHDRAW_STATE } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useWalletDataStore } from '../_store/useWalletDataStore';

interface BaseFormData {
  amount: number;
}

interface FiatFormData extends BaseFormData {
  type: typeof ASSET_TYPES.FIAT; // Discriminator
  fiatType: string;
  bankAccount: string;
}

interface CryptoFormData extends BaseFormData {
  type: typeof ASSET_TYPES.CRYPTO; // Discriminator
  network: string;
  address: string;
  token: string;
}

type FormData = FiatFormData | CryptoFormData;

interface UseWithdrawFormProps {
  type: typeof ASSET_TYPES.FIAT | typeof ASSET_TYPES.CRYPTO;
  minAmount: number;
}

interface FormError {
  fiatType?: string;
  bankAccount?: string;
  network?: string;
  address?: string;
  token?: string;
  amount?: string;
}

export const useWithdrawForm = ({ type, minAmount }: UseWithdrawFormProps) => {
  const wallets = useWalletDataStore(state => state.assetList);
  const refresh = useWalletRefresh();
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawState, setWithdrawState] = useState<TWithdrawState>(WITHDRAW_STATE.INIT);
  const [formData, setFormData] = useState<FormData>(
    type === ASSET_TYPES.CRYPTO
      ? { type: ASSET_TYPES.CRYPTO, network: CHAIN.NEAR, address: '', token: '', amount: 0 }
      : { type: ASSET_TYPES.FIAT, fiatType: CURRENCY_SYMBOLS.VND, bankAccount: '', amount: 0 }
  );
  const [error, setError] = useState<FormError>({});
  const tWithdrawPage = useTranslations('withdrawPage');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  }, []);

  const getAvailableBalance = useCallback(() => {
    if (!wallets) {
      return '0';
    }

    const wallet = wallets.find(w => {
      if (formData.type === ASSET_TYPES.CRYPTO) {
        return w.symbol.toUpperCase() === formData.token.toUpperCase();
      }
      return w.symbol.toUpperCase() === formData.fiatType.toUpperCase();
    });

    return wallet?.amount.toString() || '0';
  }, [wallets, formData]);

  const handleMaxAmount = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      amount: Number(getAvailableBalance()),
    }));
  }, [getAvailableBalance]);

  const validateForm = useCallback(() => {
    const newError: Record<string, string> = {};
    let isValid = true;

    if (formData.amount < minAmount) {
      newError.amount = `${tWithdrawPage('form.error.amountMustBe')}${minAmount}`;
      isValid = false;
    }

    const availableBalance = Number(getAvailableBalance());
    if (formData.amount > availableBalance) {
      newError.amount = tWithdrawPage('form.error.amountExceedsBalance');
      isValid = false;
    }

    if (formData.type === 'crypto') {
      if (!formData.network) {
        newError.network = tWithdrawPage('form.error.requiredNetwork');
        isValid = false;
      }
      if (!formData.address) {
        newError.address = tWithdrawPage('form.error.requiredAddress');
        isValid = false;
      }
      if (!formData.token) {
        newError.token = tWithdrawPage('form.error.requiredToken');
        isValid = false;
      }
    } else {
      if (!formData.fiatType) {
        newError.fiatType = tWithdrawPage('form.error.requiredFiatType');
        isValid = false;
      }
      if (!formData.bankAccount) {
        newError.bankAccount = tWithdrawPage('form.error.requiredBankAccount');
        isValid = false;
      }
    }

    setError(newError);
    return isValid;
  }, [formData, getAvailableBalance, minAmount, tWithdrawPage]);

  const handleSubmit = useCallback(() => {
    if (!validateForm()) {
      return;
    }
    setWithdrawState(WITHDRAW_STATE.SUBMIT);
  }, [validateForm]);

  const handlePostWithdraw = useCallback(async () => {
    const wallet = wallets?.find(w => {
      if (type === ASSET_TYPES.CRYPTO) {
        const cryptoData = formData as CryptoFormData;
        return w.symbol.toUpperCase() === cryptoData.token.toUpperCase();
      }
      const fiatData = formData as FiatFormData;
      return w.symbol.toUpperCase() === fiatData.fiatType.toUpperCase();
    });

    const walletIdChosen = wallet?.wallet_id;
    if (!walletIdChosen) {
      toast.error(tWithdrawPage('form.error.invalidWallet'));
      return;
    }

    setIsLoading(true);
    try {
      if (type === ASSET_TYPES.FIAT) {
        const fiatData = formData as FiatFormData;
        await postAPI(API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW.replace(':id', walletIdChosen), {
          bank_account_id: fiatData.bankAccount,
          amount: fiatData.amount,
          currency: fiatData.fiatType,
          note: `withdraw fiat to ${fiatData.bankAccount}`,
        });
        setWithdrawState(WITHDRAW_STATE.SUCCESS);
      } else {
        const cryptoData = formData as CryptoFormData;
        const response = await postAPI(
          API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW_CRYPTO.replace(':id', walletIdChosen),
          {
            network: cryptoData.network,
            to_address: cryptoData.address,
            currency: cryptoData.token,
            amount: cryptoData.amount,
            is_mainnet: process.env.NODE_ENV !== 'development',
            note: `withdraw to ${cryptoData.address}`,
          }
        );

        if (response.code === 713) {
          setWithdrawState(WITHDRAW_STATE.OUT_OF_GAS);
        } else {
          setWithdrawState(WITHDRAW_STATE.SUCCESS);
        }
      }
      await refresh();
    } catch (_error) {
      setWithdrawState(WITHDRAW_STATE.INIT);
      toast.error(tWithdrawPage('form.error.unexpectedErr'));
    } finally {
      setIsLoading(false);
    }
  }, [formData, type, wallets, refresh, tWithdrawPage]);

  return {
    formData,
    error,
    isLoading,
    withdrawState,
    handleChange,
    handleSubmit,
    handleMaxAmount,
    handlePostWithdraw,
    setWithdrawState,
    getAvailableBalance,
  };
};
