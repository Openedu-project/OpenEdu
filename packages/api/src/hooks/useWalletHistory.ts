import type { TWalletHistoryResponse } from '@oe/api/types/wallet';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { fetchAPI } from '@oe/api/utils/fetch';
import type { TAssetType, TTransactionTypeKeys } from '@oe/api/utils/wallet';
import { toast } from 'sonner';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<TWalletHistoryResponse> => {
  try {
    return await fetchAPI(url);
  } catch (error) {
    toast.error('Failed to fetch history. Please try again later.');
    throw error;
  }
};

const useWalletHistory = ({
  type,
  currencyType,
  page = 1,
  pageSize = 10,
}: {
  type?: TTransactionTypeKeys;
  currencyType: TAssetType;
  page?: number;
  pageSize?: number;
}) => {
  const params = new URLSearchParams();

  params.set('currency_type', currencyType);
  params.set('page', page.toString());
  params.set('per_page', pageSize.toString());
  params.set('sort', 'create_at desc');
  params.set('preloads', 'Files');

  if (type) {
    params.set('type', type);
  }

  const apiUrl = `${API_ENDPOINT.USERS_ME_TRANSACTIONS}?${params.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<TWalletHistoryResponse>(apiUrl, fetcher);

  return {
    data: data?.data?.results ?? [],
    totalItems: data?.data?.pagination?.total_items ?? 0,
    isLoading,
    error,
    refresh: mutate,
  };
};

export default useWalletHistory;
