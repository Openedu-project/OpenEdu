import { getNearTokens } from '#services/near';
import { TTokenBalances } from '#types/wallet';
import { SWR_CONFIG, SWR_WALLET_KEY } from '#utils/wallet';
import useSWR from 'swr';

const useNearTokens = (address: string | null) => {
    const { data: nearTokensData } = useSWR(
        address ? SWR_WALLET_KEY.NEAR_TOKENS(address) : null,
        async () => {
            const nearTokenBalances = await getNearTokens(address || '');
            return nearTokenBalances as TTokenBalances;
        },
        SWR_CONFIG.fast
    );

    return {
        nearTokens: nearTokensData,
        isLoading: address && !nearTokensData
    };
};

export default useNearTokens