import useWalletRefresh from '@oe/api/hooks/useWalletRefresh';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { postAPI } from '@oe/api/utils/fetch';
import {
  ASSET_TYPES,
  CHAIN,
  CURRENCY_SYMBOLS,
  type TAssetType,
  type TChain,
  type TCurrencySymbol,
  type TWithdrawState,
  WITHDRAW_STATE,
} from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAssetList } from './useAssetList';

interface TAsset {
  wallet_id: string;
  symbol: string;
  amount: number;
}

// Form interfaces
interface BaseCryptoFormData {
  network: TChain;
  address: string;
  token: string;
  amount: string;
  note?: string;
}

interface BaseFiatFormData {
  fiatType: TCurrencySymbol;
  bankAccount: string;
  amount: string;
  note?: string;
}

interface UseWithdrawFormProps {
  type: TAssetType;
  minAmount: number;
}

export const useWithdrawForm = ({ type, minAmount }: UseWithdrawFormProps) => {
  const { fiatAssets, nearEcosystemAssets, availAsset, isLoadingFiat, isLoadingNear, isLoadingAvail } = useAssetList();

  const refresh = useWalletRefresh();
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawState, setWithdrawState] = useState<TWithdrawState>(WITHDRAW_STATE.INIT);
  const tWithdrawPage = useTranslations('withdrawPage');

  const getAvailableBalance = useCallback(
    (token: string, network?: TChain) => {
      if (type === ASSET_TYPES.FIAT) {
        const fiatAsset = fiatAssets?.find(asset => asset.symbol.toUpperCase() === token.toUpperCase());
        return fiatAsset?.amount.toString() || '0';
      }

      switch (network) {
        case CHAIN.NEAR: {
          const nearAsset = nearEcosystemAssets?.find(asset => asset.symbol.toUpperCase() === token.toUpperCase());
          return nearAsset?.amount.toString() || '0';
        }
        case CHAIN.AVAIL: {
          if (token !== CURRENCY_SYMBOLS.AVAIL) {
            return '0';
          }
          return availAsset?.amount.toString() || '0';
        }
        default:
          return '0';
      }
    },
    [fiatAssets, nearEcosystemAssets, availAsset, type]
  );

  const handlePostWithdraw = useCallback(
    async (formData: BaseCryptoFormData | BaseFiatFormData) => {
      if (isLoadingFiat || isLoadingNear || isLoadingAvail) {
        return;
      }

      const getAsset = (): TAsset | null | undefined => {
        if (type === ASSET_TYPES.FIAT) {
          const fiatData = formData as BaseFiatFormData;
          return fiatAssets?.find(a => a.symbol.toUpperCase() === fiatData.fiatType.toUpperCase());
        }

        const cryptoData = formData as BaseCryptoFormData;
        if (cryptoData.token === CURRENCY_SYMBOLS.AVAIL) {
          return availAsset;
        }
        return nearEcosystemAssets?.find(a => a.symbol.toUpperCase() === cryptoData.token.toUpperCase());
      };

      const asset = getAsset();
      if (!asset?.wallet_id) {
        toast.error(tWithdrawPage('form.error.invalidWallet'));
        return;
      }

      setIsLoading(true);
      try {
        if (type === ASSET_TYPES.CRYPTO) {
          const cryptoData = formData as BaseCryptoFormData;
          const response = await postAPI(
            API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW_CRYPTO.replace(':id', asset.wallet_id),
            {
              network: cryptoData.network,
              to_address: cryptoData.address,
              currency: cryptoData.token,
              amount: Number(cryptoData.amount),
              is_mainnet: process.env.NODE_ENV !== 'development',
              note: `withdraw to ${cryptoData.address}`,
            }
          );

          if (response.code === 713) {
            setWithdrawState(WITHDRAW_STATE.OUT_OF_GAS);
          } else {
            setWithdrawState(WITHDRAW_STATE.SUCCESS);
          }
        } else {
          const fiatData = formData as BaseFiatFormData;
          await postAPI(API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW.replace(':id', asset.wallet_id), {
            bank_account_id: fiatData.bankAccount,
            amount: Number(fiatData.amount),
            currency: fiatData.fiatType,
            note: `withdraw fiat to ${fiatData.bankAccount}`,
          });
          setWithdrawState(WITHDRAW_STATE.SUCCESS);
        }
        await refresh();
      } catch (_error) {
        setWithdrawState(WITHDRAW_STATE.INIT);
        toast.error(tWithdrawPage('form.error.unexpectedErr'));
      } finally {
        setIsLoading(false);
      }
    },
    [
      type,
      fiatAssets,
      nearEcosystemAssets,
      availAsset,
      isLoadingFiat,
      isLoadingNear,
      isLoadingAvail,
      refresh,
      tWithdrawPage,
    ]
  );

  const validateAmount = useCallback(
    (amount: string, token: TCurrencySymbol, network?: TChain) => {
      const numAmount = Number(amount);
      const availableBalance = Number(getAvailableBalance(token, network));

      if (numAmount < minAmount) {
        return `${tWithdrawPage('form.error.amountMustBe')}${minAmount}`;
      }

      if (numAmount > availableBalance) {
        return tWithdrawPage('form.error.amountExceedsBalance');
      }

      return true;
    },
    [getAvailableBalance, minAmount, tWithdrawPage]
  );

  const isLoadingAssets: boolean = Boolean(isLoadingFiat || isLoadingNear || isLoadingAvail);

  return {
    isLoading,
    withdrawState,
    setWithdrawState,
    handlePostWithdraw,
    getAvailableBalance,
    validateAmount,
    isLoadingAssets,
  };
};
