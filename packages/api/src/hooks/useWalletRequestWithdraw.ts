import useSWR from 'swr';
import type { TWalletRequestWithdrawResponse } from '#types/wallet';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';

const useWalletRequestWithdraw = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const apiUrl = `${API_ENDPOINT.USERS_ME_APPROVALS}?type=wallet_fiat_withdrawal&page=${page}&per_page=${pageSize}&sort=create_at desc`;

  const { data, error, isLoading } = useSWR<TWalletRequestWithdrawResponse>(apiUrl, fetchAPI);

  return {
    data: data?.data?.results ?? [],
    totalItems: data?.data?.pagination?.total_items ?? 0,
    isLoading,
    error,
  };
};

export default useWalletRequestWithdraw;
