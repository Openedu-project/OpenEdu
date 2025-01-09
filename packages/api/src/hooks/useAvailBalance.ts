import { getAvailBalance } from '#services/avail';
import { SWR_CONFIG, SWR_WALLET_KEY } from '#utils/wallet';
import useSWR from 'swr';

const useAvailBalance = (address: string | null) => {
    const { data: availBalance } = useSWR(
        address ? SWR_WALLET_KEY.AVAIL_BALANCE(address) : null,
        () => getAvailBalance(address || ''),
        SWR_CONFIG.fast
    );

    return {
        availBalance: availBalance ? Number(availBalance) : 0,
        isLoading: address && !availBalance
    };
};

export default useAvailBalance