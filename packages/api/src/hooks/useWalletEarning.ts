import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { fetchAPI } from '@oe/api/utils/fetch';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { ASSET_TYPES } from '#utils/wallet';
import useWalletHistory from './useWalletHistory';
import useWalletRefresh from './useWalletRefresh';

const useWalletEarning = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [isOutOfGas, setIsOutOfGas] = useState<boolean>(false);
  const refreshWallet = useWalletRefresh();
  const { refresh: refreshHistory } = useWalletHistory({ currencyType: ASSET_TYPES.CRYPTO });
  const t = useTranslations('earnPage');

  const handleClaimToken = useCallback(
    async (walletId: string, nearBalance: number) => {
      setIsTxLoading(true);
      try {
        if (nearBalance < 0.2) {
          setIsOutOfGas(true);
          return;
        }

        const response = await fetchAPI(API_ENDPOINT.CLAIM_EARNING.replace(':id', walletId), { method: 'POST' });

        if (response.code !== 720) {
          // Refresh both wallet and history data after claiming
          await Promise.all([refreshWallet(), refreshHistory()]);

          toast.success(t('claimSuccess'));
        }
      } catch (error) {
        console.error('Failed to claim token:', error);
        toast.error(t('claimFailed'));
      } finally {
        setIsTxLoading(false);
      }
    },
    [refreshWallet, refreshHistory]
  );

  return {
    isOutOfGas,
    isTxLoading,
    currentPage,
    setCurrentPage,
    setIsOutOfGas,
    claimToken: handleClaimToken,
  };
};

export default useWalletEarning;
