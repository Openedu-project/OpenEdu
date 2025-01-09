import { TWallet } from '#types/wallet';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';
import { SWR_CONFIG, SWR_WALLET_KEY } from '#utils/wallet';
import useSWR from 'swr';

const useWalletBase = ({ isRefresh = true }: { isRefresh?: boolean } = {}) => {
    const config = isRefresh !== false ? SWR_CONFIG.fast : SWR_CONFIG.noRefresh;
    const { data: walletsData } = useSWR<TWallet[]>(
        SWR_WALLET_KEY.WALLETS,
        async () => {
            const response = await fetchAPI(API_ENDPOINT.USERS_ME_WALLETS);
            return response.data as TWallet[];
        },
        config
    );

    return {
        wallets: walletsData || [],
        isLoading: !walletsData
    };
};

export default useWalletBase